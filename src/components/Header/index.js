import { NavLink } from "react-router-dom";
import { Box, List, ListItem } from "@mui/material";
import { Outlet } from "react-router-dom";

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
      }}
    >
      <Box
        sx={{
          flex: "1 1 auto",
          textAlign: "center",
          padding: "20px 0",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontWeight: "bold",
            fontSize: "50px",
            fontFamily: "Helvetica, Arial, sans-serif",
            textShadow: "1px 1px 2px #000",
            marginRight: "30px",
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
              }}
            >
              Gardening Suggestions
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
