import PlantSuggestion from "../PlantSuggestions";

const ClimateZone = ({ temperature, precipitation }) => {
  let climateZone = null;
  if (temperature >= 18 && precipitation >= 60 && precipitation < (100 - temperature / 5)) {
    climateZone  ="Cfa";
  } else if (temperature >= 10 && temperature < 18 && precipitation >= 60 && precipitation < (100 - temperature / 5)) {
    climateZone  ="Cwa";
  } else if (temperature >= 18 && precipitation < 60 && (temperature / 5) <= (precipitation / 10)) {
    climateZone  = "Cfb";
  } else if (temperature < 0) {
    climateZone  = "EF";
  } else if (temperature >= 0 && temperature < 10 && precipitation >= 60 && precipitation >= (100 - temperature / 5)) {
    climateZone  = "Dfb";
  } else if (temperature >= 0 && temperature < 10 && precipitation >= 60 && precipitation < (100 - temperature / 5)) {
    climateZone  = "Dwb";
  } else if (temperature >= 10 && temperature < 18 && precipitation < 60 && (temperature / 5) <= (precipitation / 10)) {
    climateZone  = "Cfc";
  } else if (temperature >= 10 && temperature < 18 && precipitation < 60 && (temperature / 5) > (precipitation / 10)) {
    climateZone  = "Csc";
  } else if (temperature >= 18 && precipitation >= 60 && precipitation >= (100 - temperature / 5)) {
    climateZone  = "BSh";
  } else if (temperature >= 18 && precipitation < 60 && (temperature / 5) > (precipitation / 10)) {
    climateZone  = "BWh";
  } else if (temperature >= 18 && precipitation < 60 && (temperature / 5) <= (precipitation / 10)) {
    climateZone  = "BWk";
  } else if (temperature >= 10 && temperature < 18 && precipitation < 60 && (temperature / 5) > (precipitation / 10)) {
    climateZone  = "Cwa";
  } else if (temperature >= 10 && temperature < 18 && precipitation < 60 && (temperature / 5) <= (precipitation / 10)) {
    climateZone  = "Csa";
  } else {
    climateZone  = "unkown"
  }  
  return climateZone ? <PlantSuggestion climateZone={climateZone} /> : null;
}

export default ClimateZone;
