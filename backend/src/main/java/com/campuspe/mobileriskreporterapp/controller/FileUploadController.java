package com.campuspe.mobileriskreporterapp.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.campuspe.mobileriskreporterapp.service.FileUploadService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") 
public class FileUploadController {

    private final FileUploadService fileUploadService;

    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/upload") 
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {

        try {
            String result = fileUploadService.uploadFile(file);

            return ResponseEntity.ok(Map.of(
                "message", "File uploaded successfully",
                "filename", result,
                "size", file.getSize()
            ));

        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage()
            ));

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Upload failed"
            ));
        }
    }
}