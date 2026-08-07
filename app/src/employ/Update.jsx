import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Update()
{
    const nav=useNavigate();
    const [form,setform]=useState(
        {
           username:"",
           email:"",
           address:"",
           phoneno:""
        }
    )
    const change = (e) =>
    {
        setform({...form,[e.target.name]:e.target.value})
    }

    const submit = async (e) =>
    {
        e.preventDefault();
        try
        {
        const result = await axios.post("http://localhost:5588/api/user/update",form,{withCredentials:true})
        console.log(result)
        console.log(result.data)
        alert(result.data)
        getempdata();
        nav("/employeedashboard")
        }
        catch(err)
        {
            console.log(err)
            alert(err.response.data)
        }
    }

    const getempdata = async () =>
    {
        try
        {
          const result= await axios.get("http://localhost:5588/api/user/empdata",{withCredentials:true})
          console.log(result.data) 
          setform(result.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return(
        <>
        <h1>Update your Details</h1>
        <form onSubmit={submit}>
        <input onChange={change} type="text" name="username" placeholder="Create User"/><br/>
        <input onChange={change} type="email" name="email" placeholder="Enter Email"/><br/>
        <input onChange={change} type="text" name="address" placeholder="Enter Address"/><br/>
        <input onChange={change} type="text" name="phoneno" placeholder="Enter Phone Number"/><br/>
        <button type="submit">Update</button>
        </form>
         <table style={{display:'none'}}>
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
                        <td>{form.id}</td>
                        <td>{form.employeeid}</td>
                        <td>{form.username}</td>
                        <td>{form.email}</td>
                        <td>{form.address}</td>
                        <td>{form.salary}</td>
                        <td>{form.phoneno}</td>
                    </tr>
                </tbody>
        </table>
        </>
    )

}
export default Update