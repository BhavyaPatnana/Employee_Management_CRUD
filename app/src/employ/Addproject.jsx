import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Addproject()
{
    const nav=useNavigate();
    const [form,setform]=useState(
        {
           employid:"",
           projectcode:"",
           projectname:"",
           startdate:"",
           enddate:"",
           status:"Not Started"
        }
    )
    const change = (e) =>
    {
        setform({...form,[e.target.name]:e.target.value})
    }

    const submit = async (e) =>
    {
        e.preventDefault()
        try
        {
        const result = await axios.post("http://localhost:5588/api/project/addproject",form,{withCredentials:true})
        console.log(result)
        alert(result.data)
        nav("/employeedashboard")
        }
        catch(err)
        {
            console.log(err)
            alert(err.response.data)
        }
    }
    return(
        <>
        <form onSubmit={submit}>
            <h2>Project Details</h2>
            <input onChange={change} type="text" name="employid" placeholder="Enter Employee id"/><br/>
            <input onChange={change} type="text" name="projectcode" placeholder="Enter project code"/><br/>
            <input onChange={change} type="text" name="projectname" placeholder="Enter project Name"/><br/>
            <input onChange={change} type="date" name="startdate" placeholder="Enter project Start Date"/><br/>
            <input onChange={change} type="date" name="enddate" placeholder="Enter project End Date"/><br/>
            <select name="status" onChange={change}>
            <option value="Not Started">Not Started</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
           </select><br/>
           <button onClick={submit}>Add Project</button>
        </form>
        </>
    )
}
export default Addproject