import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import Saved from "./Saved";
import SimilarNews from "./SimilarNews";
import { useState } from "react";

function Pages() {

  const [savedNews, setSavedNews] = useState(new Set());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home savedNews={savedNews} setSavedNews={setSavedNews}/>}></Route>
        <Route path="/similar/:id" element={<SimilarNews savedNews={savedNews} setSavedNews={setSavedNews}/>}></Route>
        <Route path="/saved" element={<Saved savedNews={savedNews} setSavedNews={setSavedNews}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Pages