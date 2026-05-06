CREATE TABLE audit_log (
    id          BIGSERIAL PRIMARY KEY,
    table_name  VARCHAR(100) NOT NULL,
    action      VARCHAR(50) NOT NULL,
    record_id   BIGINT NOT NULL,
    changed_by  VARCHAR(100),
    changed_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_record  ON audit_log(record_id);
CREATE INDEX idx_audit_changed ON audit_log(changed_at);