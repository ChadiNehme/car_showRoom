CREATE TABLE brands (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    picture TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cars (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand_id INTEGER NOT NULL,
    model VARCHAR(150) NOT NULL,
    year INTEGER NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    picture TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_car_brand
        FOREIGN KEY (brand_id)
        REFERENCES brands(id)
        ON DELETE CASCADE
);