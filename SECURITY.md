# Security Measures

## Authentication
- Basic authentication enabled using Spring Security
- Protected endpoint: /export

## Authorization
- Only authenticated users can access sensitive endpoints

## Input Validation
- Required fields validated (title, severity, reportedBy)
- Prevents empty or malformed data

## SQL Injection Protection
- Using Spring Data JPA (prepared statements)

## CORS Protection
- Allowed only frontend origin (localhost:5173)

## File Upload Security
- File type restrictions (PDF, images)
- Size validation