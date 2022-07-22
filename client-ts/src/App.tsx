import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { CreateBooking } from "./components/Bookings/BookingActions/CreateBooking";
import { DeleteBooking } from "./components/Bookings/BookingActions/DeleteBooking";
import { Bookings } from "./components/Bookings/Bookings";
import { MobileBookings } from "./components/Bookings/MobileBookings";
import { UpdateBooking } from "./components/Bookings/BookingActions/UpdateBooking";
import { NavBar } from "./components/NavBar/NavBar";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <LandingPage />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookings/add" element={<CreateBooking />} />
          <Route path="/bookings" element={<Bookings /> } />
          <Route path="/bookings/mobile" element={<MobileBookings /> } />
          <Route path="/bookings/update" element={<MobileBookings />} />
          <Route path="/bookings/update/:reservationId"  element={<UpdateBooking />} />
          <Route path="/bookings/delete" element={<DeleteBooking /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
