import React, { useState, useEffect } from "react";
import "./OrderPage.css";
import Navbar from "../../component/Navbar/Navbar";
import OrderRow from "../../component/OrderRow/OrderRow";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { FETCH_ALL_PRODUCT_URL } from "../../constants";
import axios from "axios";

export default function OrderPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState({});

  const [quantity, setQuantity] = useState({});
  const [laundryData, setLaundryData] = useState({});

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_BASE_URL}${FETCH_ALL_PRODUCT_URL}`;
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.data);
        setError({ ...error, fetch_product: "" });
        let qty =
          response.data.data.length &&
          response.data.data.map((item) => ({
            [item.itemName]: 0,
          }));
        setQuantity(qty);
      })
      .catch((errorResponse) =>
        setError({ ...error, fetch_product: errorResponse })
      );
  }, []);

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }

  function handleClick({ singleProduct }) {
    console.log({ singleProduct });
  }

  function handleCheckBoxChange(event) {
    console.log(event.target.checked);
    const data = event.target.value.split(":");
    console.log(data);
    // const
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div id="order-head">
          <h2 className="head-left">Create Order</h2>
          <div className="head-right">
            {" "}
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <br />

        <main>
          {/* Hero unit */}

          <Container
            //  sx={{ py: 8 }}
            maxWidth="lg"
          >
            {/* End hero unit */}
            <Grid
              container
              //  spacing={4}
            >
              {products.length &&
                products.map((singleProduct) => (
                  <Grid
                    item
                    key={singleProduct.itemName}
                    xs={12}
                    sm={12}
                    md={12}
                    className="product-row"
                  >
                    <OrderRow
                      singleProduct={singleProduct}
                      handleCheckBoxChange={handleCheckBoxChange}
                      handleQuantityChange={handleQuantityChange}
                      quantity={quantity}
                    />
                  </Grid>
                ))}
            </Grid>
          </Container>
        </main>
        <div className="items"></div>

        <div className="btn">
          <button className="btn-c">Cancel</button>
          <button className="btn-p">Proceed</button>
        </div>

        <p className="total">
          <span className="lable">Total Items : </span>
          <span>0</span>
        </p>
        <p className="total">
          <span className="lable">Total Price : </span>
          <span>0</span>
        </p>
      </div>
    </>
  );
}
