const PLATELET_HOSPITALS = {
    "Barishal": [
        { name: "Sher-E-Bangla Medical College Hospital", address: "Medical College Road, Barishal", district: "Barishal", phone: "+880 1711-000001" },
        { name: "Bhola Sadar Hospital", address: "Bhola Sadar", district: "Bhola", phone: "+880 1711-000002" },
        { name: "Patuakhali Medical College Hospital", address: "Patuakhali Sadar", district: "Patuakhali", phone: "+880 1711-000003" },
        { name: "Pirojpur District Hospital", address: "Pirojpur Sadar", district: "Pirojpur", phone: "+880 1711-000004" },
        { name: "Jhalokati District Hospital", address: "Jhalokati Sadar", district: "Jhalokati", phone: "+880 1711-000005" },
        { name: "Barguna District Hospital", address: "Barguna Sadar", district: "Barguna", phone: "+880 1711-000006" }
    ],

    "Chattogram": [
        { name: "Evercare Hospital Chattogram", address: "Panchlaish, Chattogram", district: "Chattogram", phone: "+880 1711-000007" },
        { name: "Cox's Bazar Medical College Hospital", address: "Cox's Bazar", district: "Cox's Bazar", phone: "+880 1711-000008" },
        { name: "Cumilla Medical College Hospital", address: "Cumilla", district: "Cumilla", phone: "+880 1711-000009" },
        { name: "Feni Sadar Hospital", address: "Feni Sadar", district: "Feni", phone: "+880 1711-000010" },
        { name: "Noakhali Medical College Hospital", address: "Noakhali", district: "Noakhali", phone: "+880 1711-000011" },
        { name: "Lakshmipur District Hospital", address: "Lakshmipur", district: "Lakshmipur", phone: "+880 1711-000012" },
        { name: "Chandpur Sadar Hospital", address: "Chandpur", district: "Chandpur", phone: "+880 1711-000013" },
        { name: "Brahmanbaria General Hospital", address: "Brahmanbaria", district: "Brahmanbaria", phone: "+880 1711-000014" },
        { name: "Khagrachari District Hospital", address: "Khagrachari", district: "Khagrachari", phone: "+880 1711-000015" },
        { name: "Rangamati General Hospital", address: "Rangamati", district: "Rangamati", phone: "+880 1711-000016" },
        { name: "Bandarban District Hospital", address: "Bandarban", district: "Bandarban", phone: "+880 1711-000017" }
    ],

    "Dhaka": [
        { name: "Dhaka Medical College Hospital", address: "Bakshibazar, Dhaka", district: "Dhaka", phone: "+880 1711-000018" },
        { name: "Gazipur Shaheed Tajuddin Ahmad Medical College", address: "Gazipur", district: "Gazipur", phone: "+880 1711-000019" },
        { name: "Narayanganj 300 Bed Hospital", address: "Narayanganj", district: "Narayanganj", phone: "+880 1711-000020" },
        { name: "Tangail General Hospital", address: "Tangail", district: "Tangail", phone: "+880 1711-000021" },
        { name: "Faridpur Medical College Hospital", address: "Faridpur", district: "Faridpur", phone: "+880 1711-000022" },
        { name: "Manikganj Sadar Hospital", address: "Manikganj", district: "Manikganj", phone: "+880 1711-000023" },
        { name: "Munshiganj General Hospital", address: "Munshiganj", district: "Munshiganj", phone: "+880 1711-000024" },
        { name: "Narsingdi District Hospital", address: "Narsingdi", district: "Narsingdi", phone: "+880 1711-000025" },
        { name: "Madaripur District Hospital", address: "Madaripur", district: "Madaripur", phone: "+880 1711-000026" },
        { name: "Gopalganj 250 Bed General Hospital", address: "Gopalganj", district: "Gopalganj", phone: "+880 1711-000027" },
        { name: "Rajbari District Hospital", address: "Rajbari", district: "Rajbari", phone: "+880 1711-000028" },
        { name: "Shariatpur Sadar Hospital", address: "Shariatpur", district: "Shariatpur", phone: "+880 1711-000029" },
        { name: "Kishoreganj General Hospital", address: "Kishoreganj", district: "Kishoreganj", phone: "+880 1711-000030" }
    ],

    "Khulna": [
        { name: "Khulna Medical College Hospital", address: "Khulna", district: "Khulna", phone: "+880 1711-000031" },
        { name: "Jashore General Hospital", address: "Jashore Sadar", district: "Jashore", phone: "+880 1711-000032" },
        { name: "Kushtia General Hospital", address: "Kushtia", district: "Kushtia", phone: "+880 1711-000033" },
        { name: "Satkhira Sadar Hospital", address: "Satkhira", district: "Satkhira", phone: "+880 1711-000034" },
        { name: "Bagerhat Sadar Hospital", address: "Bagerhat", district: "Bagerhat", phone: "+880 1711-000035" },
        { name: "Chuadanga District Hospital", address: "Chuadanga", district: "Chuadanga", phone: "+880 1711-000036" },
        { name: "Jhenaidah Sadar Hospital", address: "Jhenaidah", district: "Jhenaidah", phone: "+880 1711-000037" },
        { name: "Magura District Hospital", address: "Magura", district: "Magura", phone: "+880 1711-000038" },
        { name: "Meherpur General Hospital", address: "Meherpur", district: "Meherpur", phone: "+880 1711-000039" },
        { name: "Narail Sadar Hospital", address: "Narail", district: "Narail", phone: "+880 1711-000040" }
    ],

    "Mymensingh": [
        { name: "Mymensingh Medical College Hospital", address: "Mymensingh", district: "Mymensingh", phone: "+880 1711-000041" },
        { name: "Jamalpur General Hospital", address: "Jamalpur", district: "Jamalpur", phone: "+880 1711-000042" },
        { name: "Netrokona Adhunik Sadar Hospital", address: "Netrokona", district: "Netrokona", phone: "+880 1711-000043" },
        { name: "Sherpur District Hospital", address: "Sherpur", district: "Sherpur", phone: "+880 1711-000044" }
    ],

    "Rajshahi": [
        { name: "Rajshahi Medical College Hospital", address: "Rajshahi", district: "Rajshahi", phone: "+880 1711-000045" },
        { name: "Shaheed Ziaur Rahman Medical College", address: "Bogura", district: "Bogura", phone: "+880 1711-000046" },
        { name: "Pabna General Hospital", address: "Pabna", district: "Pabna", phone: "+880 1711-000047" },
        { name: "Sirajganj 250 Bed Hospital", address: "Sirajganj", district: "Sirajganj", phone: "+880 1711-000048" },
        { name: "Naogaon Sadar Hospital", address: "Naogaon", district: "Naogaon", phone: "+880 1711-000049" },
        { name: "Natore Sadar Hospital", address: "Natore", district: "Natore", phone: "+880 1711-000050" },
        { name: "Chapai Nawabganj District Hospital", address: "Chapai Nawabganj", district: "Chapai Nawabganj", phone: "+880 1711-000051" },
        { name: "Joypurhat District Hospital", address: "Joypurhat", district: "Joypurhat", phone: "+880 1711-000052" }
    ],

    "Rangpur": [
        { name: "Rangpur Medical College Hospital", address: "Rangpur", district: "Rangpur", phone: "+880 1711-000053" },
        { name: "Dinajpur Medical College Hospital", address: "Dinajpur", district: "Dinajpur", phone: "+880 1711-000054" },
        { name: "Gaibandha Sadar Hospital", address: "Gaibandha", district: "Gaibandha", phone: "+880 1711-000055" },
        { name: "Kurigram District Hospital", address: "Kurigram", district: "Kurigram", phone: "+880 1711-000056" },
        { name: "Lalmonirhat Sadar Hospital", address: "Lalmonirhat", district: "Lalmonirhat", phone: "+880 1711-000057" },
        { name: "Nilphamari Sadar Hospital", address: "Nilphamari", district: "Nilphamari", phone: "+880 1711-000058" },
        { name: "Panchagarh Modern Sadar Hospital", address: "Panchagarh", district: "Panchagarh", phone: "+880 1711-000059" },
        { name: "Thakurgaon Sadar Hospital", address: "Thakurgaon", district: "Thakurgaon", phone: "+880 1711-000060" }
    ],

    "Sylhet": [
        { name: "Sylhet MAG Osmani Medical College", address: "Sylhet", district: "Sylhet", phone: "+880 1711-000061" },
        { name: "Moulvibazar 250 Bed Hospital", address: "Moulvibazar", district: "Moulvibazar", phone: "+880 1711-000062" },
        { name: "Habiganj Sadar Hospital", address: "Habiganj", district: "Habiganj", phone: "+880 1711-000063" },
        { name: "Sunamganj Sadar Hospital", address: "Sunamganj", district: "Sunamganj", phone: "+880 1711-000064" }
    ]
};
