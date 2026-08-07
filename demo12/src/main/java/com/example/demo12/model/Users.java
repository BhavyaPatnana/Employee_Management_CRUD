package com.example.demo12.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Users 
{
    @Id
    @GeneratedValue(strategy=(GenerationType.IDENTITY))
    int id;

    @Column
    String employeeid;
    String username;
    String email;
    String address;
    long salary;
    long phoneno;

    @OneToMany(mappedBy="emp",cascade=CascadeType.ALL)
    @JsonIgnore
    List<Project> project; 

    public void setEmployeeid(String eid)
    {
       this.employeeid=eid;
    }

    public void setUsername(String u)
    {
       this.username=u;
    }

    public void setEmail(String e)
    {
       this.email=e;
    }

    public void setAddress(String a)
    {
       this.address=a;
    }

    public void setSalary(long s)
    {
       this.salary=s;
    }

    public void setPhoneno(long p)
    {
       this.phoneno=p;
    }

    public int getId()
    {
        return this.id;
    }

    public String getEmployeeid()
    {
      return this.employeeid;
    }

    public String getUsername()
    {
        return this.username;
    }

    public String getEmail()
    {
        return this.email;
    }

    public String getAddress()
    {
        return this.address;
    }

    public long getSalary()
    {
        return this.salary;
    }
    
    public long getPhoneno()
    {
        return this.phoneno;
    }
}