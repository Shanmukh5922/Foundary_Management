# Foundry Management

Foundry Management is an operations console for furnace equipment, alloy batches, casting production, molds, operators, quality inspections, defects, procurement, suppliers, customer orders, and shipments.

## Requirements

- Java 25
- Node.js and npm
- Oracle XE with the project schema available at `jdbc:oracle:thin:@localhost:1521:XE` (or override `SPRING_DATASOURCE_URL`)

## Start the Backend

Set `DB_PASSWORD` in your local shell or IDE run configuration before starting the application. `DB_USERNAME` is optional and defaults to `SYSTEM`. Database credentials are intentionally not stored in project files.

From the project root:

```powershell
$env:DB_USERNAME = "SYSTEM"
$env:DB_PASSWORD = "your-local-database-password"
.\mvnw.cmd spring-boot:run
```

The REST API listens on port 8081. The schema must exist before startup; Hibernate schema generation is disabled.

## Start the Frontend

```powershell
Set-Location frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The frontend defaults to `http://localhost:8081/api`; configure `VITE_API_BASE_URL` in `frontend/.env.local` for another API address. Keep local environment files out of source control.

## Verify

```powershell
Set-Location frontend
npm run lint
npm run build
```

The backend's Maven Wrapper uses Java 25. Run backend tests with the Oracle database and credentials available to the process.
