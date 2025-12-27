import math

# Approximate coordinates (district-level)
DISTRICT_COORDS = {
    "Barishal": (22.7010,90.3535),
    "Bhola": (22.6850,90.6482),
    "Jhalokati": (22.6406,90.1987),
    "Patuakhali": (22.3596,90.3299),
    "Pirojpur": (22.5841,89.9720),
    "Barguna": (22.0953,90.1121),

    "Chattogram": (22.3569,91.7832),
    "Cox's Bazar": (21.4272,92.0058),
    "Rangamati": (22.7324,92.2985),
    "Bandarban": (22.1953,92.2184),
    "Khagrachhari": (23.1193,91.9847),
    "Cumilla": (23.4607,91.1809),
    "Feni": (23.0159,91.3976),
    "Lakshmipur": (22.9425,90.8412),
    "Noakhali": (22.8696,91.0995),
    "Chandpur": (23.2333,90.6667),
    "Brahmanbaria": (23.9571,91.1115),

    "Dhaka": (23.8103,90.4125),
    "Gazipur": (23.9999,90.4203),
    "Kishoreganj": (24.4449,90.7766),
    "Manikganj": (23.8617,90.0003),
    "Munshiganj": (23.5422,90.5305),
    "Narayanganj": (23.6238,90.5000),
    "Narsingdi": (23.9322,90.7154),
    "Tangail": (24.2513,89.9167),
    "Faridpur": (23.6070,89.8429),
    "Gopalganj": (23.0051,89.8266),
    "Madaripur": (23.1641,90.1897),
    "Rajbari": (23.7574,89.6440),
    "Shariatpur": (23.2423,90.4348),

    "Khulna": (22.8456,89.5403),
    "Bagerhat": (22.6602,89.7895),
    "Chuadanga": (23.6402,88.8418),
    "Jashore": (23.1667,89.2083),
    "Jhenaidah": (23.5450,89.1726),
    "Khustia": (23.9013,89.1208),
    "Magura": (23.4855,89.4198),
    "Meherpur": (23.7622,88.6318),
    "Narail": (23.1551,89.4951),
    "Satkhira": (22.7185,89.0705),

    "Mymensingh": (24.7471,90.4203),
    "Jamalpur": (24.9375,89.9370),
    "Netrokona": (24.8835,90.7312),
    "Sherpur": (25.0205,90.0153),

    "Rajshahi": (24.3745,88.6042),
    "Bogura": (24.8465,89.3773),
    "Joypurhat": (25.0968,89.0227),
    "Naogaon": (24.7936,88.9318),
    "Natore": (24.4206,89.0003),
    "Chapainawabganj": (24.5965,88.2775),
    "Pabna": (23.9985,89.2336),
    "Sirajganj": (24.4534,89.7006),

    "Rangpur": (25.7439,89.2752),
    "Dinajpur": (25.6279,88.6332),
    "Gaibandha": (25.3288,89.5281),
    "Kurigram": (25.8072,89.6295),
    "Lalmonirhat": (25.9923,89.2847),
    "Nilphamari": (25.9310,88.8560),
    "Panchagarh": (26.3411,88.5542),
    "Thakurgaon": (26.0337,88.4617),

    "Sylhet": (24.8949,91.8687),
    "Habiganj": (24.3745,91.4155),
    "Moulvibazar": (24.4829,91.7774),
    "Sunamganj": (25.0658,91.3950),
}

def haversine(d1, d2):
    if d1 not in DISTRICT_COORDS or d2 not in DISTRICT_COORDS:
        return 50.0  # fallback distance

    lat1, lon1 = DISTRICT_COORDS[d1]
    lat2, lon2 = DISTRICT_COORDS[d2]

    R = 6371
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)

    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return round(2 * R * math.atan2(math.sqrt(a), math.sqrt(1 - a)), 2)
