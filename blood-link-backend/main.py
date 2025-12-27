from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

from database import init_db, get_db
from models import Donor, Hospital, Request
from ai_matching import smart_donor_score, smart_hospital_score

app = FastAPI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/register-donor")
def register_donor(donor: Donor):
    db = get_db()
    db.execute("""
    INSERT INTO donors VALUES (NULL,?,?,?,?,?,?,?,?)
    """, (
        donor.donorType,
        donor.fullName,
        donor.bloodGroup,
        donor.phone,
        donor.division,
        donor.district,
        donor.lastDonation,
        int(donor.willingForHospital)
    ))
    db.commit()
    return {"message": "Donor registered successfully"}

@app.post("/api/register-hospital")
def register_hospital(hospital: Hospital):
    db = get_db()
    db.execute("""
    INSERT INTO hospitals VALUES (NULL,?,?,?,?,?,?,?)
    """, (
        hospital.hospitalName,
        hospital.hospitalAddress,
        hospital.division,
        hospital.district,
        hospital.contactPhone,
        int(hospital.acceptVoluntary),
        json.dumps(hospital.inventory)
    ))
    db.commit()
    return {"message": "Hospital registered successfully"}

@app.post("/api/create-request")
def create_request(request: Request):
    db = get_db()
    donors = []
    hospitals = []

    # for d in db.execute("SELECT * FROM donors"):
    for d in db.execute(
        "SELECT * FROM donors WHERE bloodGroup = ?",
        (request.bloodGroup,)
    ):
        score, dist = smart_donor_score(dict(d), request.dict())
        if score > 0:
            donors.append({
                "name": d["fullName"],
                "bloodGroup": d["bloodGroup"],
                "phone": d["phone"],
                "distance": f"{dist} km",
                "contact": "Available on request",
                "score": score
            })
            
    for h in db.execute("SELECT * FROM hospitals"):
        inventory = json.loads(h["inventory"])

        if inventory.get(request.bloodGroup, 0) <= 0:
            continue

        score, dist = smart_hospital_score(
            {**dict(h), "inventory": inventory},
            request.dict()
        )

        if score > 0:
            hospitals.append({
                "name": h["hospitalName"],
                "address": h["hospitalAddress"],
                "distance": f"{dist} km",
                "availableUnits": inventory.get(request.bloodGroup, 0),
                "score": score
            })


    # for h in db.execute("SELECT * FROM hospitals"):
    #     inventory = json.loads(h["inventory"])
    #     score, dist = smart_hospital_score(
    #         {**dict(h), "inventory": inventory},
    #         request.dict()
    #     )
    #     if score > 0:
    #         hospitals.append({
    #             "name": h["hospitalName"],
    #             "address": h["hospitalAddress"],
    #             "distance": f"{dist} km",
    #             "availableUnits": inventory.get(request.bloodGroup, 0),
    #             "score": score
    #         })

    donors.sort(key=lambda x: x["score"], reverse=True)
    hospitals.sort(key=lambda x: x["score"], reverse=True)

    return {
        "donors": donors[:40],
        "hospitals": hospitals[:30]
    }

@app.get("/api/platelet-hospitals")
def platelet_hospitals(division: str, district: str):
    db = get_db()
    hospitals = []

    for h in db.execute("SELECT hospitalName, hospitalAddress FROM hospitals"):
        hospitals.append({
            "name": h["hospitalName"],
            "address": h["hospitalAddress"]
        })

    return {"hospitals": hospitals[:20]}