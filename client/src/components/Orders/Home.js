import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Home = () => {
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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <EditIcon />
              </td>
              <td>
                <DeleteIcon />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
