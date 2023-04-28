import { Link, useNavigate } from "react-router-dom";
import {  Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";

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
          style={{
            color: "#b6986d",
            backgroundColor: "#fff",
            borderRadius: "50px",
            fontSize: "1.2rem",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease-in-out",
            outline: "none",
            border: "none",
          }}
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
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                minWidth: 180,
                maxWidth: 240,
                minHeight: 120,
                maxHeight: 160,
                margin: "0 30px",
                backgroundColor: "#babf55",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
                borderRadius: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: "#c4c791",
                },
              }}
            >
              <CardHeader sx={{ color: "#ffff" }} title="Plant Finder" />
              <CardContent sx={{ p: 1 }}>
                <Link to="/gardening-wizard/plant-finder">
                  <SearchIcon style={{ fontSize: "60px", color: "#9C27B0" }} />
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                minWidth: 180,
                maxWidth: 240,
                minHeight: 120,
                maxHeight: 160,
                backgroundColor: "#babf55",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
                borderRadius: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: "#c4c791",
                },
              }}
            >
              <CardHeader style={{ color: "#ffff" }} title="Articles" />
              <CardContent sx={{ p: 1 }}>
                <Link to="/gardening-wizard/articles">
                  <DescriptionIcon
                    style={{ fontSize: "60px", color: "#9C27B0" }}
                  />
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default GardeningWizard;


