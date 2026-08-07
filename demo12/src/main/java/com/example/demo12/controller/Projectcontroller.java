package com.example.demo12.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo12.model.Project;
import com.example.demo12.model.Users;
import com.example.demo12.repository.ProjectRepository;
import com.example.demo12.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins="http://localhost:5173",allowCredentials="true")
public class Projectcontroller 
{
  @Autowired
  ProjectRepository pr;

  @Autowired
  HttpSession session;

  @Autowired
  UserRepository ur;

  @PostMapping("/addproject")
  ResponseEntity<?> p1(@RequestBody Project p)
  {
    Project pro=pr.findByProjectcode(p.getProjectcode());
    if(pro != null)
    {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Project Code must be unique");
    }
    String loginemail=(String)session.getAttribute("uemail");
    Users user=ur.findByEmail(loginemail);
    p.setemp(user);
    if(user.getEmployeeid().equals(p.getEmployid()))
    {
    pr.save(p);
    return ResponseEntity.ok("Project Added");
    }
    return ResponseEntity.status(HttpStatus.CONFLICT).body("Your Employee Id is incorrect");
  }
}
