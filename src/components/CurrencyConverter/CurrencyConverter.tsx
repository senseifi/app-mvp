import React, { useState, useEffect } from "react";
import useSWR from "swr";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useTheme,
  Theme,
  Box,
} from "@mui/material";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.rates;
};

const CurrencyConverter = ({ value }: { value: number }) => {
  const theme: Theme = useTheme();

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const currencies = [
    "AUD",
    "USD",
    "EUR",
    "GBP",
    "KRW",
    "INR",
    "JPY",
    "VND",
    "TRY",
    "XOF",
  ]; // Add more currencies as needed
  const { data: rates, error } = useSWR(
    "https://api.exchangerate-api.com/v4/latest/USD",
    fetcher
  );

  useEffect(() => {
    if (rates && selectedCurrency) {
      const convertedValue = value * rates[selectedCurrency];
      setConvertedValue(convertedValue);
    }
  }, [rates, selectedCurrency]);

  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCurrency(event.target.value);
  };

  if (error) {
    console.error("Error fetching currency rates:", error);
    return <Typography variant="subtitle1">Error fetching data</Typography>;
  }

  if (!rates) {
    return <Typography variant="subtitle1">Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        my: 1,
      }}
    >
      <FormControl
        sx={
          {
            //   "& fieldset": {
            //     border: `0.5px solid ${theme.palette.secondary.main} !important`,
            //   },
            //   "& label": {
            //     color: `${theme.palette.tertiary.main} !important`,
            //   },
          }
        }
      >
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          label="Currency"
          value={selectedCurrency}
          onChange={handleChange}
          sx={{
            borderRadius: 2,
            borderColor: "secondary",
          }}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>{" "}
      <Typography sx={{ fontSize: 20 }}>{convertedValue || "-"}</Typography>
    </Box>
  );
};

export default CurrencyConverter;
