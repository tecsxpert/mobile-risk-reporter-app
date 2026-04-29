import java.time.LocalDate;

@RestController
@RequestMapping("/api/risks")
public class RiskReportController {

    @Autowired
    private RiskReportService service;

    @PutMapping("/{id}")
    public ResponseEntity<RiskReportResponse> update(
        @PathVariable Long id,
        @Valid @RequestBody RiskReportRequest request) {

        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.softDelete(id);
        return ResponseEntity.ok("Report deleted successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String q,
        @RequestParam(required = false) String status,
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate from,
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate to
    ) {
        return ResponseEntity.ok(
            service.getAll(page, size, q, status, from, to)
        );
    }
}