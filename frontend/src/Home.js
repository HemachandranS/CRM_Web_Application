import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div id="Home">
      <h1>Express Rupya</h1>
      
      <div className="Borrowers">
      <Link className="Link" to="/borrower">
        <div>Create New Borrower</div>
      </Link>
      <Link className="Link" to="/ContactDetails">
      <div>Contact Details borrower</div>
      </Link>
      <Link className='Link' to="/Show_borrower">
        <div>Show all Borrowers</div>
      </Link>
      </div>
      <Link className="Link" to="/Lender">
        <div>Create New Lender</div>
      </Link>
      <Link className="Link" to="/ContactDetailslender">
      <div>Contact Details lender</div>
      </Link>
      <Link className='Link' to="/Show_lender">
        <div>Show all Lenders</div>
      </Link>
    </div>
  );
};

export default Home;
