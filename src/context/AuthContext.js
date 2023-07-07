import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({children}){
    const [userlogged, setUserLogged] = useState("");

    useEffect(()=>{
        let curId = localStorage.getItem("code_for_tom_todo_user") || null;
        setUserLogged(curId);
    },[])

    const setCurrentUser = (user_ref) => {
        setUserLogged(user_ref);
    }

    return (
        <AuthContext.Provider value={{userlogged,setCurrentUser,setUserLogged}}>
            {children}
        </AuthContext.Provider>
    )
} 