import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";

import Grid from "@mui/material/Grid";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Container from "@mui/material/Container";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";

import "./OrderConfirmationModal.css";

export default function OrderConfirmationModal({
  confirmationModalOpen,
  setConfirmationModalOpen,
  orderedItems,
  orderTotal,
  shippingDetails,
  handleShippingDetails,
  handlePlaceOrder,
}) {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,

            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Confirm order
          </Typography>
          <Sheet className="modal-inner">
            <Container maxWidth="lg" sx={{ p: 2 }}>
              <Grid container spacing={1}>
                {orderedItems.map((item, index) => {
                  return (
                    <React.Fragment key={item.productType}>
                      <Grid item xs={12} sm={12} md={4} className="text-light">
                        Product type:
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={8}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {item.productType}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} className="text-light">
                        Wash types:
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={8}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <ul className="wash-type-list">
                          {item.typeOfWash.map((type) => (
                            <li key={type}>{type}</li>
                          ))}
                        </ul>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} className="text-light">
                        Product quantity:
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={8}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {item.quantity}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} className="text-light">
                        Amount:
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={8}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {item.totalProductPrice}
                      </Grid>
                      {orderedItems.length - 1 !== index && (
                        <Grid item xs={12} sm={12} md={12}>
                          <hr />
                        </Grid>
                      )}
                    </React.Fragment>
                  );
                })}
                <Grid item xs={12} sm={12} md={4} className="text-light">
                  <Typography component="h5" mb={1}>
                    Total:
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Typography component="h5" mb={1}>
                    ₹{orderTotal.totalPrice}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl>
                    <FormLabel>Shipping address* </FormLabel>
                    <Textarea
                      minRows={2}
                      maxRows={4}
                      name={"shippingAddress"}
                      value={shippingDetails.shippingAddress}
                      onChange={handleShippingDetails}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl>
                    <FormLabel>Pincode* </FormLabel>
                    <Input
                      className="order-quantity-input"
                      size="sm"
                      type="number"
                      name={"pincode"}
                      value={shippingDetails.pincode}
                      onChange={handleShippingDetails}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Container>
          </Sheet>
          <Sheet sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => setConfirmationModalOpen(false)}
              sx={{ mt: 3, ml: 1 }}
            >
              Cancel
            </Button>

            <Button onClick={handlePlaceOrder} sx={{ mt: 3, ml: 1 }}>
              Confirm
            </Button>
          </Sheet>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}