CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users(id)
    ON DELETE CASCADE,

    amount NUMERIC NOT NULL,

    type VARCHAR(50) NOT NULL,

    category VARCHAR(100) NOT NULL,

    description TEXT,

    transaction_date DATE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);