import React, { useEffect,useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { getAllOrders } from '../../helper/order';

const Home = () => {

  const [loading,setLoading] = useState(true);
  const [orders,setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((data) => {
        setOrders(data.data);
        setLoading(false);
        console.log(orders);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  }, [loading]);

  if(loading){
    return(
      <div>loading</div>
    )
  }

  return (
    <div className="my-3">
      <div className="table-responsive">
        <table className="table">
          <thead className="table-warning">
            <tr>
              <th scope="col">
                <a href="/" className="btn btn-success" data-toggle="modal">
                  <AddCircleOutlineIcon /> <span></span>
                </a>
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order Id</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer Email</th>
              <th scope="col">Product-Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Order Value</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
{!orders? <>hello </> : <>

          {orders.map((order, index) => (
            <tr key={order._id}>
              <th scope="row">{index + 1}</th>
              <td>{order.id}</td>
              <td>{order.customer_name}</td>
              <td>{order.customer_email}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.order_value}</td>
              <td>
                <EditIcon />
              </td>
              <td>
                <DeleteIcon />
              </td>
            </tr>
          ))}
</>
}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
