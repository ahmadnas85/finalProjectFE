import React, { createContext, useState } from "react";

const UserContext = createContext({});

export function UserProvider  ({ children }) {
    const [user, setUser] = useState(null);

    const updateLoginUser = (userData) => {
        setUser(userData);
    }

    const logoutUser = () => {
        setUser(null);
    }
    
    return (
        <UserContext.Provider value={{ user, updateLoginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
