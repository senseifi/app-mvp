import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, List, ListItem } from "@mui/material";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  maxWidth: "1000px",
  borderRadius: "10px",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "::selection, *::selection": {
    color: "#071428",
    backgroundColor: "#FFDB2C",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  margin: "0.1rem 0",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),

    "& p": {
      fontWeight: "500",
      fontSize: "1rem",
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  //   borderTop: "1px solid rgba(0, 0, 0, .125)",
  "& a.MuiTypography-root.MuiLink-root": {
    color:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.35)"
        : "rgba(0, 0, 0, .35)",
  },
}));

const FAQAccordion = () => {
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>What is SenSei Fi?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            SenSei Fi is a leading gamified decentralised finance (DeFi)
            platform that offers secure and predictable savings options with
            bonus token and NFT rewards. It combines the excitement of
            gamification with the stability of DeFi, providing users with a
            unique and rewarding financial experience.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>How does SenSei Fi work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Users can stake native tokens and stable coins to receive an annual
            percentage yield (APY). These savings are distributed across leading
            automated market makers (AMMs) and liquidity pool (LP) aggregators
            through cross-chain bridges. Interest earned is distributed out to
            stakers, with a disproportionate amount awarded to one user weekly.
            Additionally, users have the opportunity to win exciting NFT drops
            and participate in weekly token and NFT draws.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>
            What sets SenSei Fi apart from other DeFi platforms?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>SenSei Fi offers several key differentiators:</Typography>
          <List
            sx={{
              listStyleType: "disc",
              pl: 2,
              "& .MuiListItem-root": {
                display: "list-item",
              },
            }}
          >
            <ListItem>
              Gamified Experience: Users can earn bonus tokens and participate
              in NFT rewards, adding a fun and engaging element to their
              financial activities.
            </ListItem>
            <ListItem>
              Secure Self-Managed Accounts: SenSei Fi ensures complete ownership
              and control over funds through secure self-managed accounts,
              enhancing user security.
            </ListItem>
            <ListItem>
              Sustainable Yields: The platform focuses on healthy and
              sustainable yields by distributing savings across leading AMMs and
              LP aggregators.
            </ListItem>
            <ListItem>
              Transparency: SenSei Fi emphasises clear and understandable
              offerings, fostering trust among users.
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Is SenSei Fi safe and secure?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, SenSei Fi places a strong emphasis on security. It offers
            secure self-managed accounts, implements advanced security measures,
            and underwent audits to ensure the solidity of its smart contracts
            and protocols. SenSei Fi has been audited, please click below to
            view audits on verichains:&nbsp;
          </Typography>
          <br />

          <Link href="https://github.com/verichains/public-audit-reports/blob/main/Verichains%20Public%20Audit%20Report%20-%20SenseiFi%20Staking%20Pool%20-%20v1.0.pdf">
            • SenSei Fi Staking Pools - Certified on May 31, 2023
          </Link>
          <br />
          <Link href="https://github.com/verichains/public-audit-reports/blob/main/Verichains%20Public%20Audit%20Report%20-%20SenseiFi%20Staking%20-%20v1.0.pdf">
            • SenSei Fi Staking - Certified on May 25, 2023
          </Link>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>
            How can I get involved in the SenSei Fi community?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Joining the SenSei Fi community is easy. You can participate in
            discussions, ask questions, and connect with other users on social
            platforms listed below:&nbsp;
          </Typography>

          <Link href="https://twitter.com/SenSei_DeFi">• X (Twitter)</Link>
          <br />
          <Link href="https://discord.com/invite/6BveRGNP9H">• Discord</Link>
          <br />
          <Link href="https://zealy.io/c/senseifi/questboard">• Zealy</Link>
          <br />
          <br />
          <Typography>
            Engaging in the community allows you to stay informed, share
            insights, and contribute to the growth of SenSei Fi.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>How do I use other wallets?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can connect your compatible wallet by visiting the SenSei Fi
            platform and following the wallet connection instructions. Whether
            you're using a mobile device or a desktop computer, the process is
            designed to be user-friendly and secure.
            <br />
            <br />
            SenSei Fi is integrated with below wallets:
            <br />
            • Keplr
            <br />
            • Leap
            <br />
            • Leap Mobile
            <br />
            • Compass
            <br />• Fin Wallet
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>Where do I get Sei token?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can get Sei Tokens from most major exchanges including Binance,
            Gate.io and KuCoin.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography>How do I see my tickets?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can view your ticket by clicking on the top right arrow of the
            draw you have entered.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography>
            Why do the tickets not match the amount staked?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The number of tickets a user receives is determined by two factors:
            <br />
            • Total tokens staked
            <br />
            • Time of staking
            <br />
            <br />
            For example, staking 100 tokens on day 1 may generate an example of
            100,000 tickets. However, staking 100 tokens on the last day may
            only generate an example of 100 tickets.
            <br />
            <br />
            This mechanism prevents users who stake large amounts of tokens on
            the last day from having an unfair advantage in winning the game.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10")}
      >
        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
          <Typography>How do I withdraw?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Make sure that your wallet is connected so you will be able to see
            your entry into the No Loss Prize Games.
            <br />
            <br />
            Click &lsquo;withdraw&rsquo; in the dApp and sign the transaction
            within your connected wallet. Your tokens will be available to be
            claimed after a maximum of 72 hours. After which, you can click
            &lsquo;Claim Withdraw&rsquo; and receive the tokens in your wallet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel11"}
        onChange={handleChange("panel11")}
      >
        <AccordionSummary aria-controls="panel11d-content" id="panel11d-header">
          <Typography>How do I contact support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Please open a ticket via the&nbsp;
            <Link href="https://discord.gg/b6h3paCYy4">
              SenSei Fi Discord community.
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
