import React, { useEffect, useState, useContext } from "react";
import "./OrdersList.css";
import UserContext  from "../../components/context/UserContext";
import { getAllOrdersForUser, getOrderItemsByOrderId } from "../../services/api";
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import { deleteOrder } from "../../services/api";
import CartContext from "../../components/context/CartContext";
import { getAllItems } from "../../services/api";

function OrdersList() {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const { clearCart } = useContext(CartContext);
    const { addToCart } = useContext(CartContext);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responce = await getAllOrdersForUser(user.id);
                setOrders(responce.data)
                console.log(responce.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();        
    },[])

    const handleViewOrder = async (order) => {
        try {
            console.log('Viewing order:', order);
            const orderId = order.id;
            const response = await getOrderItemsByOrderId(orderId);
    
            for (const itemInOrder of response.data) {
                const itemId = itemInOrder.itemId;
                const item = items.find(item => item.id === itemId);
    
                if (item) {
                    console.log('Adding item to cart:', item);
                    addToCart(item);
                }
            }
    

        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteOrder = async (order) => {
        try {
            const orderId = order.id;
            console.log(orderId);
            const response = await deleteOrder(orderId);
            setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Sheet>
            <Table>
                <thead>
                    <tr>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Total Price</th>
                        <th>Shipping Address</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.orderDate}</td>
                            <td>{order.orderStatus}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.orderShippingAddress}</td>
                            <td>
                                <Button onClick={() => handleViewOrder(order)}>View</Button>
                            </td>
                            <td>
                                <Button disabled={(order.orderStatus !== "TEMP")? true : false} onClick={() => handleDeleteOrder(order)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    )
}

export default OrdersList