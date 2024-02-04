import React from "react";
import "./StoreFront.css";
import ItemCard from "./ItemCard";

function StoreFront(props) {
    return (
        <div className="storeFront">
            {props.items.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    )
}

export default StoreFront