import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

//child component for employeedashboard
function Empprojectdetails({projectdata})
{
  const updatestatus = async (pcode) =>
  {
    try
    {
      const status=prompt("enter new status")
      console.log(status)
      const statusres= await axios.post(`http://localhost:5588/api/user/newstatus/${pcode}/${status}`,{withCredentials:true})
      console.log(statusres)
      alert(statusres.data)
    }
    catch(err)
    {
      console.log(err)
    }
  }

  return(
    <>
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {projectdata.map((p) => (
          <tr key={p.projectcode}>
            <td>{p.id}</td>
            <td>{p.employid}</td>
            <td>{p.projectcode}</td>
            <td>{p.projectname}</td>
            <td>{p.startdate}</td>
            <td>{p.enddate}</td>
            <td>{p.status}</td>
            <td>
              <button onClick={()=>{updatestatus(p.projectcode)}}>Update Status</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

//parent component
function Employeedashboard()
{
    const [eprodata,seteprodata]=useState([])
    const [data,setdata]=useState({})
    const [emppt,setemppt]=useState(false)
    const getempdata = async () =>
    {
        try
        {
          const result= await axios.get("http://localhost:5588/api/user/empdata",{withCredentials:true})
          console.log(result.data) 
          setdata(result.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    useEffect( () =>
    {
       getempdata();
    },[]);

    //displaying login employee projects
    const emproject = async (id) =>
    {
        try
        {
       const res=await axios.post(`http://localhost:5588/api/user/empro/${id}`,{withCredentials:true})
       console.log(res.data)
       seteprodata(res.data)
       setemppt(true)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return(
        <>
        <style>{`
        .addpro
        {
        font-size:20px;
        margin-left:100px;
        margin-right:400px;
        }
        .log2
        {
        font-size:20px;
        }
        .addpro:hover
        {
        text-decoration:underline;
        }
        .log2:hover
        {
        text-decoration:underline;
        }
        `}
        </style>
        <div>
        <h1>Employee Dashboard</h1><br/>
        <Link to="/addproject" className="addpro">Add Project</Link>
        <Link to="/login" className="log2">Logout</Link>
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
                   <tr>
                        <td>{data.id}</td>
                        <td>{data.employeeid}</td>
                        <td>{data.username}</td>
                        <td>{data.email}</td>
                        <td>{data.address}</td>
                        <td>{data.salary}</td>
                        <td>{data.phoneno}</td>
                        <td>
                        <Link to="/update">Update</Link></td>
                    </tr>
                </tbody>
        </table>
        <button onClick={()=>{emproject(data.id)}}>View Project Details</button>
        {emppt && <Empprojectdetails projectdata={eprodata}/>}
        </div>
        </>
    )
}
export default Employeedashboard