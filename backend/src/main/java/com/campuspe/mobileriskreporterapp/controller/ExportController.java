import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
@Tag(name = "Export", description = "Export endpoints")
public class ExportController {

    @Autowired
    private ExportService exportService;

    @GetMapping("/export")
    public void exportCSV(HttpServletResponse response) throws Exception {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", 
            "attachment; filename=\"risk_reports.csv\"");
        exportService.exportToCSV(response.getWriter());
    }
}