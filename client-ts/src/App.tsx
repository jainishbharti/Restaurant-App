import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { CreateBooking } from "./components/Bookings/BookingActions/CreateBooking";
import { UpdateBooking } from "./components/Bookings/BookingActions/UpdateBooking";
import { DeleteBooking } from "./components/Bookings/BookingActions/DeleteBooking";
import { Bookings } from "./components/Bookings/Bookings";

function App() {
  return (
    <div className="App">
      <LandingPage />
      <BrowserRouter>
        <Routes>
          <Route path="/bookings/add" element={<CreateBooking />} />
          <Route path="/bookings" element={<Bookings /> } />
          <Route path="/bookings/update" element={<UpdateBooking />} />
          <Route path="/bookings/delete" element={<DeleteBooking /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
