import axios from "axios"
import { useState } from "react"

function Empregister()
{
    const [regdata,setregdata]=useState(
        {
        username:"",
        email:"",
        password:""
        }
    )
    const change = (e) =>
    {
        setregdata({...regdata,[e.target.name]:e.target.value})
    }
    const submit = async() =>
    {
        try
        {
            const res= await axios.post("http://localhost:5588/api/user/empregister",regdata,{withCredentials:true})
            console.log(res.data)
            alert(res.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return(
        <form onSubmit={submit}>
        <h1>Register</h1>
        <input type="text"  name="username" onChange={change} placeholder="Create username"/>
        <input type="email" name="email" onChange={change} placeholder="Enter email"/>
        <input type="password" name="password" onChange={change} placeholder="Enter password"/>
        <button type="submit">Register</button>
        </form>
    )
}
export default Empregister