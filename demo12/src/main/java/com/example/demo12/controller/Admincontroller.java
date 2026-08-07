package com.example.demo12.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo12.model.Project;
import com.example.demo12.model.Users;
import com.example.demo12.repository.ProjectRepository;
import com.example.demo12.repository.UserRepository;

@RestController
@CrossOrigin(origins="http://localhost:5173",allowCredentials="true")
@RequestMapping("/api/admin")
public class Admincontroller 
{
    @Autowired
    UserRepository ur;
   
    @Autowired
    ProjectRepository pr;

   @PostMapping("/adminid/{id}")
   ResponseEntity<?> a1(@PathVariable String id)
   {
       String pin="admin3578";
       if(pin.equals(id))
       {
           return ResponseEntity.ok("Admin Id is Correct"); 
       }
       return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid AdminId");
   }

   @GetMapping("/allempdata")
   ResponseEntity<?> empd1()
   {
    List<Users> data=ur.findAll();
    return ResponseEntity.ok(data); 
   }

   @DeleteMapping("/delete/{id}")
   ResponseEntity<?> d1(@PathVariable int id)
   {
    Users existuser=ur.findById(id).orElse(null);
    ur.delete(existuser);
    return ResponseEntity.ok("Employee Deleted");
   }

   @GetMapping("/allprojects")
   ResponseEntity<?> p1()
   {
    List<Project> pdata=pr.findAll();
    return ResponseEntity.ok(pdata);
   }

   @PostMapping("/updatesalary/{email}/{newsalary}")
   ResponseEntity<?> newsalary1(@PathVariable String email,@PathVariable long newsalary)
   {
    Users usersal=ur.findByEmail(email);
    usersal.setSalary(newsalary);
    ur.save(usersal);
    return ResponseEntity.ok("Salary Updated...");
   }

   @GetMapping("/searchuser")
   ResponseEntity<?> s1(@RequestParam String suser)
   {
    List<Users> existuser=ur.findByUsernameContainingIgnoreCase(suser);
    return ResponseEntity.ok((existuser));
   }
}

