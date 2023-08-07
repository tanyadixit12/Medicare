import React from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
const GoogleSignup = () => {
    const navigate = useNavigate();
    let details, name, email, password, cpassword;
    const handleGoogle = async () => {
        console.log(details.name);
        name = details.name;
        email = details.email
        password = details.name
        cpassword = details.name
        let result = await fetch("http://localhost:5800/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password, cpassword }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.success === false) {
            alert("email already registered !");
        }
        else {
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.verify));
            navigate('/');
        }


    }


    return (

        <div>


            <GoogleOAuthProvider clientId="256985950998-k9nakcn6poiq8m2k8j32o84p7gflu0n9.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        details = jwt_decode(credentialResponse.credential);
                        console.log(details);
                        handleGoogle();
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    )
}
export default GoogleSignup;