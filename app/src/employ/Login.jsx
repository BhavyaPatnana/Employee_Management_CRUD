import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {Link} from "react-router-dom"

function Login()
{
    const nav=useNavigate();
    const [form,setform]=useState(
        {
           email:"",
           employeeid:""
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
        const result = await axios.post("http://localhost:5588/api/user/login",form,{withCredentials:true})
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
            <h1>Login</h1>
            <input onChange={change} type="email" name="email" placeholder="Enter Email"/><br/>
            <input onChange={change} type="text" name="employeeid" placeholder="Enter Employee Id"/><br/>
            <button type="submit">Login</button>
            {/*<h3>If you are not register?Click here</h3>
            <Link to="/empreg">Register</Link>*/}
        </form>
        </>
    )
}
export default Login