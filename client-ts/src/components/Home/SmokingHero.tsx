import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

function SmokingHero() {
  return (
    <div data-testid="support" className="smoking-hero">
      <Container
        component="div"
        sx={{
          display: "flex",
          height: "150px",
          flexDirection: "column",
          alignItems: "center",
          my: 9,
        }}
      >
        <Button
          sx={{
            border: "4px solid black",
            borderRadius: 0,
            height: "auto",
            py: 2,
            px: 5,
          }}
        >
          <Typography
            variant="h4"
            component="span"
            sx={{ fontWeight: 600, color: "black" }}
          >
            Got any questions? Need help?
          </Typography>
        </Button>
        <Typography variant="h6" sx={{ my: 3 }}>
          We are here to help. Get in touch!
        </Typography>
        <Box
          component="img"
          src="https://mui.com/static/themes/onepirate/producBuoy.svg"
          alt="buoy"
          sx={{ width: 60 }}
        />
      </Container>
    </div>
  );
}

export default SmokingHero;
