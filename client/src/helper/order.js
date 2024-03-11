import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


const token = localStorage.getItem("token");

/** get all orders details */
export async function getAllOrders(){
    try {
        const { data } = await axios.get(`/api/orders`, { headers: { Authorization: `Bearer ${token}` } });
        return { data };
    } catch (error) {
        return { error : "Order Not Found...!"}
    }
}

/** adding new order using post request */
export async function addNewOrder({ id, customer_name, customer_email, product, quantity }) {
    try {
        if(quantity<0){
            return { error: "Quantity Should be greter than 0" };
        }
        const response = await axios.post('/api/order/addneworder', {
            id,
            customer_name,
            customer_email,
            product,
            quantity
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong..." };
    }
}


// to edit an order 
export async function editOrder({ orderId, updatedData}) {
    try {
        if(updatedData.quantity<0){
            return { error: "Quantity Should be greter than 0" };
        }
        const response = await axios.put(`/api/order/edit/${orderId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong while editing the order..." };
    }
}

/** Delete an order using a delete request */
export async function deleteOrder(orderId) {
    try {
      const response = await axios.delete(`/api/order/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong while deleting the order..." };
    }
  }


