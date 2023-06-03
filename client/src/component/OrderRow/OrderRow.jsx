import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import { Query } from 'mongoose';
import Grid from "@mui/material/Grid";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Refresh } from "@mui/icons-material";

const OrderRow = ({
  singleProduct,
  handleCheckBoxChange,
  handleQuantityChange,
  quantity,
  orderedItems,
  refreshItem,
  operationChecks,
}) => {
  const { itemName, washDetails } = singleProduct;

  const calculatePriceForEachProduct = () => {
    const found = orderedItems.find((item) => item.productType === itemName);
    return found ? found.totalProductPrice : 0;
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container className="order-product-name">
          <Grid item xs={10} sm={10} md={10} className="font-bold">
            {itemName}
          </Grid>
          <Grid item xs={10} sm={10} md={2} className="secondary-header">
            Price
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={2} className="order-selection-row">
        <span> Quantity:</span>
        <Input
          className="order-quantity-input"
          size="sm"
          type="number"
          onChange={(e) => handleQuantityChange(e, itemName)}
          value={quantity[itemName] || 0}
        />
      </Grid>

      {washDetails &&
        washDetails.map((item) => {
          return (
            <Grid item xs={12} sm={12} md={2} key={item._id} className="">
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={!quantity[itemName]}
                    onChange={(e) =>
                      handleCheckBoxChange(
                        e,
                        itemName,
                        item.operationName,
                        item.washprice
                      )
                    }
                    value={operationChecks[itemName][item.operationName]}
                    checked={operationChecks[itemName][item.operationName]}
                  />
                }
                label={`${item.operationName}(₹${item.washprice})`}
              />
            </Grid>
          );
        })}
      <Grid item xs={12} sm={12} md={1} className="mt-10">
        ₹{calculatePriceForEachProduct()}
      </Grid>
      <Grid item xs={12} sm={12} md={1} className="mt-10">
        <Button
          aria-label="Refresh"
          variant="outlined"
          color="neutral"
          onClick={() => {
            refreshItem(itemName);
          }}
        >
          <Refresh />
        </Button>
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
