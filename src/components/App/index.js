import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Home from "../Home";
import Location from "../LocationSelection";
import WeatherDetails from "../WeatherDetails";
import GardeningWizard from "../GardeningWizard";
import PlantIdentification from "../PlantFinder";
import Articles from "../Articles";
import PageNotFound from "../PageNotFound";
import Footer from "../Footer";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/suggestions" element={<Location />} />
          <Route
            path="/weather-details/:location"
            element={<WeatherDetails />}
          />
          <Route path="/gardening-wizard" element={<GardeningWizard />} />
          <Route
            path="/gardening-wizard/plant-finder"
            element={<PlantIdentification />}
          />
          <Route path="/gardening-wizard/articles" element={<Articles />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
