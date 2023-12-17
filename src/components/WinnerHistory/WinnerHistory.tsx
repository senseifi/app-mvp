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
                {winners.slice(0, winners.length).map((winner) => (
                  // drawList.map((draw) =>
                  //   !draw.active ? (
                  <StyledTableRow key={winner.game_id}>
                    <TableCell>{winner.game_id}</TableCell>
                    <TableCell>{winner.prize} SUI</TableCell>
                    {/* first 4 and last 4 characters of account address */}
                    {!isSmallScreen ? (
                      <TableCell>
                        {winner.account?.substring(0, 10)}.....
                        {winner.account?.substring(winner.account.length - 10)}
                      </TableCell>
                    ) : (
                      <TableCell>
                        {winner.account?.substring(0, 5)}....
                      </TableCell>
                    )}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          }
        </TableContainer>
      </Box>
    </>
  );
};

type Winner = {
  transaction_id: string;
  timestamp: string;
  account: string;
  game_id: string;
  prize: string;
};

const winners: Winner[] = [
  {
    transaction_id:
      "0x721f137605dc3860e35e79699535ff0800a0f1c812a0a6f6314985fa5fb4fd52",
    timestamp: "1684926120",
    account: "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
    game_id: "0",
    prize: "28.42",
  },
  {
    transaction_id:
      "0x721f137605dc3860e35e79699535ff0800a0f1c812a0a6f6314985fa5fb4fd52",
    timestamp: "1684926120",
    account: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    game_id: "1",
    prize: "20.3",
  },
  {
    transaction_id:
      "0x721f137605dc3860e35e79699535ff0800a0f1c812a0a6f6314985fa5fb4fd52",
    timestamp: "1684926120",
    account: "0x40b38765696e3d5d8d9d834d8aad4bb6e418e489",
    game_id: "2",
    prize: "31.88",
  },
  {
    transaction_id:
      "0x721f137605dc3860e35e79699535ff0800a0f1c812a0a6f6314985fa5fb4fd52",
    timestamp: "1684926120",
    account: "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503",
    game_id: "3",
    prize: "19.05",
  },
  {
    transaction_id:
      "0x721f137605dc3860e35e79699535ff0800a0f1c812a0a6f6314985fa5fb4fd52",
    timestamp: "1684926120",
    account: "0xe92d1a43df510f82c66382592a047d288f85226f",
    game_id: "4",
    prize: "24.92",
  },
];

export default WinnerHistory;
