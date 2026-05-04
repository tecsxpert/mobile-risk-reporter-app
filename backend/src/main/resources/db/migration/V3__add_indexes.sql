-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_risk_title
ON risk_report(title);

CREATE INDEX IF NOT EXISTS idx_risk_reported_by
ON risk_report(reported_by);

CREATE INDEX IF NOT EXISTS idx_risk_severity_status
ON risk_report(severity, status);

CREATE INDEX IF NOT EXISTS idx_audit_table_action
ON audit_log(table_name, action);

EXPLAIN ANALYZE
SELECT *
FROM risk_report
WHERE severity = 'HIGH'
AND status = 'OPEN';

EXPLAIN ANALYZE
SELECT *
FROM risk_report
WHERE reported_by = 'admin';