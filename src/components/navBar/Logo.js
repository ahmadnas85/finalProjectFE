import React from "react";
import "./Logo.css";
import { Link } from "react-router-dom";

function Logo() {
    const logoUrl = "https://as2.ftcdn.net/v2/jpg/03/99/89/57/1000_F_399895799_vifshttMiDzueibnEhqlGhq7KoIR3Qwo.jpg";
    return (
        <div className="logo">
            <Link to="/">
                <img src={logoUrl} alt="logo" className="logoImg" />
            </Link>
        </div>
    );
}

export default Logo;