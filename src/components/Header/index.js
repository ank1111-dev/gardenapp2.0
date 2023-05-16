import { NavLink } from "react-router-dom";
import { Box, List, ListItem } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #9f9428 0%, #83ac7b 100%)",
        flexDirection: "row",
        fontFamily: "Helvetica, Arial, sans-serif",
        ml: "auto",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 30px",
          
        },
      }}
    >
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          alignItems: "center",
         
        }}
      >
        <img
          src="../image/logo.png"
          alt="Aussie Garden Wizard Logo"
          style={{ height: "80px", margin: "0 10px 0 10px" }}
        />
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "50px",
            fontFamily: "Helvetica, Arial, sans-serif",
            textShadow: "1px 1px 2px #000",
            marginRight: "10px",
            color: "white",
          }}
        >
          <span style={{ color: "#f5b000" }}>Aussie Garden</span> Wizard
        </h1>
      </Box>
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            justifyContent: "center",
          },
        }}
      >
        <nav>
          <List sx={{ display: "flex", justifyContent: "center" }}>
            <ListItem
              component={NavLink}
              to="/"
              exact="true"
              activeclassname="active"
              sx={{
                "&:hover": { color: "#f5b000" },
                position: "relative",
                color: "#fff",
                marginRight: "2px",
                fontSize: "18px",
                textDecoration: "none",
                "&.active": {
                  color: "#f5b000",
                  borderLeft: "2px solid #f5b000",
                },
                [theme.breakpoints.down("md")]: {
                  marginLeft: "10px",
                  marginBottom: "10px",
                },
              }}
            >
              Home
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 4,
                  height: "100%",
                  borderLeft: "2px dotted #fff",
                }}
              ></span>
            </ListItem>
            <ListItem
              component={NavLink}
              to="/suggestions"
              exact="true"
              activeclassname="active"
              sx={{
                "&:hover": { color: "#f5b000" },
                position: "relative",
                color: "#fff",
                marginRight: "30px",
                fontSize: "18px",
                textDecoration: "none",
                "&.active": {
                  color: "#f5b000",
                  borderLeft: "2px solid #f5b000",
                },
                [theme.breakpoints.down("md")]: {
                  marginRight: "10px",
                  marginBottom: "10px",
                },
              }}
            >
              Gardening Suggestions
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 4,
                  height: "100%",
                  borderLeft: "2px dotted #fff",
                }}
              ></span>
            </ListItem>
            <ListItem
              component={NavLink}
              to="/gardening-wizard"
              exact="true"
              activeclassname="active"
              sx={{
                "&:hover": { color: "#f5b000" },
                position: "relative",
                color: "#fff",
                marginRight: "30px",
                fontSize: "18px",
                textDecoration: "none",
                "&.active": {
                  color: "#f5b000",
                  borderLeft: "2px solid #f5b000",
                },
                [theme.breakpoints.down("sm")]: {
                  marginRight: 0,
                  marginBottom: "10px",
                },
              }}
            >
              Gardening Wizard
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 1,
                  height: "100%",
                  borderLeft: "2px dotted #fff",
                }}
              ></span>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Header;
