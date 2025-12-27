from pydantic import BaseModel
from typing import Dict

class Donor(BaseModel):
    donorType: str
    fullName: str
    bloodGroup: str
    phone: str
    division: str
    district: str
    lastDonation: str
    willingForHospital: bool

class Hospital(BaseModel):
    hospitalName: str
    hospitalAddress: str
    division: str
    district: str
    contactPhone: str
    inventory: Dict[str, int]
    acceptVoluntary: bool

class Request(BaseModel):
    bloodGroup: str
    units: int
    division: str
    district: str
    urgency: str
