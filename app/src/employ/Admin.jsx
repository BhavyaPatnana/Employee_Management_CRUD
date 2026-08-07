import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Admin()
{
    const nav=useNavigate();
    const [form,setform]=useState("");
    const submit = async (e) =>
    {
        e.preventDefault();
        try
        {
            console.log(form)
            const result=await axios.post(`http://localhost:5588/api/admin/adminid/${form}`)
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
        <h1>Admin Page</h1>
        <input onChange={(e)=>{setform(e.target.value)}} type="text" name="id" placeholder="Enter Admin Id"/>
        <button type="submit">OK</button>
        </form>
        </>
    )
}
export default Admin