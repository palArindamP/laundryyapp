import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import { Query } from 'mongoose';
import { useState } from "react";
import Grid from "@mui/material/Grid";

const OrderRow = ({
  singleProduct,
  handleCheckBoxChange,
  handleQuantityChange,
  quantity,
}) => {
  return (
    <Grid
      container
      //  spacing={4}
    >
      <Grid item xs={3} sm={3} md={12}>
        {singleProduct.itemName}
      </Grid>
      <Grid item xs={3} sm={3} md={2}>
        <input
          type="number"
          onChange={handleQuantityChange}
          value={quantity}
          placeholder={`Enter quantity of ${singleProduct.itemName}`}
        />
      </Grid>

      {singleProduct.washDetails &&
        singleProduct.washDetails.map((item) => {
          return (
            <Grid item xs={3} sm={3} md={2} key={item._id}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckBoxChange}
                    value={`${singleProduct.itemName}:${item.operationName}:${item.washprice}`}
                  />
                }
                label={`${item.operationName}(₹${item.washprice})`}
              />
            </Grid>
          );
        })}
      <Grid item xs={3} sm={3} md={2}>
        Hola
      </Grid>
      {/* 
      <li>0</li>
      <li>
        <button className="btn-reset">Reset</button>
      </li> */}
    </Grid>
  );
};

export default OrderRow;
