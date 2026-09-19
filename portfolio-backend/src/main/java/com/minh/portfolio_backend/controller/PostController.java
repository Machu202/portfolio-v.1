package com.minh.portfolio_backend.controller;

import com.minh.portfolio_backend.model.Post;
import com.minh.portfolio_backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    // This creates an "uploads" folder in your backend project directory
    private static String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @GetMapping
    public Page<Post> getPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam String category) {
        
        // Sorts by newest first using the ID
        Pageable paging = PageRequest.of(page, size, Sort.by("id").descending());
        return postRepository.findByCategory(category, paging);
    }

    @PostMapping("/upload")
    public Post createPost(
            @RequestParam("title") String title,
            @RequestParam("category") String category,
            @RequestParam("content") String content,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
    ) throws IOException {
        
        Post newPost = new Post();
        newPost.setTitle(title);
        newPost.setCategory(category);
        newPost.setContent(content);

        // Logic: If a PC file was uploaded, save it. Otherwise, use the URL string.
        if (imageFile != null && !imageFile.isEmpty()) {
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            
            // Give the file a unique name using the current time
            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.write(filePath, imageFile.getBytes());
            
            // Save the local URL path to the database
            newPost.setImageUrl("http://localhost:8080/uploads/" + fileName);
        } else {
            newPost.setImageUrl(imageUrl);
        }

        return postRepository.save(newPost);
    }
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
    }
}