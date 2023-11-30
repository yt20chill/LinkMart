BEGIN;
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username  VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(72) NOT NULL,
    created_at DATE default NOW(),
    updated_at DATE default NOW()
);

COMMIT;
