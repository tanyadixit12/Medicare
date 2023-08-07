import React from "react";
import { Navigate,Outlet,Route,Routes } from "react-router-dom";
const Privatecomp=()=>{
    const auth= localStorage.getItem('user');

    return auth?<Outlet />:<Navigate to="/signup" />
    // if(auth)
    // <Outlet />
    // if(auth)
    // {
    //     return <Outlet />;
    // }
    // else{
    //     return (
    //         <Routes>
    //           <Route path="/signup" element={<Navigate to="/signup" />} />
    //           <Route path="/reset-link" element={<Navigate to="/reset-link" />} />
    //         </Routes>
    //       );
    // }
}

export default Privatecomp;