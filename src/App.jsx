import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { reservationData } from "./data";
import { useState } from "react";
import Booking from "./pages/Booking";
import Rooms from "./pages/Rooms";
import Home from "./pages/dashboard/hOME";

function App() {
  
  return (
    <main className="grid justify-end max-[920px]:flex max-[920px]:flex-col max-[920px]:items-center">
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/add-book" element={<Booking />} />
        <Route path="/books" element={<Rooms />} />
      </Routes>
    </main>
  );
}

export default App;
