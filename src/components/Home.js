import React, { useState, useEffect } from "react";
import "./Home.css";
import { getAllItems } from "../services/api";
import StoreFront from "./home/StoreFront";



function Home() {
    const [items, setItems] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getAllItems();
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }; 
    fetchData();
    }, []);
    console.log(items);

    return (
        <div>
            
            <StoreFront items={items} />
        </div>
    );
}

export default Home;