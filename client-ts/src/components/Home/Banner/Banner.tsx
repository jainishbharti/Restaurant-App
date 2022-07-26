import { Box, Button, Link, Typography } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export const Banner = () => {
  return (
    <Box data-testid="banner" className="banner" sx={{ margin: "4rem" }}>
      <Box
        sx={{ background: "rgba(0, 0, 0, 0.567)", padding: "2rem 2rem", borderRadius: '5rem 0 5rem 0', width:'60vw', margin:'auto' }}
      >
        <Typography
          variant="h2"
          component="div"
          sx={{ color: "white", fontWeight: 550, fontFamily: "monospace" }}
        >
          UPGRADE YOUR SUNDAYS
        </Typography>
        <hr style={{ width: "300px", color: "rgba(25, 111, 122)" }} />
        <Typography
          className="desc"
          variant="h5"
          component="div"
          mt={7}
          sx={{ color: "aliceblue", fontFamily: "monospace" }}
        >
          Enjoy secret offers upto 40% off on every Sunday. Enjoy fine- dining
          with full family!
        </Typography>
        <Button
          className="desc"
          color="primary"
          variant="contained"
          size="large"
          sx={{
            marginTop: "7em",
            padding: "1rem 2rem",
          }}
        >
          <Link href="/bookings/add" underline="none" sx={{ color: "white" }}>
            CREATE RESERVATION
          </Link>
        </Button>
      </Box>

      <Box mt={14} className="desc">
        <Button
          variant="contained"
          color="inherit"
          sx={{ padding: "1rem 3rem" }}
        >
          Discover the experience!
        </Button>
      </Box>
      <Box className="desc" sx={{ marginTop: "2rem", color: 'white' }}>
        <ArrowCircleDownIcon fontSize="large"/>
      </Box>
    </Box>
  );
};
