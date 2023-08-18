

import React, { useState, useEffect } from 'react';
import './ShowBorrowers.css';
import {regions,entityTypes,statesByRegion,citiesByState} from './Borrower'
import axios from 'axios';



const LenderDetailsTable = () => {
  const [lenderDetails, setLenderDetails] = useState([]);
  const [submitedit,setsubmitedit]=useState(false);
  const [filteredlenderDetails, setFilteredlenderDetails] = useState([]);
  const [editableLender, setEditableLender] = useState(null);
  const [editedLender, setEditedLender] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    region: '',
    state: '',
    city: '',
    Borrowerregion: '',
    loanTypes: '',
    owner: '',
    productType: '',
    products: '',
    lessminCreditRating: '',
    moreminCreditRating: '',
    lessaum: '',
    moreaum: '',
    lessminInterestRate: '',
    moreminInterestRate: '',
    minLoanAmount: '',
    maxLoanAmount: '',
  });

  useEffect(() => {
    fetchlenderDetails();
    setsubmitedit(false);
  },[submitedit]);

  const fetchlenderDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/List_lenders");
      setLenderDetails(response.data);
      setFilteredlenderDetails(response.data);
    } catch (error) {
      console.error('Error fetching lender details:', error);
    }
  };

  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  useEffect(() => {
    // Apply filters
    let filteredData = lenderDetails;

    if (filters.name) {
      filteredData = filteredData.filter((detail) =>
        detail.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.region) {
      filteredData = filteredData.filter((detail) =>
        detail.region.toLowerCase().includes(filters.region.toLowerCase())
      );
    }
    if (filters.state) {
      filteredData = filteredData.filter((detail) =>
        detail.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }
    if (filters.city) {
      filteredData = filteredData.filter((detail) =>
        detail.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.entityType) {
      filteredData = filteredData.filter((detail) =>
        detail.entityType.toLowerCase().includes(filters.entityType.toLowerCase())
      );
    }

    if (filters.loanTypes) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.loanTypes){
        return detail.loanTypes.toLowerCase().includes(filters.loanTypes.toLowerCase())}}
      );
    }

    if (filters.Borrowerregion) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.Borrowerregion){
        return detail.Borrowerregion.toLowerCase().includes(filters.Borrowerregion.toLowerCase())}}
      );
    }

    if (filters.owner) {
      filteredData = filteredData.filter((detail) =>
        detail.owner.toLowerCase().includes(filters.owner.toLowerCase())
      );
    }
    if (filters.productType) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.productType){
        return detail.productType.toLowerCase()===filters.productType.toLowerCase()}}
      );
    }
    if (filters.products) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.products){
        return detail.products.toLowerCase().includes(filters.products.toLowerCase())}}
      );
    }

    if (filters.lessminCreditRating) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.minCreditRating){
        // return detail.minCreditRating.toLowerCase()<=filters.lessminCreditRating.toLowerCase()
        if(filters.lessminCreditRating.toLowerCase().includes('a')){
          return detail.minCreditRating.toLowerCase()<=filters.lessminCreditRating.toLowerCase() || detail.minCreditRating.toLowerCase().includes('b') || detail.minCreditRating.toLowerCase().includes('not rated'); }
          else{
            return detail.minCreditRating.toLowerCase()<=filters.lessminCreditRating.toLowerCase() && detail.minCreditRating.toLowerCase().includes('b') || detail.minCreditRating.toLowerCase().includes('not rated');;
          }
        
      }}
      );
    }

    if (filters.moreminCreditRating) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.minCreditRating){
        // return detail.minCreditRating.toLowerCase()<=filters.lessminCreditRating.toLowerCase()
        if(filters.moreminCreditRating.toLowerCase().includes('b')){
          return (detail.minCreditRating.toLowerCase()>=filters.moreminCreditRating.toLowerCase() || detail.minCreditRating.toLowerCase().includes('a') ) && detail.minCreditRating!="Not Rated"; }
          else{
            return detail.minCreditRating.toLowerCase()>=filters.moreminCreditRating.toLowerCase() && detail.minCreditRating.toLowerCase().includes('a') && detail.minCreditRating!="Not Rated";
          }
        
      }}
      );
    }

    
   
    

    if (filters.lessaum) {
      filteredData = filteredData.filter((detail) =>{
      if(detail.aum){
        return detail.aum<=filters.lessaum}}
      );
    }

    if (filters.moreaum) {
      filteredData = filteredData.filter((detail) =>{
      if(detail.aum){
        return detail.aum>=filters.moreaum}}
      );
    }

    if (filters.lessminInterestRate) {
      filteredData = filteredData.filter((detail) =>{
      if(detail.minInterestRate){
        return detail.minInterestRate<=filters.lessminInterestRate}}
      );
    }

    if (filters.moreminInterestRate) {
      filteredData = filteredData.filter((detail) =>{
      if(detail.minInterestRate){
        return detail.minInterestRate>=filters.moreminInterestRate}}
      );
    }

    if (filters.minLoanAmount) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.minLoanAmount){
        return detail.minLoanAmount===filters.minLoanAmount}}
      );
    }

    if (filters.maxLoanAmount) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.maxLoanAmount){
        return detail.maxLoanAmount===filters.maxLoanAmount}}
      );
    }

   


    setFilteredlenderDetails(filteredData);
  }, [filters, lenderDetails]);

  
  const handleEditLender = (lender) => {
    setEditableLender({ ...lender });
    setEditedLender({ ...lender }); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEditedLender((prevLender) => ({
      ...prevLender,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Implement your logic to update the edited lender in the database
    // You can use Axios or fetch to send a PUT or PATCH request with `editedLender`
    // After successful update, reset the state
    axios.put(`http://localhost:3001/api/lenders/${editableLender.id}`, editedLender)
      .then((response) => {
        // Handle the response (optional)
        console.log('Lender details updated successfully:', response.data);
        // Reset states
        setsubmitedit(true);
        setEditableLender(null);
        setEditedLender(null);
      })
      .catch((error) => {
        // Handle errors (optional)
        console.error('Error updating lender details:', error);
      });
    setEditableLender(null);
    setEditedLender(null);
  };

  return (
    <div className='Borrowertable'>
      <h2>Lender Details Table</h2>
      <table id="Showborrower">
        <thead>
          <tr>
          <th>
              Name<br></br>
              <input
                type="text"
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </th>
            <th>
              Region<br></br>
              <input
                type="text"
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
              />
            </th>
            <th>
              State<br></br>
              <input
                type="text"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
              />
            </th>
            <th>
              City<br></br>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </th>
            <th>Borrower region<br></br>
            <input
                type="text"
                value={filters.Borrowerregion}
                onChange={(e) => handleFilterChange('Borrowerregion', e.target.value)}
              />
            </th>
            
            <th>Loan Types<br></br>
            <input
                type="text"
                value={filters.loanTypes}
                onChange={(e) => handleFilterChange('loanTypes', e.target.value)}
              />
            </th>
            <th>
              Owner<br></br>
              <input
                type="text"
                value={filters.owner}
                onChange={(e) => handleFilterChange('owner', e.target.value)}
              />
            </th>
            <th>
              Product Type<br></br>
              <input
                type="text"
                value={filters.productType}
                onChange={(e) => handleFilterChange('productType', e.target.value)}
              />
            </th>
            <th>Products<br></br>
            <input
                type="text"
                value={filters.products}
                onChange={(e) => handleFilterChange('products', e.target.value)}
              />
            </th>
            <th>Credit Rating<br></br>
            <input
                type="text"
                placeholder='Less than'
                value={filters.lessminCreditRating}
                onChange={(e) => handleFilterChange('lessminCreditRating', e.target.value)}
              />
              <input
                type="text"
                placeholder='More than'
                value={filters.moreminCreditRating}
                onChange={(e) => handleFilterChange('moreminCreditRating', e.target.value)}
              />
            </th>
            <th>aum (in crores)<br></br>
            <input
                type="decimal"
                placeholder='less than'
                value={filters.lessaum}
                onChange={(e) => handleFilterChange('lessaum', e.target.value)}
              />
               <input
                type="decimal"
                placeholder='more than'
                value={filters.moreaum}
                onChange={(e) => handleFilterChange('moreaum', e.target.value)}
              />
            </th>
            
            
            
            <th>Minimum interest Rate<br></br>
            <input
                type="decimal"
                placeholder='less than'
                value={filters.lessminInterestRate}
                onChange={(e) => handleFilterChange('lessminInterestRate', e.target.value)}
              />
              <br></br>
              <input
                type="decimal"
                placeholder='more than'
                value={filters.moreminInterestRate}
                onChange={(e) => handleFilterChange('moreminInterestRate', e.target.value)}
              />
            </th>
            <th>Minimum Loan Amount<br></br>
            <input
                type="decimal"
                // placeholder='less than'
                value={filters.minLoanAmount}
                onChange={(e) => handleFilterChange('minLoanAmount', e.target.value)}
              />
              
            </th>

            <th>Maximum Loan Amount<br></br>
            <input
                type="decimal"
                // placeholder='less than'
                value={filters.maxLoanAmount}
                onChange={(e) => handleFilterChange('maxLoanAmount', e.target.value)}
              />
              
            </th>
            
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredlenderDetails.map((detail) => (
           
            <tr key={detail.id}>
            <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="text"
                  name="name"
                  value={editedLender.name}
                  onChange={handleInputChange}
                />
              ) : (
                detail.name
              )}
            </td>
            <td>
              {editableLender?.id === detail.id ? (
                
          <select
          name='region'
          value={editedLender.region}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
              ) : (
                detail.region
              )}
              </td>
        {/* <select
          
          value={editedLender.region}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a region</option>
          {regions.map((region1) => (
            <option key={region1} value={region1}>
              {region1}
            </option>
          ))}
        </select> */}
            
            <td>
              {editableLender?.id === detail.id ? (
                // <input
                //   type="text"
                //   name="state"
                //   value={editedLender.state}
                //   onChange={handleInputChange}
                // />
                <select
          name='state'
          value={editedLender.state}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a state</option>
          {
            statesByRegion[editedLender.region].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
        </select>
              ) : (
                detail.state
              )}
            </td>
            <td>
              {editableLender?.id === detail.id ? (
                <select
                name='city'
                value={editedLender.city}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a city</option>
                {
                  citiesByState[editedLender.state].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
              ) : (
                detail.city
              )}
            </td>
            <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="text"
                  name="Borrowerregion"
                  value={editedLender.Borrowerregion}
                  onChange={handleInputChange}
                />
              ) : (
                detail.Borrowerregion
              )}
            </td>
            <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="text"
                  name="loanTypes"
                  value={editedLender.loanTypes}
                  onChange={handleInputChange}
                />
              ) : (
                detail.loanTypes
              )}
            </td>
            <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="text"
                  name="owner"
                  value={editedLender.owner}
                  onChange={handleInputChange}
                />
              ) : (
                detail.owner
              )}
            </td>
            <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="text"
                  name="productType"
                  value={editedLender.productType}
                  onChange={handleInputChange}
                />
              ) : (
                detail.productType
              )}
            </td>
            <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="text"
                  name="products"
                  value={editedLender.products}
                  onChange={handleInputChange}
                />
              ) : (
                detail.products
              )}
            </td>

            <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="text"
                  name="minCreditRating"
                  value={editedLender.minCreditRating}
                  onChange={handleInputChange}
                />
              ) : (
                detail.minCreditRating
              )}
            </td>
            
             <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="decimal"
                  name="aum"
                  value={editedLender.aum}
                  onChange={handleInputChange}
                />
              ) : (
                detail.aum
              )}
            </td>

           

            <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="decimal"
                  name="minInterestRate"
                  value={editedLender.minInterestRate}
                  onChange={handleInputChange}
                />
              ) : (
                detail.minInterestRate
              )}
            </td>

            <td>
              {editableLender?.id === detail.id ? (
                <input
                  type="decimal"
                  name="minLoanAmount"
                  value={editedLender.minLoanAmount}
                  onChange={handleInputChange}
                />
              ) : (
                detail.minLoanAmount
              )}
            </td>
            <td>
            {editableLender?.id === detail.id ? (
                <input
                  type="decimal"
                  name="maxLoanAmount"
                  value={editedLender.maxLoanAmount}
                  onChange={handleInputChange}
                />
              ) : (
                detail.maxLoanAmount
              )}
            </td>

           

            {/* Add other table columns similarly */}
            <td>
              {editableLender?.id === detail.id ? (
                <button onClick={handleSubmit}>Submit</button>
              ) : (
                <button onClick={() => handleEditLender(detail)}>Edit</button>
              )}
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LenderDetailsTable;
