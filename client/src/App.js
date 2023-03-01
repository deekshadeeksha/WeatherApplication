import React from "react";
import MainPage from './components/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailsWeather from './components/DetailsWeather';

function App() {
  
  return (
    <div className="wrapper">      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} >
          </Route>
          <Route path="/details" element={<DetailsWeather/>} />
          <Route path="/details/:lat/:long" element={<DetailsWeather/>}/>
        </Routes> 
      </BrowserRouter>
    </div>);
}

export default App;
