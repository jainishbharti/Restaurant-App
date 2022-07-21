import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "@mui/material";

export const LandingPage = () => {
  return (
    <div>
      <Box>
        <Typography variant="h4" m={3}>
          Welcome to our Restaurant App!
        </Typography>
        <Typography variant="h6" m={2}>
          We provide following services:
        </Typography>
        <Box>
          <Button
            color="success"
            variant="outlined"
            sx={{ marginRight: "1em" }}
          >
            <Link href="/bookings/add" underline="none">
              Create Booking
            </Link>
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            sx={{ marginRight: "1em" }}
          >
            <Link href="/bookings/update" underline="none">
            Update Booking
            </Link>
          </Button>
          <Button
            color="primary"
            variant="outlined"
            sx={{ marginRight: "1em" }}
          >
             <Link href="/bookings" underline="none">
            Fetch Bookings
            </Link>
          </Button>
          <Button color="error" variant="outlined" sx={{ marginRight: "1em" }}>
          <Link href="/bookings/delete" underline="none">
            Delete Booking
            </Link>
          </Button>
        </Box>
      </Box>
    </div>
  );
};