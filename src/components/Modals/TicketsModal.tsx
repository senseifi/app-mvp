import {
  Backdrop,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShineButton from "../ShineButton";

import { Close, Help } from "@mui/icons-material";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  m: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TicketsModal = ({
  open,
  setOpen,
  tmType,
  gameID,
}: {
  open: boolean;
  setOpen: Function;
  tmType: "enter" | "withdraw";
  gameID: number;
}) => {
  const handleClose = () => setOpen(false);
  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [selectedValue, setSelectedValue] = useState<number>(10);
  const [otherValue, setOtherValue] = useState<number | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(Number(event.target.value));
    //setHelperText(`${parseInt(selectedValue) * 10} Tickets`);
  };
  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(Number(event.target.value));
    //setHelperText(`${otherValue !== undefined && otherValue * 10} Tickets`);
  };

  const [helperText, setHelperText] = useState<String>();

  const helperTextMessage = () => {
    if (otherValue !== undefined) {
      setHelperText(`${otherValue !== undefined && otherValue * 10} Tickets`);
    } else {
      setHelperText(`${selectedValue * 10} Tickets`);
    }
  };

  useEffect(() => {
    helperTextMessage();
  }, [selectedValue, otherValue]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor:
                theme.palette.mode === "light" ? "#07142860" : "#07142840",
              backdropFilter: "blur(40px)",
            },
          },
        }}
      >
        <Slide direction="up" in={open}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: isSmallScreen ? "100%" : 400,
                bgcolor: theme.palette.primary.main,
                borderRadius: 2,
                border: "4px solid",
                borderColor: theme.palette.tertiary.main,
                boxShadow: "0px 0px 24px #FFF",
                p: 4,
                zIndex: 10000,
              }}
            >
              <IconButton
                color={"secondary"}
                onClick={handleClose}
                sx={{ display: "flex", ml: "auto" }}
              >
                <Close />
              </IconButton>
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
                sx={{ textTransform: "uppercase" }}
              >
                {tmType === "enter" ? "Enter Draw" : "Withdraw"}
              </Typography>
              {tmType === "enter" ? (
                <>
                  <ShineButton sx={{ fontSize: "20px", fontStyle: "italic" }}>
                    More deposits = better odds!
                  </ShineButton>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <FormLabel
                      id="controlled-radio-buttons-group"
                      color="secondary"
                      focused
                      sx={{ fontWeight: "bold" }}
                    >
                      Deposit Amount
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={selectedValue}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value={5}
                        control={<Radio color="tertiary" />}
                        label="5 Sei"
                      />
                      <FormControlLabel
                        value={10}
                        control={<Radio color="tertiary" />}
                        label="10 Sei"
                      />
                      <FormControlLabel
                        value={25}
                        control={<Radio color="tertiary" />}
                        label="25 Sei"
                      />

                      <FormControlLabel
                        value={0}
                        control={<Radio color="tertiary" />}
                        label="other (enter value)"
                      />
                    </RadioGroup>
                    {selectedValue === 0 && (
                      <TextField
                        type="number"
                        label="Sei Amount"
                        variant="outlined"
                        color="secondary"
                        margin="dense"
                        fullWidth
                        value={otherValue}
                        onChange={handleOtherChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    )}
                    {/* TODO: error messages based on invalid inputs */}
                    <Box display="flex" alignItems="center" my={2}>
                      <Typography mr={4}>{helperText}</Typography>
                      <Tooltip
                        disableFocusListener
                        title={
                          "The tickets you receive are proportional to the amount of tokens you deposit and the time remaining for the draw"
                        }
                      >
                        <Help sx={{ fontSize: "1rem", opacity: 0.5 }} />
                      </Tooltip>
                    </Box>
                    <Button
                      variant="yellowFill"
                      size="small"
                      fullWidth
                      // sx={{ fontSize: "0.875rem" }}
                    >
                      Enter Draw
                    </Button>
                  </FormControl>
                  <Box display="flex" mt={3} sx={{ justifyContent: "center" }}>
                    <FlipClockCountdown
                      to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
                      labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
                      labelStyle={{
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: theme.palette.secondary.main,
                      }}
                      digitBlockStyle={{
                        width: 20,
                        height: 30,
                        fontSize: 20,
                        color: theme.palette.primary.main,
                        background: theme.palette.secondary.main,
                      }}
                      dividerStyle={{
                        color: theme.palette.primary.main,
                        height: 1,
                      }}
                      separatorStyle={{
                        color: theme.palette.secondary.main,
                        size: "4px",
                      }}
                      duration={0.5}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Typography
                    my={3}
                    sx={{
                      color: theme.palette.secondary.main,
                    }}
                  >
                    You have <span style={{ fontWeight: "bold" }}>{1000}</span>{" "}
                    Sei deposited in this pool
                  </Typography>
                  <TextField
                    type="number"
                    label="Sei Amount"
                    variant="outlined"
                    color="secondary"
                    margin="dense"
                    fullWidth
                    value={otherValue}
                    onChange={handleOtherChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                  {/* TODO: error messages based on invalid inputs */}

                  <Typography color="error" my={2} fontSize="small">
                    Once you click withdraw, your tokens will be transferred to
                    your wallet in about 72Hrs
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    fullWidth
                  >
                    Withdraw
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    fullWidth
                    sx={{ my: 2 }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
};

export default TicketsModal;
