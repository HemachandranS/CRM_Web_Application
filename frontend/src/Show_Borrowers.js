

import React, { useState, useEffect } from 'react';
import './ShowBorrowers.css';
import {regions,entityTypes,statesByRegion,citiesByState} from './Borrower'
import axios from 'axios';



const BorrowerDetailsTable = () => {
  const [borrowerDetails, setBorrowerDetails] = useState([]);
  const [submitedit,setsubmitedit]=useState(false);
  const [filteredBorrowerDetails, setFilteredBorrowerDetails] = useState([]);
  const [editableBorrower, setEditableBorrower] = useState(null);
  const [editedBorrower, setEditedBorrower] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    region: '',
    state: '',
    city: '',
    entityType: '',
    loanTypes: '',
    cin: '',
    owner: '',
    productType: '',
    products: '',
    lesscreditRating: '',
    morecreditRating: '',
    financialYearAUM: '',
    quarterAUM: '',
    lessaum: '',
    moreaum: '',
    lessmaxInterestRate: '',
    moremaxInterestRate: '',
    lessminLoanAmount: '',
    moreminLoanAmount: '',
  });

  useEffect(() => {
    fetchBorrowerDetails();
    setsubmitedit(false);
  },[submitedit]);

  const fetchBorrowerDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/List_borrowers");
      setBorrowerDetails(response.data);
      setFilteredBorrowerDetails(response.data);
    } catch (error) {
      console.error('Error fetching borrower details:', error);
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
    let filteredData = borrowerDetails;

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

    if (filters.cin) {
      filteredData = filteredData.filter((detail) =>{
      if(detail.cin){
        return detail.cin===filters.cin}}
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

    if (filters.lesscreditRating) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.creditRating){
          if(filters.lesscreditRating.toLowerCase().includes('a')){
        return detail.creditRating.toLowerCase()<=filters.lesscreditRating.toLowerCase() || detail.creditRating.toLowerCase().includes('b') || detail.creditRating.toLowerCase().includes('not rated'); }
        else{
          return detail.creditRating.toLowerCase()<=filters.lesscreditRating.toLowerCase() && detail.creditRating.toLowerCase().includes('b') || detail.creditRating.toLowerCase().includes('not rated');;
        }
      }
        
      }
      );
    }

    if (filters.morecreditRating) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.creditRating){
          if(filters.morecreditRating.toLowerCase().includes('b')){
            return (detail.creditRating.toLowerCase()>=filters.morecreditRating.toLowerCase() || detail.creditRating.toLowerCase().includes('a')) && detail.creditRating!="Not Rated"}
            else{
              return detail.creditRating.toLowerCase()>=filters.morecreditRating.toLowerCase() && (detail.creditRating.toLowerCase().includes('a') && detail.creditRating!="Not Rated");
            }
          }}
          
      );
    }

    if (filters.financialYearAUM) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.financialYearAUM){
        return detail.financialYearAUM.toLowerCase()===filters.financialYearAUM.toLowerCase()}}
      );
    }
    if (filters.quarterAUM) {
      filteredData = filteredData.filter((detail) =>{
        if(detail.quarterAUM){
        return detail.quarterAUM.toLowerCase()===filters.quarterAUM.toLowerCase()}}
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

    if (filters.lessmaxInterestRate) {
      filteredData = filteredData.filter((detail) =>{
      if(detail.maxInterestRate){
        return detail.maxInterestRate<=filters.lessmaxInterestRate}}
      );
    }

    if (filters.moremaxInterestRate) {
      filteredData = filteredData.filter((detail) =>{
      if(detail.maxInterestRate){
        return detail.maxInterestRate>=filters.moremaxInterestRate}}
      );
    }

    if (filters.lessminLoanAmount) {
      filteredData = filteredData.filter((detail) =>{
      if(detail.minLoanAmount){
        return detail.minLoanAmount<=filters.lessminLoanAmount}}
      );
    }

    if (filters.moreminLoanAmount) {
      filteredData = filteredData.filter((detail) =>{
      if(detail.minLoanAmount){
        return detail.minLoanAmount>=filters.moreminLoanAmount}}
      );
    }


    setFilteredBorrowerDetails(filteredData);
  }, [filters, borrowerDetails]);

  
  const handleEditBorrower = (borrower) => {
    setEditableBorrower({ ...borrower });
    setEditedBorrower({ ...borrower }); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(editableBorrower.quarterAUM);
    setEditedBorrower((prevBorrower) => ({
      ...prevBorrower,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Implement your logic to update the edited borrower in the database
    // You can use Axios or fetch to send a PUT or PATCH request with `editedBorrower`
    // After successful update, reset the state
    axios.put(`http://localhost:3001/api/borrowers/${editableBorrower.id}`, editedBorrower)
      .then((response) => {
        // Handle the response (optional)
        console.log('Borrower details updated successfully:', response.data);
        // Reset states
        setsubmitedit(true);
        setEditableBorrower(null);
        setEditedBorrower(null);
      })
      .catch((error) => {
        // Handle errors (optional)
        console.error('Error updating borrower details:', error);
      });
    setEditableBorrower(null);
    setEditedBorrower(null);
  };

  return (
    <div className='Borrowertable'>
      <h2>Borrower Details Table</h2>
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
            <th>
              Entity Type<br></br>
              <input
                type="text"
                value={filters.entityType}
                onChange={(e) =>
                  handleFilterChange('entityType', e.target.value)
                }
              />
            </th>
            <th>CIN<br></br>
            <input
                type="text"
                value={filters.cin}
                onChange={(e) => handleFilterChange('cin', e.target.value)}
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
                placeholder='less than'
                value={filters.lesscreditRating}
                onChange={(e) => handleFilterChange('lesscreditRating', e.target.value)}
              />
              <input
                type="text"
                placeholder='More than'
                value={filters.morecreditRating}
                onChange={(e) => handleFilterChange('morecreditRating', e.target.value)}
              />
            </th>
            <th>Financial year for AUM<br></br>
            <input
                type="text"
                value={filters.financialYearAUM}
                onChange={(e) => handleFilterChange('financialYearAUM', e.target.value)}
              />
            </th>
            <th>Quarter of year for AUM<br></br>
            <input
                type="text"
                value={filters.quarterAUM}
                onChange={(e) => handleFilterChange('quarterAUM', e.target.value)}
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
            <th>Maximum interest Rate<br></br>
            <input
                type="decimal"
                placeholder='less than'
                value={filters.lessmaxInterestRate}
                onChange={(e) => handleFilterChange('lessmaxInterestRate', e.target.value)}
              />
              <input
                type="decimal"
                placeholder='more than'
                value={filters.moremaxInterestRate}
                onChange={(e) => handleFilterChange('moremaxInterestRate', e.target.value)}
              />
            </th>
            <th>Minimum Loan amount (in crores)<br></br>
            <input
                type="decimal"
                placeholder='less than'
                value={filters.lessminLoanAmount}
                onChange={(e) => handleFilterChange('lessminLoanAmount', e.target.value)}
              />

              <input
                type="decimal"
                placeholder='more than'
                value={filters.moreminLoanAmount}
                onChange={(e) => handleFilterChange('moreminLoanAmount', e.target.value)}
              />
            </th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredBorrowerDetails.map((detail) => (
           
            <tr key={detail.id}>
            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="name"
                  value={editedBorrower.name}
                  onChange={handleInputChange}
                />
              ) : (
                detail.name
              )}
            </td>
        <td>
              {editableBorrower?.id === detail.id ? (
                
          <select
          name='region'
          value={editedBorrower.region}
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
          
          value={editedBorrower.region}
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
              {editableBorrower?.id === detail.id ? (
                // <input
                //   type="text"
                //   name="state"
                //   value={editedBorrower.state}
                //   onChange={handleInputChange}
                // />
                <select
          name='state'
          value={editedBorrower.state}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a state</option>
          {
            statesByRegion[editedBorrower.region].map((state) => (
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
              {editableBorrower?.id === detail.id ? (
                <select
                name='city'
                value={editedBorrower.city}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a city</option>
                {
                  citiesByState[editedBorrower.state].map((city) => (
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
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="entity type"
                  value={editedBorrower.entityType}
                  onChange={handleInputChange}
                />
              ) : (
                detail.entityType
              )}
            </td>
            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="cin"
                  value={editedBorrower.cin}
                  onChange={handleInputChange}
                />
              ) : (
                detail.cin
              )}
            </td>
            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="loanTypes"
                  value={editedBorrower.loanTypes}
                  onChange={handleInputChange}
                />
              ) : (
                detail.loanTypes
              )}
            </td>
            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="owner"
                  value={editedBorrower.owner}
                  onChange={handleInputChange}
                />
              ) : (
                detail.owner
              )}
            </td>
            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="productType"
                  value={editedBorrower.productType}
                  onChange={handleInputChange}
                />
              ) : (
                detail.productType
              )}
            </td>
            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="products"
                  value={editedBorrower.products}
                  onChange={handleInputChange}
                />
              ) : (
                detail.products
              )}
            </td>
            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="creditRating"
                  value={editedBorrower.creditRating}
                  onChange={handleInputChange}
                />
              ) : (
                detail.creditRating
              )}
            </td>
            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="financialYearAUM"
                  value={editedBorrower.financialYearAUM}
                  onChange={handleInputChange}
                />
              ) : (
                detail.financialYearAUM
              )}
            </td>
            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="text"
                  name="quarterAUM"
                  value={editedBorrower.quarterAUM}
                  onChange={handleInputChange}
                />
              ) : (
                detail.quarterAUM
              )}
            </td>

            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="decimal"
                  name="aum"
                  value={editedBorrower.aum}
                  onChange={handleInputChange}
                />
              ) : (
                detail.aum
              )}
            </td>

            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="decimal"
                  name="maxInterestRate"
                  value={editedBorrower.maxInterestRate}
                  onChange={handleInputChange}
                />
              ) : (
                detail.maxInterestRate
              )}
            </td>

            <td>
              {editableBorrower?.id === detail.id ? (
                <input
                  type="decimal"
                  name="minLoanAmount"
                  value={editedBorrower.minLoanAmount}
                  onChange={handleInputChange}
                />
              ) : (
                detail.minLoanAmount
              )}
            </td>

            {/* Add other table columns similarly */}
            <td>
              {editableBorrower?.id === detail.id ? (
                <button onClick={handleSubmit}>Submit</button>
              ) : (
                <button onClick={() => handleEditBorrower(detail)}>Edit</button>
              )}
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowerDetailsTable;
