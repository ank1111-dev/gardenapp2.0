import  { useState, useEffect } from "react";
import { Typography,  Divider,CardContent, CardActions, Button } from "@mui/material";
import { PlantData } from "../PlantData";
import "./index.css"


const PlantSuggestion = ({ climateZone }) => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentClimateZone, setCurrentClimateZone] = useState('');

  useEffect(() => {
    console.log(climateZone);
    if (!climateZone) return;  
    const zonePlantData = PlantData.find((plant) =>
      plant.climate_zones.some((zone) => zone.code === climateZone)
    );
  
    if (!zonePlantData) {
      setError(true);
      setCurrentClimateZone("");
      setPlants([]);
      return;
    }  
    setCurrentClimateZone(
      zonePlantData.climate_zones.find((zone) => zone.code === climateZone)?.name ?? ""
    );  
    const zonePlants = PlantData.filter((plant) =>
      plant.climate_zones.some((zone) => zone.code === climateZone)
    );
    if (zonePlants.length === 0) {
      setError(true);
      setPlants([]);
    } else {
      setError(false);
      setPlants(zonePlants);
    }
  }, [climateZone]);  

  return (
    <div className="PlantSuggestionContainer">
      <Typography variant="h4" align="center" gutterBottom>
        Plants for {currentClimateZone} Climate Zone
      </Typography>
      <Divider className="Divider" />
      {error ? (
        <Typography variant="h6" align="center">
          No plants available for this climate zone.
        </Typography>
      ) : selectedPlant ? (
        <div className="PlantCard">
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {selectedPlant.name}
            </Typography>
            <Typography variant="body1" className="PlantDescription">
              {selectedPlant.description}
            </Typography>
            <Typography variant="h6" className="PlantSubtitle">
              Ideal Growing Conditions:
            </Typography>
            <Typography variant="body1" className="PlantInfo">
              {selectedPlant.ideal_growing_conditions}
            </Typography>
            <Typography variant="h6" className="PlantSubtitle">
              Care:
            </Typography>
            <Typography variant="body1" className="PlantInfo">
              {selectedPlant.care}
            </Typography>
            <Typography variant="h6" className="PlantSubtitle">
              Pests and Diseases:
            </Typography>
            <Typography variant="body1" className="PlantInfo">
              {selectedPlant.pests_and_diseases}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => setSelectedPlant(null)}
              className="BackButton"
            >
              Back
            </Button>
          </CardActions>
        </div>
      ) : (
        <>
          <Typography variant="body1" className="PlantInfoItem">
            Click on a plant name to view more details
          </Typography>
          <div className="PlantList">
            {plants.map((plant) => (
              <div
                key={plant.name}
                onClick={() => setSelectedPlant(plant)}
                className="PlantListItem"
              >
              <Typography variant="h5" className="PlantListItemText">
                {plant.name}
              </Typography>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );  
}
                    
export default PlantSuggestion;