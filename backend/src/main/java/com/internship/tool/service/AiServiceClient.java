package com.internship.tool.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.boot.web.client.RestTemplateBuilder;

import java.time.Duration;
import java.util.Map;

@Service
public class AiServiceClient {

    private static final Logger logger = LoggerFactory.getLogger(AiServiceClient.class);

    private final RestTemplate restTemplate;

    // AI service base URL from application.yml
    @Value("${ai.service.url:http://localhost:5000}")
    private String aiServiceUrl;

    // 10 second timeout
    public AiServiceClient(RestTemplateBuilder builder) {
        this.restTemplate = builder
                .connectTimeout(Duration.ofSeconds(10))
                .readTimeout(Duration.ofSeconds(10))
                .build();
    }

    /**
     * Call /describe endpoint
     * Returns AI description or null on error
     */
    public String describe(String riskDescription) {
        try {
            logger.info("Calling AI /describe endpoint...");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = Map.of("description", riskDescription);
            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(
                    aiServiceUrl + "/describe",
                    request,
                    String.class
            );

            logger.info("AI /describe call successful!");
            return response.getBody();

        } catch (Exception e) {
            logger.error("AI /describe call failed: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Call /recommend endpoint
     * Returns AI recommendations or null on error
     */
    public String recommend(String riskDescription) {
        try {
            logger.info("Calling AI /recommend endpoint...");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = Map.of("description", riskDescription);
            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(
                    aiServiceUrl + "/recommend",
                    request,
                    String.class
            );

            logger.info("AI /recommend call successful!");
            return response.getBody();

        } catch (Exception e) {
            logger.error("AI /recommend call failed: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Call /generate-report endpoint
     * Returns AI generated report or null on error
     */
    public String generateReport(String riskDescription) {
        try {
            logger.info("Calling AI /generate-report endpoint...");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = Map.of("description", riskDescription);
            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(
                    aiServiceUrl + "/generate-report",
                    request,
                    String.class
            );

            logger.info("AI /generate-report call successful!");
            return response.getBody();

        } catch (Exception e) {
            logger.error("AI /generate-report call failed: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Call /health endpoint
     * Returns true if AI service is up
     */
    public boolean isHealthy() {
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(
                    aiServiceUrl + "/health",
                    String.class
            );
            return response.getStatusCode() == HttpStatus.OK;

        } catch (Exception e) {
            logger.error("AI service health check failed: {}", e.getMessage());
            return false;
        }
    }
}