import { Box, IconButton, Link, Typography } from "@mui/material";
import {  Facebook,   Twitter,   KeyboardArrowUp as KeyboardArrowUpIcon, } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const FooterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#c7c391",
  padding: "8px",
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 100,
}));

const FooterLink = styled(Link)(({ theme }) => ({
  margin: "0 10px",
  color: theme.palette.text.primary,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const Footer = () => {
  const handleReturnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FooterBox>
      <Box>
        <IconButton onClick={handleReturnToTop}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton>
          <Facebook />
        </IconButton>
        <IconButton>
          <Twitter />
        </IconButton>
        <FooterLink href="#">Contact Us</FooterLink>
      </Box>
      <Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{pr: "20px", color: "white"}}        
        >
          © {new Date().getFullYear()} Aussie Garden Wizard. All Rights
          Reserved.
        </Typography>
      </Box>
    </FooterBox>
  );
};

export default Footer;
