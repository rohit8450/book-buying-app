import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SearchBooks from "./components/SearchBooks/SearchBooks";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/" element={<SearchBooks />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
