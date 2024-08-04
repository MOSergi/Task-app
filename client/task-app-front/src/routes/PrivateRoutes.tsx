import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { NotFoundPage } from "../pages/not_found";

export const PrivateRoutes = ()=>{
    const { token } = useContext(AuthContext) as any;

    return(
        <>
            {
                !token
                ?
                <Navigate to="/"/>
                :
                <Routes>
                    <Route path="/tasks" element={<>Task page</>}/>
                    <Route path="/tasks/:id" element={<>Task detail page</>}/>
                    <Route path="/profile" element={<>Profile page</>}/>
                    <Route path="/*" element={<NotFoundPage />}/>   
                </Routes>
            }
        </>
    );
}