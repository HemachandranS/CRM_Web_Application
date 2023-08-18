import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Borrower from './Borrower';
import Home from './Home';
import Lender from './Lender';
import BorrowerList from './Show_Borrowers';
import LenderList from './Show_Lenders';
import Contactdetailes from './ContactDetails';
import Contactdetaileslender from './ContactDetailslender';
import NotFound from './NotFound';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/borrower" element={<Borrower />} />
    <Route path="/ContactDetails" element={<Contactdetailes />} />
    <Route path="/ContactDetailslender" element={<Contactdetaileslender />} />
    <Route path="/Show_borrower" element={<BorrowerList />} />
    <Route path="/Show_Lender" element={<LenderList />} />
    <Route path="/lender" element={<Lender />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
