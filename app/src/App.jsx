import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./employ/Home"
import Register from "./employ/Register"
import Login from "./employ/Login"
import Admin from "./employ/Admin"
import Admindashboard from "./employ/Admindashboard"
import Employeedashboard from "./employ/Employeedashboard"
import Addproject from "./employ/Addproject"
import Update from "./employ/Update"
import  "./employ/Style.css"
import Empregister from "./employ/Empregister"


function App()
{
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/admindashboard" element={<Admindashboard/>}/>
      <Route path="/employeedashboard" element={<Employeedashboard/>}/>
      <Route path="/addproject" element={<Addproject/>}/>
      <Route path="/update" element={<Update/>}/>
      <Route path="/empreg" element={<Empregister/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
