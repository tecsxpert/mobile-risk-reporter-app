

package com.campuspe.mobileriskreporterapp.service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {

    
    private static final long MAX_SIZE = 5 * 1024 * 1024;

    
    private static final List<String> ALLOWED_TYPES = List.of(
        "application/pdf",
        "image/png",
        "image/jpeg",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    private static final List<String> ALLOWED_EXTENSIONS = List.of(
        ".pdf", ".png", ".jpg", ".jpeg", ".docx"
    );

    public String uploadFile(MultipartFile file) throws IOException {

       
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        
        if (file.getSize() > MAX_SIZE) {
            throw new IllegalArgumentException(
                "File too large. Max size is 5MB. Your file: " 
                + (file.getSize() / 1024 / 1024) + "MB"
            );
        }

        
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException(
                "Invalid file type: " + contentType + 
                ". Allowed: PDF, PNG, JPG, DOCX"
            );
        }

        
        String originalName = file.getOriginalFilename();
        if (originalName == null) {
            throw new IllegalArgumentException("Invalid filename");
        }

        String extension = originalName.substring(
            originalName.lastIndexOf(".")).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException(
                "Invalid file extension: " + extension
            );
        }

        
        String newFileName = UUID.randomUUID() + extension;
        Path uploadPath = Paths.get("uploads/");
        Files.createDirectories(uploadPath);
        Files.copy(file.getInputStream(), 
            uploadPath.resolve(newFileName),
            StandardCopyOption.REPLACE_EXISTING);

        return newFileName;
    }
}