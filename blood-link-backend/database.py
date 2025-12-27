import sqlite3

DB_NAME = "database1.db"

def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS donors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donorType TEXT,
        fullName TEXT,
        bloodGroup TEXT,
        phone TEXT,
        division TEXT,
        district TEXT,
        lastDonation TEXT,
        willingForHospital INTEGER
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS hospitals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hospitalName TEXT,
        hospitalAddress TEXT,
        division TEXT,
        district TEXT,
        contactPhone TEXT,
        acceptVoluntary INTEGER,
        inventory TEXT
    )
    """)

    conn.commit()
    conn.close()
