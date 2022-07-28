import { Box } from "@mui/material";
import { FoodMenu } from "../components/Home/Categories/FoodMenu";
import { HeroComponent } from "../components/Home/Banner/HeroComponent";
import { Services } from "../components/Home/services/Services";
import SmokingHero from "../components/Home/SmokingHero";

export const HomePage = () => {
  return (
    <Box>
      <HeroComponent />
      <Services />
      <FoodMenu />
      <SmokingHero />
    </Box>
  );
};
