package com.example.demo12.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo12.model.Project;
import com.example.demo12.model.Users;


public interface ProjectRepository extends JpaRepository<Project, Integer>
{
    Project findByProjectcode(String projectcode);
    List<Project> findByemp(Users u);
}
