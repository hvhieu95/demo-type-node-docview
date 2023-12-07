import React , { createContext, useState, useEffect, ReactNode  } from 'react'
import { jwtDecode } from "jwt-decode"
import { useNavigate  } from "react-router-dom"

interface ContextProps {
    readonly user: any | null;
    readonly authTokens: any | null;
    readonly registerUser: (e:React.FormEvent<HTMLFormElement>) => Promise<void>;
    readonly loginUser: (e:React.FormEvent<HTMLFormElement>) => Promise<void>;
    readonly logoutUser: () => void;
}

const AuthContext = createContext<ContextProps>({
    user: null,
    authTokens: null,
    registerUser: async () => {},
    loginUser: async () => {},
    logoutUser: () => null,
});


export default AuthContext;
interface Props {
    children?: ReactNode
}
export const AuthProvider = ({children}: Props) =>{
    
    let [authTokens, setAuthTokens] = useState(localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens") || "{}") : null);
    let [user, setUser] = useState<any | null>(authTokens ? jwtDecode(authTokens.access) :null);
    const [loading, setLoading] = useState(true);
      let navigate = useNavigate();
      

    // Register User
    let registerUser = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
            password2: { value: string };
            firstname: { value: string };
            lastname: { value: string };
            email: { value: string };
        };
        let response = await fetch('http://127.0.0.1:8000/auth/register/',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "username": target.username.value,
                "password": target.password.value,
                "password2": target.password2.value,
                "first_name": target.firstname.value,
                "last_name": target.lastname.value,
                "email": target.email.value,
            })
        });
        // let data = await response.json();
        if(response.status === 201){
            await login(target.username.value, target.password.value)
        }else{
            alert("Login Error")
        }
    };

    // Login for form
    let loginUser = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
        };
        login(target.username.value, target.password.value)
    };

    let login = async(username:string, password:string) =>{
        let response = await fetch('http://127.0.0.1:8000/auth/login/',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({"username": username, "password": password})
        });
        let data = await response.json();
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate('/home');
        }else{
            alert("Login Error")
        }
    }

    // Logout
    let logoutUser = () =>{
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    };

    // Update Refresh Token
    let updateToken = async() => {
        let response = await fetch('http://127.0.0.1:8000/auth/token/refresh/',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({"refresh": authTokens.refresh})
        });
        let data = await response.json();
        if(response.status === 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
        }else{
            alert("Auth Error")
            logoutUser();
        }
    };

    // Update token after 4 minutes
    useEffect(()=>{
        let fourminutes = 1000 * 60 *4;
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken();
            }
        }, fourminutes)
        return () => clearInterval(interval)
    },[authTokens, loading])

    const value = {
        user:user,
        authTokens:authTokens,
        registerUser:registerUser,
        loginUser:loginUser,
        logoutUser:logoutUser
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}