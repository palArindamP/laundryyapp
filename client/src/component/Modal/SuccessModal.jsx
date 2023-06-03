import * as React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import "./OrderConfirmationModal.css";

export default function SuccessModal({
  successModalOpen,
  setSuccessModalOpen,
  reset,
}) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          reset();
          navigate("/view-order");
        }}
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
            Success!!
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Your order is placed successfully.
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}