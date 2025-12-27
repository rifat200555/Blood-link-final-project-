from distance import haversine
from datetime import datetime

def donation_recency_score(last_date):
    days = (datetime.now() - datetime.fromisoformat(last_date)).days
    return min(days / 120, 1)  # max after ~4 months

def smart_donor_score(donor, request):
    blood_match = 1.0 if donor["bloodGroup"] == request["bloodGroup"] else 0.0
    distance = haversine(donor["district"], request["district"])
    distance_score = max(0, 1 - distance / 50)

    urgency_weight = 1.0 if request["urgency"] == "emergency" else 0.6
    willingness = 1.0 if donor["willingForHospital"] else 0.5
    recency = donation_recency_score(donor["lastDonation"])

    score = (
        blood_match * 0.4 +
        distance_score * 0.25 +
        urgency_weight * 0.2 +
        willingness * 0.1 +
        recency * 0.05
    )

    return round(score, 3), distance


def smart_hospital_score(hospital, request):
    inventory = hospital["inventory"].get(request["bloodGroup"], 0)
    if inventory <= 0:
        return 0, None

    distance = haversine(hospital["district"], request["district"])
    distance_score = max(0, 1 - distance / 50)

    score = (
        (inventory / 10) * 0.5 +
        distance_score * 0.3 +
        (0.2 if hospital["acceptVoluntary"] else 0)
    )

    return round(score, 3), distance