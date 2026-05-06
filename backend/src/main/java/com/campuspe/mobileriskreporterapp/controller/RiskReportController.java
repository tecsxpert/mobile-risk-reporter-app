package com.campuspe.mobileriskreporterapp.controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.campuspe.mobileriskreporterapp.dto.RiskReportRequest;
import com.campuspe.mobileriskreporterapp.dto.RiskReportResponse;
import com.campuspe.mobileriskreporterapp.service.RiskReportService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/risks")
@CrossOrigin("*")
public class RiskReportController {

    @Autowired
    private RiskReportService service;

    
    @PostMapping
    public ResponseEntity<RiskReportResponse> create(
            @Valid @RequestBody RiskReportRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    
    @GetMapping
    public ResponseEntity<?> getAllSimple() {
        return ResponseEntity.ok(service.getAllSimple());
    }
    @GetMapping("/weekly-trend")
public ResponseEntity<?> getWeeklyTrend() {
    return ResponseEntity.ok(service.getWeeklyTrend());
}

    
    @GetMapping("/{id}")
    public ResponseEntity<RiskReportResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<RiskReportResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody RiskReportRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.softDelete(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics(
            @RequestParam(defaultValue = "week") String period) {
        return ResponseEntity.ok(service.getAnalytics(period));
    }

    
    @GetMapping("/all")
    public ResponseEntity<?> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String status,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        return ResponseEntity.ok(
                service.getAll(page, size, q, status, from, to)
        );
    }

    
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        return ResponseEntity.ok(service.getStats());
    }

    
    @GetMapping("/weekly")
    public ResponseEntity<?> getWeekly() {
        return ResponseEntity.ok(service.getWeeklyData());
    }
}