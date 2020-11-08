DROP TABLE IF EXISTS plants;

CREATE TABLE plants (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    common_name TEXT NOT NULL,
    description TEXT NOT NULL,
    water_needs TEXT NOT NULL,
    image_url TEXT NOT NULL
);