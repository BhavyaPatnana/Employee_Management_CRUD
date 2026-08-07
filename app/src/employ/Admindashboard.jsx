import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

//child component  for admindashboard and showing employee details
function EmployeeTable({ data, onDelete ,onupdatesalary }) 
{ 
 const [value,setvalue]=useState("")
 const [search,setsearch]=useState(false)
 const [text,settext]=useState([])
  
 const search1 = async (value) =>
    {
      console.log(value)
      try
      {
      console.log("tetydudfdfisdgd")
      const info=await axios.get(`http://localhost:5588/api/admin/searchuser?suser=${value}`,{withCredentials:true})
      console.log(info.data)
      settext(info.data)
      setsearch(true)
      }
      catch(err)
      {
        console.log(err)
      }
    }
  return (
    <>
    <input type="text" placeholder="Search Employee Name" onChange={(e)=>{setvalue(e.target.value)}}/>
    <button onClick={()=>{search1(value)}}>Search</button>
    {search && <SearchTable edata={text}/>}
    <table border="2">
      <thead>
        <tr>
          <th>Id</th>
          <th>Employee Id</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Address</th>
          <th>Salary</th>
          <th>Phone No.</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.id}>
            <td>{d.id}</td>
            <td>{d.employeeid}</td>
            <td>{d.username}</td>
            <td>{d.email}</td>
            <td>{d.address}</td>
            <td>{d.salary}</td>
            <td>{d.phoneno}</td>
            <td>
              <button onClick={() => onDelete(d.id)}>Delete</button>
              <button onClick={()=>onupdatesalary(d.email)}>Update salary</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

function SearchTable({edata})
{
  return(
     <table border="2">
      <thead>
        <tr>
          <th>Id</th>
          <th>Employee Id</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Address</th>
          <th>Salary</th>
          <th>Phone No.</th>
        </tr>
      </thead>
      <tbody>
        {edata.map((d) => (
          <tr key={d.id}>
            <td>{d.id}</td>
            <td>{d.employeeid}</td>
            <td>{d.username}</td>
            <td>{d.email}</td>
            <td>{d.address}</td>
            <td>{d.salary}</td>
            <td>{d.phoneno}</td>        
          </tr>
        ))}
      </tbody>
    </table>
  )
}


//child component for admindashboard showing project details
function ProjectTable({data1}) {
  return (
    <table border="2">
      <thead>
        <tr>
          <th>Id</th>
          <th>Employee Id</th>
          <th>Project Code</th>
          <th>Project Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data1.map((p) => (
          <tr key={p.projectcode}>
            <td>{p.id}</td>
            <td>{p.employid}</td>
            <td>{p.projectcode}</td>
            <td>{p.projectname}</td>
            <td>{p.startdate}</td>
            <td>{p.enddate}</td>
            <td>{p.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


//parent component
function Admindashboard()
{
    const [showTable, setShowTable] = useState(false);
    const [data,setdata]=useState([])
    const [pdata,setpdata]=useState([])
    const [showproject,setshowproject]=useState(false)

    //view all employee data
    const viewalldata = async () =>
    {
        if(!showTable)
        {
       await fetchemployeedata();
       setShowTable(true)
    }
         else {
      // Toggle to hide the table
      setShowTable(false);
    }
    }

    const fetchemployeedata = async() =>
    {
       try
        {
          const result= await axios.get("http://localhost:5588/api/admin/allempdata",{withCredentials:true})
          console.log(result.data) 
          const sorted = result.data.sort((a, b) => b.id - a.id);
          setdata(sorted)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    //delete employee data
    const del = async (id) =>
    {
      try
      {
      const res=await axios.delete(`http://localhost:5588/api/admin/delete/${id}`,{withCredentials:true})
      console.log(res.data)
      alert(res.data)
      fetchemployeedata();
      }
      catch(err)
      {
        console.log(err)
      }

    }

    //update employee salary
    const updatesalary= async (email) =>
    {
      try
      {
        const newsalary=prompt("Enter New salary")
        console.log(newsalary)
        const newsal= await axios.post(`http://localhost:5588/api/admin/updatesalary/${email}/${newsalary}`,{withCredentials:true})
        console.log(newsal)
        alert(newsal.data)
        fetchemployeedata();
      }
      catch(err)
      {
        console.log(err)
      }
    }


//view all projects
    const viewprojects = async() =>
    {
      if(!showproject)
      {
     try
     {
        const res=await axios.get("http://localhost:5588/api/admin/allprojects",{withCredentials:true})
        console.log(res.data)
        setpdata(res.data)
        setshowproject(true)
     }
     catch(err)
     {
        console.log(err)
     }
    }
    else
    {
      setshowproject(false);
    }
    }
    return(
        <>
        <style>{`
        .addemp
        {
        font-size:20px;
        margin-right:100px;
        }
        .log
        {
        font-size:20px;
        }
        .addemp:hover
        {
        text-decoration:underline;
        }
        .log:hover
        {
        text-decoration:underline;
        }
        `}
        </style>
        <div>
          <h1>Admin Dashboard</h1>
        <Link to="/register" className="addemp">Add Employee</Link>
        <Link to="/" className="log">Logout</Link><br/>
        <button onClick={viewalldata}>{showTable?"Hide Employees" :"View all Employees"}</button>
        {showTable && <EmployeeTable data={data} onDelete={del} onupdatesalary={updatesalary}/>}<br/>
        <button onClick={viewprojects} className="but">{showproject?"Hide projects":"View all Projects"}</button>
        {showproject && <ProjectTable data1={pdata}/>}
        </div>
        </>
    )
}
export default Admindashboard