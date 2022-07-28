import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeleteBooking } from "./components/Bookings/BookingActions/DeleteBooking";
import { MobileBookings } from "./components/Bookings/MobileBookings";
import { UpdateBooking } from "./components/Bookings/BookingActions/UpdateBooking";
import { NavBar } from "./components/NavBar/NavBar";
import { HomePage } from "./pages/HomePage";
import AppFooter from "./components/Footer/AppFooter";
import { CreateBookingPage } from "./pages/CreateBookingPage";
import { BookingsPage } from "./pages/BookingsPage";
import { BookingsByMobilePage } from "./pages/BookingsByMobilePage";

function Router() {
  return (
    <div data-testid="routing" className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookings/add" element={<CreateBookingPage />} />
          <Route path="/bookings" element={<BookingsPage /> } />
          <Route path="/bookings/mobile" element={<BookingsByMobilePage /> } />
          <Route path="/bookings/update" element={<MobileBookings />} />
          <Route path="/bookings/update/:reservationId"  element={<UpdateBooking />} />
          <Route path="/bookings/delete" element={<DeleteBooking /> } />
        </Routes>
      </BrowserRouter>
      <AppFooter />
    </div>
  );
}

export default Router;
