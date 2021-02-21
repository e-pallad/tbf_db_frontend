import React from "react";
import { useAuth } from "../context/auth";

function Admin(props) {
    const { setAuthTokens } = useAuth();

    function logOut(e) {
        e.preventDefault();
        setAuthTokens();
    }

    return (
        <div>
            <div>Admin Page</div>
            <button onClick={logOut}>Log out</button>
        </div>
    );
}

export default Admin;