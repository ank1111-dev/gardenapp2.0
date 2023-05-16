import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const IconButtonStyle = {
  color: "#b6986d",
  backgroundColor: "#fff",
  borderRadius: "50px",
  fontSize: "1.2rem",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease-in-out",
  outline: "none",
  border: "none",
};

const RenderCard = ({ title, linkTo, icon }) => {
  return (
    <Card
      sx={{
        minWidth: 180,
        maxWidth: 240,
        minHeight: 120,
        maxHeight: 160,
        margin: "0 30px",
        backgroundColor: "#ffff",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
        borderRadius: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
          transform: "translateX(7px)",
        },
        [theme.breakpoints.down("md")]: {
          margin: "0 80px",
        },
      }}
    >
      <CardHeader sx={{ color: "#b6986d" }} title={title} />
      <CardContent sx={{ p: 1 }}>
        <Link to={linkTo}>{icon}</Link>
      </CardContent>
    </Card>
  );
};

const GardeningWizard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
        }}
      >
        <IconButton
          style={IconButtonStyle}
          onClick={() => navigate("/suggestions")}
        >
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          background: "linear-gradient(135deg, #9f9428 0%, #83ac7b 100%)",
         
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} sm={6} md={4}>
            <RenderCard
              title="Plant Finder"
              linkTo="/gardening-wizard/plant-finder"
              icon={
                <SearchIcon style={{ fontSize: "60px", color: "#9C27B0" }} />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RenderCard
              title="Articles"
              linkTo="/gardening-wizard/articles"
              icon={
                <DescriptionIcon
                  style={{ fontSize: "60px", color: "#9C27B0" }}
                />
              }
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default GardeningWizard;

