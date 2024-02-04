import React, { Fragment, useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import UserContext  from "../../components/context/UserContext";
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import { getAllOrdersForUser } from "../../services/api";





function NavBar() {
    const { user } = useContext(UserContext);
    const { logoutUser } = useContext(UserContext);




    return (
        <nav className="navBar">
            <Logo/>
            <Fragment>
                {user ? (
                    <div>
                        <ButtonGroup
                            color="success"
                            orientation="horizontal"
                            size="lg"
                            spacing={1}
                            variant="soft"
                        >
                            <Button>
                                <Link to="/orders" className="navLink">Orders</Link>
                            </Button>
                            <Button>
                                <Link to="/cart" className="navLink">Cart</Link>
                            </Button>
                            <Button onClick={() => logoutUser()}>
                                Logout
                            </Button>

                        </ButtonGroup>
                    </div>
                    ) : (
                    <div>
                        <ButtonGroup
                            color="success"
                            orientation="horizontal"
                            size="lg"
                            spacing={1}
                            variant="soft"
                        >
                            <Button>
                                <Link to="/about" className="navLink">About</Link>
                            </Button>
                            <Button>
                                <Link to="/cart" className="navLink">Cart</Link>
                            </Button>
                            <Button>
                                <Link to="/register" className="navLink">Register</Link>
                            </Button>
                            <Button>
                                <Link to="/login" className="navLink">Login</Link>
                            </Button>
                        </ButtonGroup>
                    </div>
                    )}
            </Fragment>
        </nav>
    );
}

export default NavBar