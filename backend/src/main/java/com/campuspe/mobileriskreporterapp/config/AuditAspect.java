package com.campuspe.mobileriskreporterapp.config;

import java.lang.reflect.Field;
import java.time.LocalDateTime;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.campuspe.mobileriskreporterapp.entity.AuditLog;
import com.campuspe.mobileriskreporterapp.repository.AuditLogRepository;

@Aspect
@Component
public class AuditAspect {

    @Autowired
    private AuditLogRepository auditLogRepository;

    
    @AfterReturning(
        pointcut = "execution(* com.campuspe.mobileriskreporterapp.service.*.create*(..))",
        returning = "result"
    )
    public void afterCreate(Object result) {
        saveLog("risk_report", "CREATE", result);
    }

    
    @AfterReturning(
        pointcut = "execution(* com.campuspe.mobileriskreporterapp.service.*.update*(..))",
        returning = "result"
    )
    public void afterUpdate(Object result) {
        saveLog("risk_report", "UPDATE", result);
    }

    
    @AfterReturning(
        pointcut = "execution(* com.campuspe.mobileriskreporterapp.service.*.softDelete(..))"
    )
    public void afterDelete() {
        saveLog("risk_report", "DELETE", null);
    }

    private void saveLog(String table, String action, Object result) {

        AuditLog log = new AuditLog();
        log.setTableName(table);
        log.setAction(action);
        log.setChangedAt(LocalDateTime.now());
        log.setChangedBy("SYSTEM");

        Long recordId = null;

        if (result != null) {
            try {
                Field field = result.getClass().getDeclaredField("id");
                field.setAccessible(true);

                Object value = field.get(result);

                if (value != null) {
                    recordId = Long.parseLong(value.toString());
                }

            } catch (Exception e) {
                recordId = null;
            }
        }

        log.setRecordId(recordId);

        auditLogRepository.save(log);
    }
}