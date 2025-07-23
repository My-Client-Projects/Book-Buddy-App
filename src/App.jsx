import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/Home";
import ReadingList from "./pages/ReadingList";
import BookDetail from "./pages/BookDetail";

function App() {
  
  return (
    <main className="grid justify-end max-[920px]:flex max-[920px]:flex-col max-[920px]:items-center">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reading-list" element={<ReadingList />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </main>
  );
}

export default App;
