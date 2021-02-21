import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Bearbeiten from './bearbeiten/Bearbeiten';
import Erzeugen from './erzeugen/Erzeugen';
import Export from './export/Export';
//import Auswerten from './auswerten/Auswerten';
import Import from './import/Import';

import './App.css';

import { AuthContext } from "./context/auth";

export default function App(props) {
    
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(existingTokens);
    
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }
    
    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/admin" component={Admin} />
                <PrivateRoute path="/bearbeiten" component={Bearbeiten} />
                <PrivateRoute path="/erzeugen" component={Erzeugen} />
                <PrivateRoute path="/export" component={Export} />
                {/* <Route path="/auswerten" component={Auswerten} /> */}
                <PrivateRoute path="/import" component={Import} />
            </Router>
        </AuthContext.Provider>
    );
}