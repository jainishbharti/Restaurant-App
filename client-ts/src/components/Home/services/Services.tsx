import { Box, Typography } from "@mui/material";
import ImageMediaCard from "./ImageMediaCard";

const services = [
  {
    buttons: ["Like", "Share"],
    title: "BOOK TABLE",
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000
    species, ranging across all continents except Antarctica`,
  },
  {
    buttons: ["Like", "Share"],
    title: "MODIFY RESERVATION",
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000
    species, ranging across all continents except Antarctica`,
  },
  {
    buttons: ["Like", "Share"],
    title: "DELETE RESERVATION",
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000
      species, ranging across all continents except Antarctica`,
  },
];

export const Services = () => {
  return (
    <div className="services-fragment">
      
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: "550",
            marginTop: "0",
            paddingTop: '1.5rem',
            color: "gray",
          }}
        >
          BOOKING ACTIONS
        </Typography>
        <div style={{width: '150px', color: 'red', height:'3px', background:'red', margin: 'auto', marginTop:'10px'}}></div>
      <Box
        className="service-flex"
        sx={{
          width: "70%",
          margin: "auto",
          height: "500px"
        }}
      >
        {services.map((service) => {
          return <ImageMediaCard service={service} />;
        })}
      </Box>
    </div>
  );
};
