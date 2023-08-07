import React from "react";
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
    MDBIcon
}
    from 'mdb-react-ui-kit';
    import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "react-bootstrap";
import { faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const Resetpass = () => {
    const [password, setPassword] = React.useState("");
        const [cpassword, setCpassword] = React.useState("");

        const showSuccessMessage = () => {
            toast.success('Goto Login!', {
                position: toast.POSITION.TOP_RIGHT
            });
        };

    const Handlereset = async() => {
        console.log(password,cpassword);
        
        if(!password||!cpassword||password!==cpassword)
        {
            alert("please provide valid field");
        }
        else{
            showSuccessMessage();
            let result =  fetch("http://localhost:5800/reset-link", {
                method: "Put",
                body: JSON.stringify({
                  password,
                  cpassword
                }),
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                }
              });

        }
        


    }
    return (

        <div className="box" style={{ height: "50vh", marginTop: "30vh" }}>

            <MDBContainer className=" d-flex flex-column w-50">
                <MDBInput placeholder="New Password" wrapperClass='mb-4' id='form1' type='password' onChange={(e)=>{setPassword(e.target.value)}} value={password} />

                <MDBInput placeholder="Confirm Password" wrapperClass='mb-4' id='form2' type='password' onChange={(e)=>{setCpassword(e.target.value)}} value={cpassword} />

                <Button onClick={Handlereset} >Submit</Button>
                <ToastContainer />
                <div className="text-center" >
                    <p style={{ margin: "10px" }}>Forgot password <a href="forget-link">Send Email!</a></p>

                </div>

            </MDBContainer>

        </div>

    )
}
export default Resetpass;