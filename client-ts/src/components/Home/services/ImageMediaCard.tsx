import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

type ImageMediaCardProps = {
  service: {
    buttons: string[];
    title: string;
    description: string;
  };
};

export default function ImageMediaCard({ service }: ImageMediaCardProps) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: '40px', padding: '1rem', backgroundColor:"#FAFAFA" }} >
      <CardContent>
        <RestaurantMenuIcon fontSize="large" />
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          mt={2}
          color="darkslategray"
          sx={{ fontWeight: "550" }}
        >
          {service.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mt={6}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center'}}>
        <Button variant="outlined" size="small">Share</Button>
        <Button variant="outlined" size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
