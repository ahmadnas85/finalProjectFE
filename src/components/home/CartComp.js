import React, { useState, useContext, Fragment } from "react";
import CartContext from "../../components/context/CartContext";
import UserContext  from "../../components/context/UserContext";
import "./CartComp.css"
import { createOrder } from "../../services/api";
import { getAllOrders } from "../../services/api";
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';

function CartComp() {
    const { cart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const { removeFromCart } = useContext(CartContext);
    const { clearCart } = useContext(CartContext);
    const [saved, setSaved] = useState(false);

    const handleCheckOut = () => {
        try {
            if (user) {
                alert("Checkout successful, your items will be sent to " + user.addressCountry + " " + user.addressCity);
                clearCart();
            } else {
                alert("Please login to checkout");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveOrder = async() => {
        const fullOrder = {}
        try {
            if (user) {
                const responce = await getAllOrders();

                fullOrder.order = {
                    orderId: responce.data.length + 1,
                    userId: user.id,
                    orderStatus: "TEMP",
                    orderDate: new Date(),
                    totalPrice: cart.reduce((total, item) => total + item.price, 0),
                    orderShippingAddress: user.addressCountry + " " + user.addressCity,
                };
                    fullOrder.itemsInOrder = [];
                    cart.forEach((item) => {
                        fullOrder.itemsInOrder.push({
                            orderId: responce.data.length + 1,
                            itemId: item.id,
                            quantity: 1
                        })
                    })
                const response = createOrder(fullOrder);

                setSaved(true);
                clearCart()
                } else {
                    alert("Please login to save order");
                }
            } catch (error) {
                console.log(error);
            }
        }
        

    
    return (
        <Fragment>
            {saved ? (
                <p>Order saved</p>
            ) : (
                <Sheet >
                    <Table
                    borderAxis="bothBetween"
                    color="neutral"
                    stickyFooter
                    stickyHeader={false}
                    variant="soft"
                    >
                    <thead>
                        <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.inStock}</td>
                            <td><Button onClick={() => removeFromCart(item)}>Remove from cart</Button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colSpan={5} style={{ textAlign: 'center' }}>Total: ${cart.reduce((total, item) => total + item.price, 0)}</td>
                        </tr>
                    </tfoot>
                    </Table>
                    <ButtonGroup aria-label="outlined primary button group">
                        <Button onClick={handleCheckOut}>Checkout</Button>
                        <Button onClick={() => clearCart()}>Clear cart</Button>
                        <Button onClick={handleSaveOrder}>Save order</Button>
                    </ButtonGroup>
                </Sheet>
                




                
            )}
        </Fragment>
    )
}

export default CartComp
