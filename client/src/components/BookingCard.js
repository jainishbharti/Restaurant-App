import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BookingCard({booking}) {
    const { mobile, seats, table, userName } = booking;
  return (
    <Box>
      <Card sx={{ width: 300, margin: '2rem', textAlign:"left" }}>
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
            Suitable for Couple
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Slot: 8:00PM - 11:00PM</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
