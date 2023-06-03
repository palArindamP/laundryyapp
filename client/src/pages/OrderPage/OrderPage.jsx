import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderPage.css";
import Navbar from "../../component/Navbar/Navbar";
import OrderRow from "../../component/OrderRow/OrderRow";
import OrderConfirmationModal from "../../component/Modal/OrderConfirmationModal";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/joy/Button";

import { FETCH_ALL_PRODUCT_URL, USER_SAVE_ORDER_URL } from "../../constants";
import SuccessModal from "../../component/Modal/SuccessModal";

export default function OrderPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState({});

  const [quantity, setQuantity] = useState({});
  const [operationChecks, setOperationChecks] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState({
    totalPrice: 0,
    totalQuantity: 0,
  });

  const [shippingDetails, setShippingDetails] = useState({
    shippingAddress: "",
    pincode: "",
  });

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const createCheckBoxState = (data) => {
    let checkbox = {};
    data.forEach((item) => {
      checkbox[item.itemName] = {};
      let innerObj = {};
      item.washDetails.forEach((wash) => {
        innerObj = { ...innerObj, [wash.operationName]: false };
      });
      checkbox[item.itemName] = { ...checkbox[item.itemName], ...innerObj };
    });
    setOperationChecks(checkbox);
  };

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (!auth) navigate("/");
  }, []);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_BASE_URL}${FETCH_ALL_PRODUCT_URL}`;
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.data);
        setError({ ...error, fetch_product: "" });
        createCheckBoxState(response.data.data);
      })
      .catch((errorResponse) =>
        setError({ ...error, fetch_product: errorResponse })
      );
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    orderedItems.forEach((item) => {
      totalPrice += item.totalProductPrice;
      totalQuantity += item.quantity;
    });
    setOrderTotal({
      totalPrice,
      totalQuantity,
    });
  }, [JSON.stringify(orderedItems)]);

  function handleQuantityChange(e, selectedProduct) {
    const qty = Number(e.target.value);
    if (qty > 0) {
      setQuantity({
        ...quantity,
        [selectedProduct]: qty,
      });
      const orderItems = orderedItems.map((item) => {
        if (item.productType === selectedProduct) {
          return {
            ...item,
            quantity: qty,
            totalProductPrice:
              qty * item.productCost.reduce((a, b) => a + b, 0),
          };
        } else return item;
      });
      setOrderedItems([...orderItems]);
    }
  }

  function handleCheckBoxChange(
    event,
    selectedProduct,
    selectedOperation,
    operationPrice
  ) {
    const { checked } = event.target;
    let localOpChecks = { ...operationChecks };
    localOpChecks[selectedProduct][selectedOperation] = checked;
    setOperationChecks(localOpChecks);

    const found = orderedItems.find(
      (item) => item.productType === selectedProduct
    );
    if (checked && !found) {
      // not present, insert a new item
      setOrderedItems([
        ...orderedItems,
        {
          productType: selectedProduct,
          typeOfWash: [selectedOperation],
          quantity: Number(quantity[selectedProduct]),
          productCost: [Number(operationPrice)],
          totalProductPrice: quantity[selectedProduct] * operationPrice,
        },
      ]);
    } else if (checked && found) {
      // not present, insert a new item
      let orderItems = orderedItems.filter(
        (item) => item.productType !== selectedProduct
      );
      setOrderedItems([
        ...orderItems,
        {
          productType: selectedProduct,
          typeOfWash: [...found.typeOfWash, selectedOperation],
          quantity: Number(quantity[selectedProduct]),
          productCost: [...found.productCost, Number(operationPrice)],
          totalProductPrice:
            quantity[selectedProduct] *
            (found.productCost.reduce((a, b) => a + b, 0) +
              Number(operationPrice)),
        },
      ]);
    } else if (!checked) {
      let orderItems = orderedItems.filter(
        (item) => item.productType !== selectedProduct
      );
      setOrderedItems([
        ...orderItems,
        {
          productType: selectedProduct,
          typeOfWash: found.typeOfWash.filter(
            (wash) => wash !== selectedOperation
          ),
          quantity: Number(quantity[selectedProduct]),
          productCost: found.productCost.filter(
            (price) => price !== operationPrice
          ),
          totalProductPrice:
            quantity[selectedProduct] *
            (found.productCost.reduce((a, b) => a + b, 0) -
              Number(operationPrice)),
        },
      ]);
    }
  }

  function refreshItem(selectedItem) {
    if (quantity[selectedItem]) {
      let localQty = { ...quantity };
      delete localQty[selectedItem];
      setQuantity(localQty);

      let localOrderedItems = orderedItems.filter(
        (orderItems) => orderItems.productType !== selectedItem
      );

      setOrderedItems(localOrderedItems);
    }
    let operationChecksLocal = { ...operationChecks };
    for (let item in operationChecksLocal[selectedItem]) {
      operationChecksLocal[selectedItem][item] = false;
    }
    setOperationChecks(operationChecksLocal);
  }

  const handleShippingDetails = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: name === "pincode" ? Number(value) : value,
    });
  };

  const handlePlaceOrder = () => {
    if (
      orderedItems.length &&
      shippingDetails.shippingAddress &&
      shippingDetails.pincode
    ) {
      const auth = sessionStorage.getItem("auth");

      const { id } = JSON.parse(auth);

      const finalPayload = {
        userId: id,
        totalOrderPrice: orderTotal.totalPrice,
        totalItem: orderTotal.totalQuantity,
        orderedItems,
        shippingAddress: shippingDetails.shippingAddress,
        pincode: shippingDetails.pincode,
      };

      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}${USER_SAVE_ORDER_URL}`,
          finalPayload
        )
        .then(() => {
          setError({
            ...error,
            saveOrder: "",
          });
          setConfirmationModalOpen(false);
          setSuccessModalOpen(true);
        })
        .catch((error) => {
          setError({
            ...error,
            saveOrder: "Failed while saving order!!",
          });
          console.error(error);
        });
    }
  };

  const reset = () => {
    createCheckBoxState(products);
    setOrderTotal({
      totalPrice: 0,
      totalQuantity: 0,
    });
    setOrderedItems([]);
    setQuantity({});
  };

  return (
    <>
      <Navbar />

      <Container
        //  sx={{ py: 8 }}
        maxWidth="lg"
      >
        <Grid item xs={12} sm={12} md={12}>
          <p className="main-header">Create Order</p>
        </Grid>
        {/* End hero unit */}
        <Grid
          container
          //  spacing={4}
        >
          {products.length ? (
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
                  orderedItems={orderedItems}
                  refreshItem={refreshItem}
                  operationChecks={operationChecks}
                />
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={12} className="order-footer">
          <Grid container>
            <Grid item xs={12} sm={12} md={8}>
              <p className="sub-header">Quantity: {orderTotal.totalQuantity}</p>
            </Grid>
            <Grid item xs={12} sm={12} md={1.5}></Grid>
            <Grid item xs={12} sm={12} md={2}>
              <p className="sub-header">Total: ₹{orderTotal.totalPrice}</p>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} className="order-footer-btn mt-10">
          <Grid container>
            <Grid item xs={12} sm={12} md={9}></Grid>
            <Grid item xs={12} sm={12} md={3}>
              <div className="d-flex center">
                <Button
                  variant="outlined"
                  size="md"
                  onClick={reset}
                  className="mr-4"
                >
                  Clear
                </Button>
                <Button
                  size="md"
                  onClick={() => setConfirmationModalOpen(true)}
                  disabled={orderTotal.totalPrice === 0}
                >
                  Place order
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <OrderConfirmationModal
        confirmationModalOpen={confirmationModalOpen}
        setConfirmationModalOpen={setConfirmationModalOpen}
        orderedItems={orderedItems}
        orderTotal={orderTotal}
        shippingDetails={shippingDetails}
        handleShippingDetails={handleShippingDetails}
        handlePlaceOrder={handlePlaceOrder}
      />
      <SuccessModal
        successModalOpen={successModalOpen}
        setSuccessModalOpen={setSuccessModalOpen}
        reset={reset}
      />
    </>
  );
}