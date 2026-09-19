package com.minh.portfolio_backend.repository;

import com.minh.portfolio_backend.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // This automatically generates the SQL to filter and paginate!
    Page<Post> findByCategory(String category, Pageable pageable);
}