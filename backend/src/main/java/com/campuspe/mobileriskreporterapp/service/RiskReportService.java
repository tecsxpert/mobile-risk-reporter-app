package com.campuspe.mobileriskreporterapp.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campuspe.mobileriskreporterapp.dto.RiskReportRequest;
import com.campuspe.mobileriskreporterapp.dto.RiskReportResponse;
import com.campuspe.mobileriskreporterapp.entity.RiskReport;
import com.campuspe.mobileriskreporterapp.repository.RiskReportRepository;

@Service
public class RiskReportService {

    @Autowired
    private RiskReportRepository repository;

    
    public RiskReportResponse create(RiskReportRequest request) {
        RiskReport r = new RiskReport();

        r.setTitle(request.getTitle());
        r.setDescription(request.getDescription());
        r.setSeverity(request.getSeverity());
        r.setLocation(request.getLocation());
        r.setReportedBy(request.getReportedBy());
        r.setStatus("OPEN");
        r.setCreatedAt(LocalDateTime.now());
        r.setUpdatedAt(LocalDateTime.now());
        r.setFileName(request.getFileName());
        repository.save(r);
        return map(r);
    }

    
    public List<RiskReportResponse> getAllSimple() {
        return repository.findAll().stream().map(this::map).toList();
    }

    
    public RiskReportResponse getById(Long id) {
        return repository.findById(id).map(this::map).orElse(null);
    }

   
   public RiskReportResponse update(Long id, RiskReportRequest req) {

    RiskReport r = repository.findById(id).orElse(null);
    if (r == null) return null;

    r.setTitle(req.getTitle());
    r.setDescription(req.getDescription());
    r.setSeverity(req.getSeverity());
    r.setLocation(req.getLocation());
    r.setReportedBy(req.getReportedBy());

    
    r.setUpdatedAt(LocalDateTime.now());

    repository.save(r);
    return map(r);
}

    
    public void softDelete(Long id) {
        repository.deleteById(id);
    }

   
   public Map<String, Object> getAll(
        int page,
        int size,
        String q,
        String status,
        LocalDate from,
        LocalDate to
) {
    List<RiskReport> list = repository.findAll();

    if (q != null && !q.isEmpty()) {
        list = list.stream()
                .filter(r -> r.getTitle() != null &&
                        r.getTitle().toLowerCase().contains(q.toLowerCase()))
                .toList();
    }

    if (status != null && !status.isEmpty()) {
        list = list.stream()
                .filter(r -> r.getStatus() != null &&
                        r.getStatus().equalsIgnoreCase(status))
                .toList();
    }

    if (from != null) {
        list = list.stream()
                .filter(r -> r.getCreatedAt() != null &&
                        !r.getCreatedAt().toLocalDate().isBefore(from))
                .toList();
    }

   
    if (to != null) {
        list = list.stream()
                .filter(r -> r.getCreatedAt() != null &&
                        !r.getCreatedAt().toLocalDate().isAfter(to))
                .toList();
    }

    int start = page * size;
    int end = Math.min(start + size, list.size());

    List<RiskReportResponse> content = list.subList(start, end)
            .stream()
            .map(this::map)
            .toList();

    Map<String, Object> res = new HashMap<>();
    res.put("content", content);
    res.put("totalPages", (int) Math.ceil((double) list.size() / size));

    return res;
}

    public Map<String, Integer> getStats() {
        Map<String, Integer> m = new HashMap<>();
        m.put("total", (int) repository.count());
        m.put("open", (int) repository.countByStatus("OPEN"));
        m.put("resolved", (int) repository.countByStatus("RESOLVED"));
        m.put("high", (int) repository.countBySeverity("HIGH"));
        return m;
    }

    
    public List<Map<String, Object>> getWeeklyData() {

    List<RiskReport> all = repository.findAll();

    Map<String, Long> dayMap = all.stream()
        .filter(r -> r.getCreatedAt() != null)
        .collect(Collectors.groupingBy(
            r -> {
                String day = r.getCreatedAt()
                        .getDayOfWeek()
                        .toString();

                switch (day) {
                    case "MONDAY": return "Mon";
                    case "TUESDAY": return "Tue";
                    case "WEDNESDAY": return "Wed";
                    case "THURSDAY": return "Thu";
                    case "FRIDAY": return "Fri";
                    case "SATURDAY": return "Sat";
                    case "SUNDAY": return "Sun";
                    default: return "Mon";
                }
            },
            Collectors.counting()
        ));

    List<Map<String, Object>> data = new ArrayList<>();

    String[] days = {"Mon","Tue","Wed","Thu","Fri","Sat","Sun"};

    for (String d : days) {
        Map<String, Object> m = new HashMap<>();
       m.put("day", d);
m.put("risks", dayMap.getOrDefault(d, 0L));
        data.add(m);
    }

    return data;
}
public List<Map<String, Object>> getWeeklyTrend() {

    List<RiskReport> all = repository.findAll();

    Map<String, Integer> openMap = new HashMap<>();
    Map<String, Integer> resolvedMap = new HashMap<>();

    String[] days = {"Sun","Mon","Tue","Wed","Thu","Fri","Sat"};

    for (String d : days) {
        openMap.put(d, 0);
        resolvedMap.put(d, 0);
    }

    for (RiskReport r : all) {
        if (r.getCreatedAt() == null) continue;

        String day = days[r.getCreatedAt().getDayOfWeek().getValue() % 7];

        if ("OPEN".equals(r.getStatus())) openMap.put(day, openMap.get(day) + 1);
        if ("RESOLVED".equals(r.getStatus())) resolvedMap.put(day, resolvedMap.get(day) + 1);
    }

    List<Map<String, Object>> result = new ArrayList<>();

    for (String d : days) {
        Map<String, Object> m = new HashMap<>();
        m.put("label", d);
        m.put("open", openMap.get(d));
        m.put("resolved", resolvedMap.get(d));
        result.add(m);
    }

    return result;
}
    
    public Map<String, Object> getAnalytics(String period) {

        List<RiskReport> all = repository.findAll();
        Map<String, Object> res = new HashMap<>();

        
        Map<String, Long> statusMap = all.stream()
                .collect(Collectors.groupingBy(RiskReport::getStatus, Collectors.counting()));

        List<Map<String, Object>> pie = new ArrayList<>();
        statusMap.forEach((k,v)->{
            Map<String,Object> m=new HashMap<>();
            m.put("name",k);
            m.put("value",v);
            pie.add(m);
        });

       
        Map<String, Long> sevMap = all.stream()
                .collect(Collectors.groupingBy(RiskReport::getSeverity, Collectors.counting()));

        List<Map<String,Object>> bar=new ArrayList<>();
        sevMap.forEach((k,v)->{
            Map<String,Object> m=new HashMap<>();
            m.put("label",k);
            m.put("risks",v);
            bar.add(m);
        });

        
        List<Map<String,Object>> line=new ArrayList<>();
        String[] days={"Mon","Tue","Wed","Thu","Fri","Sat","Sun"};
        for(String d:days){
            Map<String,Object> m=new HashMap<>();
            m.put("label",d);
           long open = all.stream()
    .filter(r -> r.getCreatedAt() != null)
    .filter(r -> {
        String day = r.getCreatedAt().getDayOfWeek().toString();
        return mapDay(day).equals(d);
    })
    .filter(r -> "OPEN".equals(r.getStatus()))
    .count();

long resolved = all.stream()
    .filter(r -> r.getCreatedAt() != null)
    .filter(r -> {
        String day = r.getCreatedAt().getDayOfWeek().toString();
        return mapDay(day).equals(d);
    })
    .filter(r -> "RESOLVED".equals(r.getStatus()))
    .count();

m.put("open", open);
m.put("resolved", resolved);
            line.add(m);
        }

        res.put("pieData",pie);
        res.put("barData",bar);
        res.put("lineData",line);

        return res;
    }

    
    private RiskReportResponse map(RiskReport r){
        RiskReportResponse x=new RiskReportResponse();
        x.setId(r.getId());
        x.setTitle(r.getTitle());
        x.setDescription(r.getDescription());
        x.setSeverity(r.getSeverity());
        x.setLocation(r.getLocation());
        x.setReportedBy(r.getReportedBy());
        x.setStatus(r.getStatus());
        x.setCreatedAt(r.getCreatedAt());
         x.setUpdatedAt(r.getUpdatedAt());
         x.setFileName(r.getFileName());
        return x;
    }
    private String mapDay(String day) {
    switch (day) {
        case "MONDAY": return "Mon";
        case "TUESDAY": return "Tue";
        case "WEDNESDAY": return "Wed";
        case "THURSDAY": return "Thu";
        case "FRIDAY": return "Fri";
        case "SATURDAY": return "Sat";
        case "SUNDAY": return "Sun";
        default: return "Mon";
    }
}
}