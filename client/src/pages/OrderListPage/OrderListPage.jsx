import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../component/Navbar/Navbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Table from "@mui/joy/Table";
import Chip from "@mui/joy/Chip";
import Button from "@mui/joy/Button";

import { USER_ORDER_URL } from "../../constants";

export default function OrderListPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (!auth) navigate("/");
    else setUser(JSON.parse(auth));
  }, []);

  useEffect(() => {
    if (user.id) {
      const url = `${process.env.REACT_APP_API_BASE_URL}${USER_ORDER_URL}/${user.id}`;
      axios
        .get(url)
        .then((response) => {
          setOrderList(response.data);
          setError({ ...error, fetch_order: "" });
        })
        .catch((errorResponse) =>
          setError({ ...error, fetch_order: errorResponse })
        );
    }
  }, [user.id]);

  function handleCancelOrder(orderId) {
    if (orderId) {
      const url = `${process.env.REACT_APP_API_BASE_URL}${USER_ORDER_URL}/${user.id}`;
      axios
        .patch(url, {
          orderId,
        })
        .then((response) => {
          setOrderList(response.data.data);
          setError({ ...error, fetch_order: "" });
        })
        .catch((errorResponse) =>
          setError({ ...error, fetch_order: errorResponse })
        );
    }
  }

  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Grid item xs={12} sm={12} md={12}>
          <p className="main-header">Order list</p>
        </Grid>
        <Grid container>
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>Serial</th>
                <th style={{ width: "30%" }}>Product details</th>
                <th>Total Quantity</th>
                <th>Date</th>
                <th>Address</th>
                <th>Status</th>
                <th>Total&nbsp;(₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList.length ? (
                orderList.map((singleOrder, index) => (
                  <tr
                    key={`${singleOrder.totalOrderPrice}-${singleOrder.dateOfOrder}`}
                  >
                    <td>{index + 1}</td>
                    <td>
                      {singleOrder.orderedItems.map((order) => (
                        <Fragment key={order._id}>
                          <p>
                            <strong>Product:</strong> {order.productType}
                          </p>
                          <p>
                            <strong>Quantity: </strong> {order.quantity}
                          </p>
                          <p>
                            <strong>Wash details: </strong>
                          </p>
                          {order.typeOfWash.map((wash, index) => (
                            <Chip
                              size="sm"
                              variant="outlined"
                              sx={{ mr: 1, mb: 1 }}
                              key={wash + index}
                            >
                              {wash} (₹{order.productCost[index]})
                            </Chip>
                          ))}
                        </Fragment>
                      ))}
                    </td>
                    <td>{singleOrder.totalItem}</td>
                    <td>
                      {new Date(
                        Number(singleOrder.dateOfOrder)
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <p>{singleOrder.shippingAddress}</p>
                      <p>Pincode: {singleOrder.pincode}</p>
                    </td>

                    <td>
                      <Chip
                        size="sm"
                        color={singleOrder.statusOfOrder ? "warning" : "danger"}
                      >
                        {singleOrder.statusOfOrder ? "Pending" : "Canceled"}
                      </Chip>
                    </td>
                    <td>{singleOrder.totalOrderPrice}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="danger"
                        onClick={() => handleCancelOrder(singleOrder._id)}
                        disabled={!singleOrder.statusOfOrder}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </Table>
          {!orderList.length && (
            <p className="d-flex w-100 center">No order found</p>
          )}
        </Grid>
      </Container>
    </>
  );
}