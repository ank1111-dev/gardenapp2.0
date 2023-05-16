import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const Home = () => {
  
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "20px ",
          color: "#fff",
        }}
      ></div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #9f9428 0%, #83ac7b 100%)",
          fontFamily: "Helvetica, Arial, sans-serif",
          [theme.breakpoints.down("md")]: {
            padding: "20px",
          },
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            textAlign: "center",
            bgcolor: "#fff",
            pb: 6,
            mt: 4,
            mb: 5,
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
            borderRadius: "30px",
            border: "none",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 4,
              mt: 4,
              color: "#a3993d",
              fontWeight: "bold",
              textShadow: "1px 1px 2px #000",
              filter: "hue-rotate(90deg)",
            }}
          >
            Welcome!!
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, color: "#494617", lineHeight: "1.5", px: 4 }}
          >
            Our motto is to help you find the best plants to grow in your garden
            based on your location and the weather. With our expert suggestions
            and personalized recommendations, you'll have a thriving garden in
            no time!
          </Typography>
          <Link to="/suggestions" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#78c677",
                borderRadius: "40px",
                border: "none",
                margin: "10px",
                color: "#fff",
                "&:hover": { backgroundColor: "#2e885e" },
              }}
            >
              Get Started
            </Button>
          </Link>
          <img
            src="../image/garden.jpg"
            alt="Garden"
            style={{
              maxWidth: "100%",
              marginTop: "10px",
              borderRadius: "40px",
              border: "none"                           
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;


