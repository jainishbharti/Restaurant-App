import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

type ImageMediaCardProps = {
  service: {
    button: { title: string; href: string };
    title: string;
    description: string;
  };
};

export default function ImageMediaCard({ service }: ImageMediaCardProps) {
  return (
    <Card data-testid="service-card"
      sx={{
        maxWidth: 345,
        borderRadius: "40px",
        padding: "1rem",
        backgroundColor: "#FAFAFA",
      }}
    >
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
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="outlined" size="small">
          {/* <Link href={service.button.href} underline="none" >{service.button.title}</Link> */}
          <Typography variant="subtitle2" component="a" color="inherit" href={service.button.href} sx={{textDecoration: 'none'}}>
          {service.button.title}
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
