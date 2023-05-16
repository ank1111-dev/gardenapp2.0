import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  ButtonBase,
  Input,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

const PlantIdentification = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    setIsLoading(true);
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setIsLoading(false);
   
  };

  useEffect(() => {
    if (selectedFiles.length === 0) return;
    const base64files = selectedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const res = event.target.result;
          resolve(res);
        };
        reader.readAsDataURL(file);
      });
    });

    setIsLoading(true);
    Promise.all(base64files).then((base64files) => {
      const data = {
        api_key: process.env.REACT_APP_PLANT_API_KEY,
        images: base64files,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: [
          "common_names",
          "url",
          "name_authority",
          "wiki_description",
          "taxonomy",
          "synonyms",
        ],
      };

      fetch("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 400) {
              throw new Error("Bad Request: Invalid data provided");
            } else if (response.status === 401) {
              throw new Error("Unauthorized: API key is invalid or missing");
            } else if (response.status === 429) {
              throw new Error("Too Many Requests: Rate limit exceeded");
            } else {
              throw new Error("Server Error: Unable to process request");
            }
          }
          return response.json();
        })
        .then((responseData) => {
          setResults(responseData);
          setError(null);
        })
        .catch((error) => {
          setResults(null);
          setError(error.message || "Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, [selectedFiles]);

  const handleTakePhoto = () => {
    setIsLoading(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
          setSelectedFiles([file]);

          video.srcObject.getTracks().forEach((track) => track.stop());
        }, "image/jpeg");
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Error accessing camera");
        setIsLoading(false);
      });
      
  };

  const handleRetry = () => {
    setError(null);
    setResults(null);
    setSelectedFiles([]);
  };

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
          onClick={() => navigate("/gardening-wizard")}
        >
          <ArrowBackIcon />
        </IconButton>
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
            marginRight: "20px",
          }}
          onClick={() => navigate("/gardening-wizard/articles")}
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
      <Box
        sx={{
          height: "100vh",
          background: "linear-gradient(135deg, #9f9428 0%, #83ac7b 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ padding: "1rem", borderRadius: 2 }}>
          <form
            style={{
              padding: "10px 10px",
              marginTop: "1rem",
              margin: "10px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                textAlign: "center",
                margin: "40px 0 20px 0",
                letterSpacing: "0.1em!important",
                lineHeight: "1em!important",
                textTransform: "uppercase",
              }}
            >
              Ready to discover your plant's identity?
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "5rem",
                }}
              >
                <label htmlFor="file-input" hidden>
                  Upload Image
                </label>
                <Input
                  id="file-input"
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={handleFileSelect}
                  sx={{ display: "none" }}
                />
                <ButtonBase
                  component="label"
                  htmlFor="file-input"
                  variant="contained"
                  sx={{
                    color: "#b6986d",
                    border: "2px solid #b6986d",
                    borderRadius: "20px",
                    padding: "10px 10px",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    textTransform: "none",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
                    backgroundColor: "#ffff",
                    marginRight: "3rem",
                    "&:hover": { backgroundColor: "#c7c04a", color: "#fff" },
                  }}
                >
                  <CloudUploadIcon sx={{ marginRight: "0.5rem" }} />
                  Upload Image
                </ButtonBase>
                <Typography
                  variant="subtitle1"
                  sx={{ marginBottom: "10px", color: "#fff" }}
                >
                  OR
                </Typography>
                <ButtonBase
                  variant="outlined"
                  onClick={handleTakePhoto}
                  sx={{
                    color: "#b6986d",
                    border: "2px solid #b6986d",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    textTransform: "none",
                    backgroundColor: "#ffff",
                    marginLeft: "3rem",
                    "&:hover": { backgroundColor: "#c7c04a", color: "#fff" },
                  }}
                >
                  <CameraAltIcon sx={{ marginRight: "0.5rem" }} />
                  Take a photo
                </ButtonBase>
              </Box>
              {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <CircularProgress />
                </Box>
              )}
              {error && (
                <Box
                  sx={{
                    mt: 15,
                    background: "#ffff",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "40%",
                    marginLeft: "17em",
                    padding: "20px 0 0 20px",
                    borderRadius: "10px",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#eb3911" }}>
                    Error:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#eb3911", mt: 1 }}
                  >
                    {error}
                  </Typography>
                  <Button
                    onClick={handleRetry}
                    sx={{
                      mt: 1,
                      mb: 2,
                      "&:hover": {
                        backgroundColor: "#c7c04a",
                        color: "#fff",
                        borderRadius: "15px",
                      },
                    }}
                  >
                    Retry
                  </Button>
                </Box>
              )}
            </Box>
            {results && (
              <Card
                sx={{
                  marginTop: "4rem",
                  backgroundColor: "#f8f8f8",
                  padding: "20px",
                  width: "50%",
                  height: "60vh",
                }}
              >
                <CardContent sx={{}}>
                  <Typography variant="h6" sx={{ color: "#4CAF50" }}>
                    Results:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      Plant Name: {results.suggestions[0].plant_name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      Common Names:{" "}
                      {results.suggestions[0].plant_details.common_names
                        ? results.suggestions[0].plant_details.common_names.join(
                            ", "
                          )
                        : "Not available"}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      Plant Description:{" "}
                      {results.suggestions[0].plant_details.wiki_description
                        .value
                        ? results.suggestions[0].plant_details.wiki_description
                            .value
                        : "Not available"}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1">Image:</Typography>
                      <img
                        src={
                          results.images[0].url
                            ? results.images[0].url
                            : "Not Available"
                        }
                        alt="Plant"
                        width={400}
                        height={200}
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1">
                        Similar Images:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        {results.suggestions[0].similar_images.map((img) => (
                          <img
                            key={img.id}
                            src={img.url}
                            alt="Similar Plant"
                            width={200}
                            height={200}
                            style={{ margin: "0.5rem", objectFit: "cover" }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
          </form>
        </Box>
      </Box>
    </>
  );
};

export default PlantIdentification;
