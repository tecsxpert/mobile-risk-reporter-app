
@Aspect
@Component
public class AuditAspect {

    @Autowired
    private AuditLogRepository auditLogRepository;

    
    @AfterReturning(
        pointcut = "execution(* com.internship.tool.service.*.*create*(..))",
        returning = "result"
    )
    public void afterCreate(Object result) {
        saveLog("risk_report", "CREATE", result);
    }

    
    @AfterReturning(
        pointcut = "execution(* com.internship.tool.service.*.*update*(..))",
        returning = "result"
    )
    public void afterUpdate(Object result) {
        saveLog("risk_report", "UPDATE", result);
    }

    
    @AfterReturning(
        pointcut = "execution(* com.internship.tool.service.*.*delete*(..))"
    )
    public void afterDelete() {
        saveLog("risk_report", "DELETE", null);
    }

    private void saveLog(String table, String action, Object result) {
        AuditLog log = new AuditLog();
        log.setTableName(table);
        log.setAction(action);
        log.setChangedAt(LocalDateTime.now());
        auditLogRepository.save(log);
    }
}