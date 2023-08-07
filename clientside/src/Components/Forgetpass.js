import React from "react";
import { useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Forgetpass=()=>{
    const [email, setEmail] = React.useState("");
    const navigate=useNavigate();
     // dispaly toast message ****************
   
    const showfailureMessage = () => {
        toast.success('Email not found !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
      
      // **************************************** 

    const handleSubmit=async()=>{
        console.warn(email);

        if(!email)
        {
            return showfailureMessage();;
        }
        let result = await fetch("http://localhost:5800/forget-link", {
                method: 'post',
                body: JSON.stringify({email}),
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result=await result.json();
            console.log("hello")
            console.log(result);



            if(result.user==undefined)
            {
                showfailureMessage();
            }
            else{
               

                localStorage.setItem("resettoken",JSON.stringify(result));
                navigate('/');
            }
      }


    return (
       
        <div className="box" style={{height:"50vh" ,marginTop:"30vh"}}>

            <MDBContainer className=" d-flex flex-column w-50">
<MDBInput placeholder="Email" wrapperClass='mb-4'  id='form1' type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>

            <Button onClick={handleSubmit}>Submit</Button>
            <ToastContainer />
            <div className="text-center" >
        {/* <p style={{margin:"10px"}}>To reset your password <a href="reset-link">Reset your password here!</a></p> */}

        </div>

            </MDBContainer>

        </div>
    )
}
 export default Forgetpass;