import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getAllOrders, addNewOrder, editOrder, deleteOrder } from '../../helper/order';
import FadeLoader from "react-spinners/FadeLoader";
import './Home.css'

const Home = () => {

  //States
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortOption, setSortOption] = useState("#");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(25);
  const [newOrderData, setNewOrderData] = useState({
    id: '',
    customer_name: '',
    customer_email: '',
    product: '',
    quantity: '',
  });

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);

  //Functions
// 1)Search Function 
  const handleSearch = (e) => {
    e.preventDefault();
    // Filter orders based on search criteria
    const filteredOrders = orders.filter(
      (order) =>
        order.id.includes(searchInput) ||
        order.customer_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Update the search results state
    setSearchResults(filteredOrders);
  };

// 2)Sorting Function 

  const sortOrders = (orders, sortOption) => {
    switch (sortOption) {
      case "lowest":
        return orders.sort((a, b) => a.order_value - b.order_value);
      case "highest":
        return orders.sort((a, b) => b.order_value - a.order_value);
      case "quantitylowest":
        return orders.sort((a, b) => a.order_value - b.order_value);
      case "quantityhighest":
        return orders.sort((a, b) => b.order_value - a.order_value);
      case "cnamereverse":
        return orders.sort((a, b) => b.customer_name.localeCompare(a.customer_name));
      case "cname":
        return orders.sort((a, b) => a.customer_name.localeCompare(b.customer_name));
      default:
        return orders;
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };



  // 3)Function for Add new order or edit and order 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleFormSubmit = async () => {
    try {
      if (isEditModalOpen) {
        // Handle edit order logic
        await editOrder({ orderId: editOrderId, updatedData: newOrderData });
      } else {
        // Handle add new order logic
        await addNewOrder({ ...newOrderData });
      }

      setLoading(true);
      setNewOrderData({
        id: '',
        customer_name: '',
        customer_email: '',
        product: '',
        quantity: '',
      });
      setEditModalOpen(false);
      setEditOrderId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditOrder = (orderId) => {
    // Find the order with the given ID
    const orderToEdit = orders.find((order) => order.id === orderId);

    if (orderToEdit) {
      // Populate the form with order details
      setNewOrderData({ ...orderToEdit });
      setEditModalOpen(true);
      setEditOrderId(orderId);

    }
  };




  // 4)Function to close the modals 
  const handleClose = () => {
    setNewOrderData({
      id: '',
      customer_name: '',
      customer_email: '',
      product: '',
      quantity: '',
    });
  }

// 5)Function to delete Orders 

  const handleDeleteOrder = async (orderId) => {
    try {
      // Calling deleteOrder function
      await deleteOrder(orderId);

      // Updating the local state to remove the deleted order
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      alert(`Are you sure to delete order with order id ${orderId} ?`);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };


// 6)Function to get Orders 
  useEffect(() => {
    getAllOrders()
      .then((data) => {
        const sortedOrders = sortOrders(data.data, sortOption);
        setOrders(sortedOrders);
        setLoading(false);
        console.log(orders);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
    // eslint-disable-next-line
  }, [loading, sortOption]);




  // 7) Mathematics for Orders per page 
  // Calculate total number of pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = searchInput ? searchResults.slice(indexOfFirstOrder, indexOfLastOrder) : orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // 8)Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



//handling data fetching
  if (loading) {
    return (
      <div className='container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <FadeLoader color="#36d7b7" />
        Loading
      </div>
    )
  }


  return (
    <div className="my-3">
      <div className="table-responsive">


{/* 1)        Pagination */}
        <div class="overflow-x-auto mx-3">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => paginate(currentPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => paginate(currentPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                  <a className="page-link" href="#" onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </a>
                </li>
              ))}

            </ul>
          </nav>
        </div>




{/* 2)        Table  */}
        <table className="table">
          <thead className="table-warning">
            <tr>


              {/* modal to add order  */}
              <th scope="col" colSpan="2">

                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><div className="btn btn-success" data-toggle="modal">
                  <AddCircleOutlineIcon /> <span>Add New Order</span>
                </div></button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Order</h1>
                        <button type="button" class="btn-close closebtn" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}>X</button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Order Id</label>
                            <input type="text" class="form-control" id="id" name='id' value={newOrderData.id} onChange={handleInputChange} />
                          </div>
                          <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Customer Name</label>
                            <input type="text" class="form-control" id="customer_name" name='customer_name' value={newOrderData.customer_name} onChange={handleInputChange} />
                          </div>
                          <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Customer_Email</label>
                            <input type="text" class="form-control" id="customer_email" name='customer_email' value={newOrderData.customer_email} onChange={handleInputChange} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="product" className="col-form-label">
                              Product
                            </label>

                            <div className="dropdown">
                              <select
                                className="btn btn-secondary modalclosebtn"
                                id="product"
                                name="product"
                                value={newOrderData.product}
                                onChange={handleInputChange}
                              >
                                <option value="">Select a Product</option>
                                <option value="Product 1">Product 1 ($29)</option>
                                <option value="Product 2">Product 2 ($49)</option>
                                <option value="Product 3">Product 3 ($149)</option>
                              </select>
                            </div>
                          </div>

                          <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Quantity</label>
                            <input type="text" class="form-control" id="quantity" name='quantity' value={newOrderData.quantity} onChange={handleInputChange} />
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary modalclosebtn" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                        <button type="button" class="btn btn-primary modalsavebtn" onClick={handleFormSubmit} data-bs-dismiss="modal" >Add Order</button>
                      </div>
                    </div>
                  </div>
                </div>


              </th>

              <th scope="col" colSpan="3">
                <form class="d-flex" role="search" onSubmit={handleSearch}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search by OrderId, CustomerName, CustomerEmail"
                    aria-label="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />

                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form>

              </th>


              <th scope="col" colSpan="1">

                <div class="input-group">
                  <select
                    class="form-select"
                    id="inputGroupSelect04"
                    aria-label="Example select with button addon"
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      if (selectedValue === "1") {
                        setOrdersPerPage(10);
                      } else if (selectedValue === "2") {
                        setOrdersPerPage(20);
                      } else if (selectedValue === "3") {
                        setOrdersPerPage(50);
                      }
                    }}
                  >
                    <option selected>Orders Per Page</option>
                    <option value="1">10</option>
                    <option value="2">20</option>
                    <option value="3">50</option>
                  </select>
                </div>

              </th>



              <th scope="col" colSpan="3">

                <form action="#">
                  <label htmlFor="sort"></label>
                  <select name="sort" id="sort" onChange={handleSortChange} value={sortOption}>
                    <option value="#" selected>Sort</option>
                    <option value="lowest">Order Value(lowest)</option>
                    <option value="highest">Order Value(highest)</option>
                    <option value="quantitylowest">Quantity(lowest)</option>
                    <option value="quantityhighest">Quantity(highest)</option>
                    <option value="cname">Customer Name (a-z)</option>
                    <option value="cnamereverse">Customer Name (z-a)</option>
                  </select>

                </form>

              </th>

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
            {!currentOrders || currentOrders.length === 0 ? (
              <tr>
                <td colSpan="9">No orders to show!</td>
              </tr>
            ) : (
              currentOrders.map((order, index) => (
                <tr key={order._id}>
                  <th scope="row">{(currentPage - 1) * ordersPerPage + index + 1}</th>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.customer_email}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.order_value}</td>
                  <td>
                    <div
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      data-bs-whatever="@mdo"
                    >
                      <div
                        className="btn"
                        data-toggle="modal"
                        onClick={() => handleEditOrder(order.id)}
                      >
                        <EditIcon />
                      </div>
                    </div>


                    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Order</h1>
                            <button type="button" class="btn-close closebtn" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}>X</button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Order Id</label>
                                <div />{newOrderData.id}
                              </div>
                              <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Customer Name</label>
                                <input type="text" class="form-control" id="customer_name" name='customer_name' value={newOrderData.customer_name} onChange={handleInputChange} />
                              </div>
                              <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Customer_Email</label>
                                <input type="text" class="form-control" id="customer_email" name='customer_email' value={newOrderData.customer_email} onChange={handleInputChange} />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="product" className="col-form-label">
                                  Product
                                </label>

                                <div className="dropdown">
                                  <select
                                    className="btn btn-secondary modalclosebtn"
                                    id="product"
                                    name="product"
                                    value={newOrderData.product}
                                    onChange={handleInputChange}
                                  >
                                    <option value="">Select a Product</option>
                                    <option value="Product 1">Product 1 ($29)</option>
                                    <option value="Product 2">Product 2 ($49)</option>
                                    <option value="Product 3">Product 3 ($149)</option>
                                  </select>
                                </div>
                              </div>

                              <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Quantity</label>
                                <input type="text" class="form-control" id="quantity" name='quantity' value={newOrderData.quantity} onChange={handleInputChange} />
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary modalclosebtn" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                            <button type="button" class="btn btn-primary modalsavebtn" onClick={handleFormSubmit} data-bs-dismiss="modal" >Edit</button>
                          </div>
                        </div>
                      </div>
                    </div>





                  </td>
                  <td style={{ cursor: 'pointer' }}>
                    <DeleteIcon onClick={() => handleDeleteOrder(order.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>




{/* 3)        Pagination */}
        <div class="overflow-x-auto mx-3">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => paginate(currentPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => paginate(currentPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                  <a className="page-link" href="#" onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </a>
                </li>
              ))}

            </ul>
          </nav>
        </div>

      </div>
    </div>
  );
};

export default Home;
