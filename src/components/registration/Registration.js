import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Input } from '@mui/base/Input';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



import "./Registration.css";
import { registerUser } from "../../services/api";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
function Registration() {
    const [user, setUser] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            addressCountry: "",
            addressCity: "",
            userName: "",
            userPassword: "",
        }
    );

    const [pasConf, setPasConf] = useState("");
    const [success, setSuccess] = useState(false);
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [validCountry, setValidCountry] = useState(false);
    const [countryFocus, setCountryFocus] = useState(false);
    const [validCity, setValidCity] = useState(false);
    const [cityFocus, setCityFocus] = useState(false);
    const [validUserName, setValidUserName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [validPasConf, setValidPasConf] = useState(false);
    const [pasConfFocus, setPasConfFocus] = useState(false);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(user.email));
    }, [user.email]);

    useEffect(() => {
        setValidUserName(USER_REGEX.test(user.userName));
    }, [user.userName]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(user.userPassword));
        setValidPasConf(user.userPassword === pasConf);
    }, [user.userPassword, pasConf]);

    const handleSubment = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(user));
        try {
            const response = await registerUser(user);
            console.log("Registration response:", response);
            setSuccess(true);
            setUser({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                addressCountry: "",
                addressCity: "",
                userName: "",
                userPassword: "",
            })
            setPasConf("");
        } catch (error) {
            console.error("Registration error:", error);
        }

        
    }
    return (


        
        <form onSubmit={handleSubment}>
            <h1>Registration</h1>
            <label>First Name:</label>
            <input 
                type="text" 
                placeholder="first name" 
                onChange={(e) => setUser({...user, firstName: e.target.value})}
                value={user.firstName}
                required
            />
            <label>Last Name:</label>
            <input 
                type="text" 
                placeholder="last name" 
                onChange={(e) => setUser({...user, lastName: e.target.value})}
                value={user.lastName}
                required
            />
            <label>
                Email:
                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"}/>
                <FontAwesomeIcon icon={faTimes} className={validEmail || !user.email ? "hide" : "invalid"}/>
            </label>
            <input 
                type="email" 
                placeholder="email" 
                onChange={(e) => setUser({...user, email: e.target.value})}
                value={user.email}
                required
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
            />
            <p
                id="emailnote"
                className={emailFocus && !validEmail ? "instructions" : "offscreen"}
            >
                <FontAwesomeIcon icon={faInfoCircle} />
                Please enter a valid email address.
            </p>
            <label>Phone:</label>
            <input 
                type="number" 
                placeholder="phone number" 
                onChange={(e) => setUser({...user, phone: e.target.value})}
                value={user.phone}
                required
            />
            <label>Country:</label>
            <input 
                type="text" 
                placeholder="address country" 
                onChange={(e) => setUser({...user, addressCountry: e.target.value})}
                value={user.addressCountry}
                required
            />
            <label>City:</label>
            <input 
                type="text" 
                placeholder="address city" 
                onChange={(e) => setUser({...user, addressCity: e.target.value})}
                value={user.addressCity}
                required
            />
            <label>
                Username:
                <FontAwesomeIcon icon={faCheck} className={validUserName ? "valid" : "hide"}/>
                <FontAwesomeIcon icon={faTimes} className={validUserName || !user.userName ? "hide" : "invalid"}/>
            </label>
            <input 
                type="text" 
                placeholder="username" 
                onChange={(e) => setUser({...user, userName: e.target.value})}
                value={user.userName}   
                required
                onFocus={() => setUserNameFocus(true)}
                onBlur={() => setUserNameFocus(false)}
            />
            <p 
                id="username-note"
                className={userNameFocus && user.userName && !validUserName ? "instructions" : "offscreen"}
            >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p>
            <label>
                Password:
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                <FontAwesomeIcon icon={faTimes} className={validPwd || !user.userPassword ? "hide" : "invalid"}/>
            </label>
            <input 
                type="password" 
                placeholder="password" 
                onChange={(e) => setUser({...user, userPassword: e.target.value})}
                value={user.userPassword}
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
            />
            <p
                id="password-note"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span>!</span> <span aria-label="at symbol">@</span> <span>#</span> <span>$</span> <span>%</span>
            </p>
            <label>
                Confirm Password:
                <FontAwesomeIcon icon={faCheck} className={validPasConf ? "valid" : "hide"}/>
                <FontAwesomeIcon icon={faTimes} className={validPasConf ? "hide" : "invalid"}/>
            </label>
            <input 
                type="password" 
                placeholder="confirm password" 
                onChange={(e) => setPasConf(e.target.value)}
                value={pasConf}
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
            />
            <p
                id="confirm-pwd-note"
                className={pwdFocus && !validPasConf ? "instructions" : "offscreen"}
            >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
            </p>
            <button disabled={!validUserName || !validPwd || !validPasConf ? true : false} type="submit">Register</button>
        </form>
    );
}

export default Registration