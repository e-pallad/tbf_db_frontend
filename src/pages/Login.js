import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import './Login.scss';
import { ReactComponent as TBFLogo } from '../img/tbf_logo.svg'

export default function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin(e) {
        e.preventDefault();

        const formData = new FormData();  
        formData.append('username', userName); 
        formData.append('password', password);

        const config = { 
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': 'https://tbf-db-backend.ep-projekte.de/auth.php'
            },
        };
        
        fetch("https://tbf-db-backend.ep-projekte.de/auth.php", config)
        .then(result => {
            if (result.status === 200) {
                return result
            } else {
                setIsError(true);
            }
        })
        .then(res => res.json())
        .then(result => {
            setAuthTokens(result);
            setLoggedIn(true);
        })
        .catch(e => {
            console.error(e)
            setIsError(true);
        });
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className="wrapper">
            <div className="login">
                <div className="logo">
                    <TBFLogo />
                </div>
                <div className="tabs">
                    <div className="tab active">Anmelden</div>
                </div>
                <form>
                    <div className="input">
                        <input 
                            type="username"
                            id="username"
                            value={userName}
                            onChange={e => {setUserName(e.target.value);}}
                        />
                        <label htmlFor="username">Benutzername</label>
                    </div>
                    <div className="input">
                        <input
                            type="password"
                            id="password"
                            value={password} 
                            onChange={e => {setPassword(e.target.value);}} 
                        />
                        <label htmlFor="password">Passwort</label>
                    </div>
                    <button onClick={postLogin}>Anmelden</button>
                </form>
            { isError &&<div>Benutzername oder Passwort falsch!</div> }
            </div>
        </div>
    );
}