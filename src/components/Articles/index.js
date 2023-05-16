import { gardeningArticles } from './gardening-articles';
import { Grid, Card, CardActionArea, CardMedia,  Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon  } from '@mui/icons-material';
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const Articles = () => {

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
          component={Link}
          to="/gardening-wizard"
        >
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #9f9428 0%, #83ac7b 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid black",
          [theme.breakpoints.up("sm")]: {
            height: "auto",
            
          },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{
            marginTop: "30px",
            marginBottom: "40px",
            color: "#fff",
            letterSpacing: "0.2em",
            lineHeight: "1em!important",
            textTransform: "uppercase",
          }}
        >
          Gardening Articles
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {gardeningArticles.map((article, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "calc(100% - 10px)",
                  margin: "30px",
                  borderRadius: "10px",
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
                  overflow: "hidden",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                    transform: "translateY(-5px)",
                  },
                }}
                component={Link}
                to={article.url}
                target="_blank"
              >
                <CardActionArea
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "0 20px 0px 20px",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={article.image}
                    alt={article.title}
                    sx={{
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "16px",
                    }}
                  />
                  <Typography variant="h6" align="center">
                    {article.title}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Articles;

