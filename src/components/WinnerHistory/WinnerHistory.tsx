import { intlFormatStyle } from "@/constants/modals";
import { Draw } from "@/types/customTypes";
import { toAU } from "@/utils";
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

const WinnerHistory = ({ drawList }: { drawList: Draw[] }) => {
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
          {
            /* Longer format for standard screens */
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Round</StyledTableCell>
                  <StyledTableCell>Prize</StyledTableCell>
                  <StyledTableCell>Winner</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  //winners.slice(0, listLength).map((winner) =>
                  drawList.map((draw) =>
                    !draw.active ? (
                      <StyledTableRow key={draw.id}>
                        <TableCell>{draw.id}</TableCell>
                        <TableCell>
                          {Intl.NumberFormat("en-US", intlFormatStyle).format(
                            toAU(draw.prize)
                          )}{" "}
                          Apt
                        </TableCell>
                        {/* first 4 and last 4 characters of account address */}
                        {!isSmallScreen ? (
                          <TableCell>
                            {draw.winner?.substring(0, 10)}.....
                            {draw.winner?.substring(draw.winner.length - 10)}
                          </TableCell>
                        ) : (
                          <TableCell>
                            {draw.winner?.substring(0, 5)}....
                          </TableCell>
                        )}
                      </StyledTableRow>
                    ) : null
                  )
                }
              </TableBody>
            </Table>
          }
        </TableContainer>
      </Box>
    </>
  );
};

// type Winner = {
//   transaction_id: String;
//   timestamp: String;
//   account: String;
//   game_id: String;
// };

// const winners: Winner[] = [
//   {
//     transaction_id:
//       "633802AE295E5DB38ECC516744BFB0858585D543850FC31C95DA03E7F7CFC1E3",
//     timestamp: "1684926120",
//     account: "sei1tzwc7x0yj4ygchfedz3x9xnjnts47p4rwhvxn6",
//     game_id: "0",
//   },
// ];

export default WinnerHistory;
