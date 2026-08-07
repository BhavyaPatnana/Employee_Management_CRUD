package com.example.demo12.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo12.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer>
{
  Users findByEmail(String e);
  Users findByEmployeeid(String id);
  List<Users> findByUsernameContainingIgnoreCase(String username);
}
