import {Link} from "react-router-dom"
function Home()
{
    return(
        <>
        <style>{`
            h1
            {
               color:skyblue;
            }
               .img
               {
               color:blue;
               }
               .admin1
               {
               position:absolute;
               font-size:25px;
               font-weight:bold;
               top:50px;
               left:500px;
               margin:30px;
               border:5px solid;
               padding:5px 8px;
               border-radius:10px;
               }
               .emp
               {
               position:absolute;
               font-size:25px;
               font-weight:bold;
               top:50px;
               left:670px;
               margin:30px;
               border:5px solid;
               padding:5px 8px;
               border-radius:10px;
               }
               .img 
               {
               width:100%;
               height:auto;
               }
               .emp:hover
               {
               text-decoration:underline;
               }
               .admin1:hover
               {
                text-decoration:underline
               }
             
            `}
        </style>
        <img src="/emp2.jpg" alt="image" className="img"></img>
        <Link to="/admin" className="admin1">Admin</Link><br></br>
        <Link to="/login" className="emp">Employee</Link>
        </>
    )
}
export default Home