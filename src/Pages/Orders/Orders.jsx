import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Loading, OrderCard } from '../../Components'
import { useAuth } from '../../Context/AuthContext'
import './Orders.css'

export const Orders = () => {
    const [orders, setOrders] = useState([])
    const { auth } = useAuth()
    console.log(orders)
    useEffect(() => {
        ; (async () => {
            if (auth.loggedInToken) {
                try {
                    const serverResponse = await axios.get(
                        'https://api-agate.herokuapp.com/orders/',
                        { headers: { Authorization: auth.loggedInToken } }
                    )
                    if (serverResponse.status) {
                        console.log(serverResponse.data.orders)
                        setOrders(serverResponse.data.orders.reverse())
                    }
                } catch (error) {
                    console.log('Server response failed.', error)
                }
            }
        })()
    }, [auth])

    return (
        <div>
            <h3>Your Orders:</h3>
            {orders.length === 0 && <Loading />}
            {orders.length > 0 && orders.map(order => {
                return (<OrderCard orderId={order._id}
                    numberOfProducts={order.products.length}
                    totalQuantity={order.products.map((item) => item.quantity).reduce((curr, acc) => curr + acc, 0)}
                />
                )
            })
            }
        </div>
    )
}
