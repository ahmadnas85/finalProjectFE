import React, { useState, useContext, Fragment } from "react";
import "./Login.css";
import { loginUser } from "../../services/api";
import UserContext from "../context/UserContext";

function Login() {
    const {updateLoginUser} = useContext(UserContext);
    const {user} = useContext(UserContext)
    const [login, setLogin] = useState({
        username: "",
        password: ""
    });
    const [success, setSuccess] = useState(false);


    const handleSubment = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(login));
        try {
            const response = await loginUser(login);
            updateLoginUser(response.data)
            setSuccess(true);
            console.log("Login response:", response);
            setLogin({
                username: "",
                password: ""
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
        {success ? (<p>Login successful</p>) : (
        <form onSubmit={handleSubment}>
            <h1>Login</h1>
            <label htmlFor="username">Username:</label>
            <input 
                type="text" 
                placeholder="username" 
                id="username"
                value={login.username}
                onChange={(e) => setLogin({ ...login, username: e.target.value })}
                required
                autoFocus
                autoComplete="off"
            />
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                placeholder="password" 
                id="password"
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                required
                autoComplete="off"
            />
            <button type="submit" disabled={!login.username || !login.password}>
                Login
            </button>
        </form>)}  
        </Fragment>
    );
}

export default Login