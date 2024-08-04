import Title from "antd/es/typography/Title";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { NotFoundPage } from "../pages/not_found";

export const PublicRoutes = ()=>{
    const { token } = useContext(AuthContext) as any;

    return(
        <>
            {
                token
                ?
                <Navigate to="/app/tasks"/>
                :
                <Routes>
                    <Route path="/register" element={<><Title>Register page</Title></>}/>
                    <Route path="/" element={<LoginPage />}/>   
                    <Route path="/*" element={<NotFoundPage />}/>
                </Routes>
            }
        </>
    );
}