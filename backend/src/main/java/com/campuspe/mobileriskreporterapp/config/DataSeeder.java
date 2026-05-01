package com.campuspe.mobileriskreporterapp.config;
@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private RiskReportRepository repository;

    @Override
    public void run(String... args) throws Exception {

       
        if(repository.count() > 0) return;

        List<RiskReport> reports = Arrays.asList(
            createReport("Gas Leak on Floor 3",
                "Strong gas smell near kitchen",
                "CRITICAL", "OPEN", "Floor 3", "Ravi Kumar"),

            createReport("Broken Fire Extinguisher",
                "Extinguisher on floor 2 is damaged",
                "HIGH", "IN_REVIEW", "Floor 2", "Kumar Singh"),

            createReport("Wet Floor in Lobby",
                "Water spillage near entrance",
                "LOW", "RESOLVED", "Lobby", "Priya Sharma"),

            createReport("Exposed Electrical Wiring",
                "Bare wires visible in basement",
                "CRITICAL", "OPEN", "Basement", "Suresh Patel"),

            createReport("Broken Staircase Railing",
                "Railing on block B stairs is loose",
                "MEDIUM", "IN_REVIEW", "Block B", "Anita Rao"),

            createReport("Fire Exit Blocked",
                "Storage boxes blocking fire exit",
                "HIGH", "OPEN", "Floor 1", "Ravi Kumar"),

            createReport("Faulty Smoke Detector",
                "Smoke detector not working on floor 4",
                "HIGH", "OPEN", "Floor 4", "Kumar Singh"),

            createReport("Chemical Spill",
                "Unknown chemical spilled in lab area",
                "CRITICAL", "IN_REVIEW", "Lab", "Priya Sharma"),

            createReport("Broken Window",
                "Broken glass window in conference room",
                "LOW", "RESOLVED", "Conference Room", "Suresh Patel"),

            createReport("Slippery Parking Lot",
                "Oil spill in parking area B",
                "MEDIUM", "OPEN", "Parking B", "Anita Rao"),

            createReport("Overloaded Power Strip",
                "Multiple devices on single power strip",
                "HIGH", "IN_REVIEW", "Floor 5", "Ravi Kumar"),

            createReport("Leaking Roof",
                "Water dripping from roof near server room",
                "CRITICAL", "OPEN", "Server Room", "Kumar Singh"),

            createReport("Missing Safety Signs",
                "No warning signs near construction area",
                "MEDIUM", "RESOLVED", "Construction Zone", "Priya Sharma"),

            createReport("Broken CCTV Camera",
                "Camera near entrance not working",
                "LOW", "OPEN", "Main Entrance", "Suresh Patel"),

            createReport("Pest Infestation",
                "Rodents spotted in cafeteria area",
                "HIGH", "IN_REVIEW", "Cafeteria", "Anita Rao")
        );

        repository.saveAll(reports);
        System.out.println(" 15 demo records seeded!");
    }

    private RiskReport createReport(
        String title, String description,
        String severity, String status,
        String location, String reportedBy) {

        RiskReport r = new RiskReport();
        r.setTitle(title);
        r.setDescription(description);
        r.setSeverity(severity);
        r.setStatus(status);
        r.setLocation(location);
        r.setReportedBy(reportedBy);
        return r;
    }
} 
