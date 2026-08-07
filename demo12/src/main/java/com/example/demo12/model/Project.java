package com.example.demo12.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Project 
{
  @Id
  @GeneratedValue(strategy=(GenerationType.IDENTITY))
  int id;
   
  @Column
  String employid;
  String projectcode;
  String projectname;
  Date startdate;
  Date enddate;
  String status;

  @ManyToOne
  @JoinColumn(name="emp_id",nullable=false)
  Users emp;

  public void setemp(Users id)
  {
    this.emp=id;
  }

  public void setEmployid(String eid)
  {
    this.employid=eid;
  }

  public String getEmployid()
  {
    return this.employid;
  }

  public void setProjectcode(String pc)
  {
    this.projectcode=pc;
  }

   public void setProjectname(String pn)
  {
    this.projectname=pn;
  }

   public void setStartdate(Date sd)
  {
    this.startdate=sd;
  }

   public void setEnddate(Date ed)
  {
    this.enddate=ed;
  }

   public void setStatus(String s)
  {
    this.status=s;
  }

  public int getId()
  {
    return this.id;
  }

  public String getProjectcode()
  {
    return this.projectcode;
  }

   public String getProjectname()
  {
    return this.projectname;
  }

   public Date getStartdate()
  {
    return this.startdate;
  }

   public Date getEnddate()
  {
    return this.enddate;
  }

   public String getStatus()
  {
    return this.status;
  }
}
