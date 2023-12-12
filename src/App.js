import Layout from "./Layout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Movie from "./Movie";
import Watchlist from "./Watchlist";
import Param from "./Param";
import './App.css';
function App() {
  return (
<Routes>
 <Route path="/" element={<Layout/>}>  
   <Route index element={<Movie />} />
   <Route path="/watchlist" element={<Watchlist />} />
   <Route path="/:param" element={<Param />} />
 </Route>       
</Routes>
  )
}

export default App;
