
package com.campuspe.mobileriskreporterapp.service;
import java.io.PrintWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExportService {

    
    @Autowired
    private RiskReportRepository repository;

    public void exportToCSV(PrintWriter writer) {
        writer.println("ID,Title,Description,Risk Level,Status,Created At");

       

       
        List<RiskReport> reports = repository.findByIsDeletedFalse();
        for (RiskReport r : reports) {
        writer.println(r.getId() + "," + r.getTitle() + "," + ...);
        }

        writer.flush();
    }
}