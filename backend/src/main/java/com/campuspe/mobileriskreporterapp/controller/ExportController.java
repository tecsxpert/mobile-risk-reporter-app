package com.campuspe.mobileriskreporterapp.controller;
import java.io.PrintWriter;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campuspe.mobileriskreporterapp.dto.RiskReportResponse;
import com.campuspe.mobileriskreporterapp.service.RiskReportService;

import jakarta.servlet.http.HttpServletResponse;


@RestController
@CrossOrigin(origins = "http://localhost:5173") 
public class ExportController {


    private final RiskReportService service;

    public ExportController(RiskReportService service) {
        this.service = service;
    }

    @GetMapping("/export")
    public void exportCSV(HttpServletResponse response) throws Exception {

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition",
                "attachment; filename=risk_reports.csv");

        
        List<RiskReportResponse> list = service.getAllSimple();

        PrintWriter writer = response.getWriter();

        writer.println("ID,Title,Description,Severity,Location,Status,CreatedAt");

        for (RiskReportResponse r : list) {
            writer.println(
                safe(r.getId()) + "," +
                safe(r.getTitle()) + "," +
                safe(r.getDescription()) + "," +
                safe(r.getSeverity()) + "," +
                safe(r.getLocation()) + "," +
                safe(r.getStatus()) + "," +
                safe(r.getCreatedAt())
            );
        }

        writer.flush();
        writer.close();
    }

    private String safe(Object val) {
        return val == null ? "" : val.toString().replace(",", " ");
    }
}