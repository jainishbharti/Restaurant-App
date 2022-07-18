import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { BookingForm } from "./components/BookingForm";
import { Bookings } from "./components/Bookings";
import { DeleteBooking } from "./components/DeleteBooking";
import { LandingPage } from "./components/LandingPage";
import { UpdateBooking } from "./components/UpdateBooking";

function App() {
  return (
    <div className="App">
      <LandingPage />
      <BrowserRouter>
        <Routes>
          <Route path="/bookings/add" element={<BookingForm />} />
          <Route path="/bookings" element={<Bookings /> } />
          <Route path="/bookings/update" element={<UpdateBooking />} />
          <Route path="/bookings/delete" element={<DeleteBooking /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
