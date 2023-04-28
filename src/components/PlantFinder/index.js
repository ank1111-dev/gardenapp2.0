import React, { useState, useEffect } from "react";
import {  Card, CardContent, Box, ButtonBase, Input, Typography, } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const PlantIdentification = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
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
        });   
      });
    }, [selectedFiles]);

  const handleTakePhoto = () => {
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
      })
      .catch((error) => {
        console.error("Error accessing camera", error);
        setError(error.message || "Error accessing camera");
      });
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ padding: "1rem", borderRadius: 2 }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 10px",
            marginTop: "1rem",
            margin: "10px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "10px",
              textAlign: "center",
              padding: "30px",
            }}
          >
            <h2 style={{ marginBottom: "50px", color: "#b6986d" }}>
              Identify plants. For free.
            </h2>
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
              color="secondary"
              sx={{ padding: 1, backgroundColor: "#4CAF50", color: "#fff" }}
            >
              <CloudUploadIcon sx={{ mr: "0.5rem" }} />
              Upload Image
            </ButtonBase>
            <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
              or
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
              }}
            >
              <CameraAltIcon sx={{ marginRight: "0.5rem" }} />
              Take a photo
            </ButtonBase>
            {error && (
              <Typography variant="h6" sx={{ color: "#eb3911", mt: 4 }}>
                Error: <span sx={{ color: "#eb3911", mt: 1 }}>{error}</span>
              </Typography>
            )}
          </Box>

          {results && (
            <Card sx={{ marginTop: "2rem", backgroundColor: "#f8f8f8" }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#4CAF50" }}>
                  Results:
                </Typography>
                <table>
                  <tbody>
                    <tr>
                      <td>Plant Name:</td>
                      <td>{results.suggestions[0].plant_name}</td>
                    </tr>
                    <tr>
                      <td>Common Names:</td>
                      <td>
                        {results.suggestions[0].plant_details.common_names
                          ? results.suggestions[0].plant_details.common_names.join(
                              ", "
                            )
                          : "Not Available"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <>
                  <Typography variant="h6" sx={{ color: "#4CAF50", mt: 2 }}>
                    Plant Description:
                  </Typography>
                  <Typography variant="body1">
                    {
                      results.suggestions[0].plant_details.wiki_description
                        .value
                    }
                  </Typography>
                </>
                <>
                  <Typography variant="h6" sx={{ color: "#4CAF50", mt: 2 }}>
                    Image:
                  </Typography>
                  <img
                    style={{ textAlign: "center" }}
                    src={results.images[0].url}
                    alt="Plant"
                  />
                </>
                <>
                  <Typography variant="h6" sx={{ color: "#4CAF50", mt: 2 }}>
                    Similar Images:
                  </Typography>
                  {results.suggestions[0].similar_images.map((img) => (
                    <img
                      style={{ textAlign: "center" }}
                      key={img.id}
                      src={img.url}
                      alt="Similar Plant"
                    />
                  ))}
                </>
              </CardContent>
            </Card>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default PlantIdentification;
