import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Box, IconButton, Link, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OpenInNew } from "@mui/icons-material";

interface SnackbarProps {
  open: boolean;
  message: string;
  txnHash?: string;
  onClose: () => void;
  severity?: AlertProps["severity"];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({
  open,
  message,
  txnHash,
  onClose,
  severity = "info",
}: SnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={9000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      action={
        <IconButton size="small" color="inherit" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
        <br />
        {txnHash && (
          <Box sx={{}}>
            <Link
              href={`https://www.seiscan.app/pacific-1/txs/${txnHash}`}
              target="_blank"
              sx={{ color: "darkgray", display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ m: 0, fontSize: "small", fontWeight: 500 }}>
                View on SeiScan
              </Typography>
              <OpenInNew fontSize="small" />
            </Link>
          </Box>
        )}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
