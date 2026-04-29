
CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(50) DEFAULT 'USER',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE risk_report (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    severity    VARCHAR(50) NOT NULL,
    status      VARCHAR(50) DEFAULT 'OPEN',
    location    VARCHAR(255),
    reported_by BIGINT REFERENCES users(id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX idx_risk_status   ON risk_report(status);
CREATE INDEX idx_risk_severity ON risk_report(severity);
CREATE INDEX idx_risk_created  ON risk_report(created_at);
CREATE INDEX idx_user_email    ON users(email);