import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


const token = localStorage.getItem("token");

/** get User details */
export async function getAllOrders(){
    try {
        const { data } = await axios.get(`/api/orders`, { headers: { Authorization: `Bearer ${token}` } });
        return { data };
    } catch (error) {
        return { error : "Order Not Found...!"}
    }
}


