package com.example.demo12.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo12.model.Users;
import com.example.demo12.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class Employeeservice 
{
  @Autowired
  HttpSession session;

  @Autowired
  UserRepository ur;

  public Users empdata()
  {
    String loginemail=(String)session.getAttribute("uemail");
    Users loginuser=ur.findByEmail(loginemail);
    return loginuser;
  }
}
