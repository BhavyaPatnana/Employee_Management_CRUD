import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register()
{
    const nav=useNavigate();
    const [form,setform]=useState(
        {
           employeeid:"",
           username:"",
           email:"",
           address:"",
           salary:"",
           phoneno:""
        }
    )
    const change = (e) =>
    {
        setform({...form,[e.target.name]:e.target.value})
    }

    const submit = async (e) =>
    {
        e.preventDefault()
        const emailpattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailpattern.test(form.email))
        {
            alert("Please enter a valid Email Address");
        }
        try
        {
        const result = await axios.post("http://localhost:5588/api/user/register",form)
        console.log(result)
        alert(result.data)
        nav("/admindashboard")
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
            <h1>Add new Employee</h1>
            <input onChange={change} type="text" name="employeeid" placeholder="Create Employee id"/><br/>
            <input onChange={change} type="text" name="username" placeholder="Create User"/><br/>
            <input onChange={change} type="email" name="email" placeholder="Enter Email"/><br/>
            <input onChange={change} type="text" name="address" placeholder="Enter Address"/><br/>
            <input onChange={change} type="text" name="salary" placeholder="Enter Salary"/><br/>
            <input onChange={change} type="text" name="phoneno" placeholder="Enter Phone Number"/><br/>
            <button type="submit">Add Employee</button>
        </form>
        </>
    )
}
export default Register