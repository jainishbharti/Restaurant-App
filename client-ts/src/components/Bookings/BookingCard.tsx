import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type BookingCardProps = {
  booking: {
    reservationId: number;
    mobile: string;
    seats: number;
    table: {
      tableId: number;
      tableType: string;
      status: string;
      capacity: number;
    };
    userName: string;
  };
};

export const BookingCard = ({ booking }: BookingCardProps) => {
  const { reservationId, mobile, seats, table, userName } = booking;
  return (
    <Box data-testid="booking-card">
      <Card
        sx={{
          width: 350,
          margin: "2rem",
          textAlign: "left",
          borderRadius: "8px",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Table No: {table.tableId}
          </Typography>
          <Typography variant="h5" component="div">
            {userName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Mobile: {mobile}
          </Typography>
          <Typography variant="body2">
            This table is has capacity of {seats}.
            <br />
            Ideal for {seats === 4 ? "Family" : "Couple"}
          </Typography>
          <Typography variant="caption">
            Slot: 8:00PM - 11:00PM
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Link to={`/bookings/update/${reservationId}`} style={{textDecoration: 'none'}}>
            <Button size="small" variant="outlined">
              Edit Booking
            </Button>
          </Link> */}
          <Button size="small" variant="outlined">
            <Typography
              variant="subtitle2"
              component="a"
              href={`/bookings/update/${reservationId}`}
              color="inherit"
              sx={{ textDecoration: "none" }}
            >
              Edit Booking
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
