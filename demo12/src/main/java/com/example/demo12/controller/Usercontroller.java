package com.example.demo12.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo12.model.Project;
import com.example.demo12.model.Users;
import com.example.demo12.repository.ProjectRepository;
import com.example.demo12.repository.UserRepository;
import com.example.demo12.service.Employeeservice;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins="http://localhost:5173",allowCredentials="true")
@RequestMapping("/api/user")

public class Usercontroller 
{
    @Autowired
    UserRepository ur;

    @Autowired
    HttpSession session;

    @Autowired
    Employeeservice es;

    @Autowired
    ProjectRepository pr;
  
  @PostMapping("/register")
  ResponseEntity<?> r1(@RequestBody Users u)
  {
    Users existuser=ur.findByEmail(u.getEmail());
    Users empid=ur.findByEmployeeid(u.getEmployeeid());
    if(existuser != null || empid != null)
    {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Email or Employee Id Already Exists");
    }
    ur.save(u);
    return ResponseEntity.status(HttpStatus.CREATED).body("Employee added Successfully");
  }

  @PostMapping("/login")
  ResponseEntity<?> l1(@RequestBody Users u)
  {
    Users existuser=ur.findByEmail(u.getEmail());
    if(existuser != null && existuser.getEmployeeid().equals(u.getEmployeeid()))
    {
      session.setAttribute("uemail", existuser.getEmail());
      return ResponseEntity.status(HttpStatus.CREATED).body("Login Successfull");
    }
    return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid Email or Employee Id");
  }

  @GetMapping("/empdata")
  ResponseEntity<?> e1()
  {
    Users u=es.empdata();
    return ResponseEntity.ok(u);
  } 

  @PostMapping("/empro/{id}")
  ResponseEntity<?> ep1(@PathVariable int id)
  {
     Users loginuser=ur.findById(id).orElse(null);
     List<Project> prodata=pr.findByemp(loginuser);
     return ResponseEntity.ok(prodata);
  }

  @PostMapping("/update")
  ResponseEntity<?> u1(@RequestBody Users u)
  {
     String email=(String)session.getAttribute("uemail");
     Users existuser=ur.findByEmail(email);
     existuser.setUsername(u.getUsername());
     existuser.setEmail(u.getEmail());
     existuser.setAddress(u.getAddress());
     existuser.setPhoneno(u.getPhoneno());
     ur.save(existuser);
     return ResponseEntity.ok("Updated...");
  }

  @PostMapping("/newstatus/{pcode}/{status}")
  ResponseEntity<?> newstatus1(@PathVariable String pcode,@PathVariable String status)
  {
    Project p=pr.findByProjectcode(pcode);
    p.setStatus(status);
    pr.save(p);
    return ResponseEntity.ok("Status Updated...");
  }
}



