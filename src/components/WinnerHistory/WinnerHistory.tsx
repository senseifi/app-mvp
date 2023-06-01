import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Moment from "react-moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const WinnerHistory = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const theme: Theme = useTheme();

  return (
    <>
      <Box
        p={isSmallScreen ? "20px 10px" : 5}
        border="1px solid"
        borderColor={theme.palette.secondary.main}
        borderRadius={3}
      >
        <Typography variant="h2" mb={2} mx={isSmallScreen ? 2 : ""}>
          Winner History
        </Typography>
        <TableContainer>
          {!isSmallScreen ? (
            /* Longer format for standard screens */
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Transaction ID</StyledTableCell>
                  <StyledTableCell>Date/Time</StyledTableCell>
                  <StyledTableCell>Winner</StyledTableCell>
                  <StyledTableCell>Round</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  //winners.slice(0, listLength).map((winner) =>
                  winners.map((winner) => (
                    <StyledTableRow key={winners.indexOf(winner)}>
                      {/* first 4 and last 4 characters of TxID */}
                      <TableCell>
                        {winner.transaction_id.substring(0, 4)}...
                        {winner.transaction_id.substring(
                          winner.transaction_id.length - 4
                        )}
                      </TableCell>
                      <TableCell>
                        {<Moment unix date={winner.timestamp} />}
                      </TableCell>
                      {/* first 4 and last 4 characters of account address */}
                      <TableCell>
                        {winner.account.substring(0, 4)}...
                        {winner.account.substring(winner.account.length - 4)}
                      </TableCell>
                      <TableCell>{winner.game_id}</TableCell>
                    </StyledTableRow>
                  ))
                }
              </TableBody>
            </Table>
          ) : (
            /* Shorter format for smaller screens */

            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Tx ID</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Winner</StyledTableCell>
                  <StyledTableCell>Round</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {winners.map((winner) => (
                  <StyledTableRow key={winners.indexOf(winner)}>
                    {/* first 4 and last 4 characters of TxID */}
                    <TableCell>
                      {winner.transaction_id.substring(0, 4)}...
                    </TableCell>
                    <TableCell>
                      {
                        <Moment
                          unix
                          date={winner.timestamp}
                          format="DD MMM 'YY"
                        />
                      }
                    </TableCell>
                    {/* first 4 and last 4 characters of account address */}
                    <TableCell>{winner.account.substring(0, 4)}...</TableCell>
                    <TableCell>{winner.game_id}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
    </>
  );
};

type Winner = {
  transaction_id: String;
  timestamp: String;
  account: String;
  game_id: String;
};

const winners: Winner[] = [
  {
    transaction_id:
      "633802AE295E5DB38ECC516744BFB0858585D543850FC31C95DA03E7F7CFC1E3",
    timestamp: "1684926120",
    account: "sei1tzwc7x0yj4ygchfedz3x9xnjnts47p4rwhvxn6",
    game_id: "0",
  },
];

export default WinnerHistory;
