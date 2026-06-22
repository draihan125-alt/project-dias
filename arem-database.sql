CREATE TABLE equipments (
    id SERIAL PRIMARY KEY,
    equipment VARCHAR(255),
    uob VARCHAR(100),
    asset VARCHAR(100),
    location VARCHAR(255),
    condition VARCHAR(255),
    calibration VARCHAR(255),
    date DATE,
    status VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);;
