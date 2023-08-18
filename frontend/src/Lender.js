import React, { useState } from 'react';
import Axios from 'axios';
import './Borrower.css';

const regions = ['North', 'South', 'East', 'West'];

const statesByRegion = {
  North: [
    'Jammu and Kashmir',
    'Himachal Pradesh',
    'Punjab',
    'Uttarakhand',
    'Haryana',
    'Delhi',
    'Uttar Pradesh',
    'Rajasthan',
    'Madhya Pradesh',
    'Chandigarh',
  ],
  South: [
    'Andhra Pradesh',
    'Telangana',
    'Karnataka',
    'Tamil Nadu',
    'Kerala',
    'Puducherry',
  ],
  East: ['West Bengal', 'Odisha', 'Jharkhand', 'Bihar', 'Sikkim'],
  West: [
    'Gujarat',
    'Maharashtra',
    'Goa',
    'Daman and Diu',
    'Dadra and Nagar Haveli',
  ],
};

const citiesByState = {
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Kathua'],
  'Himachal Pradesh': ['Shimla', 'Kullu', 'Manali', 'Dharamshala', 'Kangra'],
  'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Mussoorie'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar'],
  'Delhi': ['New Delhi', 'Noida', 'Ghaziabad', 'Faridabad', 'Gurugram'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Allahabad'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer', 'Kota'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
  'Chandigarh': ['Chandigarh'],
  'Andhra Pradesh': ['Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore'],
  'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Khammam', 'Nizamabad'],
  'Karnataka': ['Bengaluru', 'Mysore', 'Hubli', 'Belgaum', 'Mangalore'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Puducherry': ['Puducherry'],
  'West Bengal': ['Kolkata', 'Darjeeling', 'Asansol', 'Durgapur', 'Siliguri'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Bihar Sharif'],
  'Sikkim': ['Gangtok', 'Namchi', 'Jorethang', 'Mangan', 'Rangpo'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'],
  'Goa': ['Panaji', 'Madgaon', 'Vasco da Gama', 'Ponda', 'Mapusa'],
  'Daman and Diu': ['Daman', 'Diu'],
  'Dadra and Nagar Haveli': ['Silvassa'],
};

const Lender = () => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [loanTypes, setLoanTypes] = useState([]);
  const [Borrowerregion, setBorrowerregion] = useState([]);
  const [owner, setOwner] = useState('');
  const [productType, setProductType] = useState('');
  const [products, setProducts] = useState([]);
  const [aum, setAum] = useState('');
  const [mincreditRating, setminCreditRating] = useState('');
  const [minInterestRate, setminInterestRate] = useState('');
  const [showMfiGrading, setShowMfiGrading] = useState(false);
  const [minLoanAmount, setMinLoanAmount] = useState('');
  const [maxLoanAmount, setMaxLoanAmount] = useState('');
  const [mfiGrading, setMfiGrading] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    setState('');
    setCity('');
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setCity('');
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleLoanTypeChange = (event) => {
    const selectedLoanType = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setLoanTypes([...loanTypes, selectedLoanType]);
    } else {
      setLoanTypes(loanTypes.filter((type) => type !== selectedLoanType));
    }
  };

  const handleBorrowerregionChange = (event) => {
    const selectedBorrowerregion = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setBorrowerregion([...Borrowerregion, selectedBorrowerregion]);
    } else {
      setBorrowerregion(Borrowerregion.filter((type) => type !== selectedBorrowerregion));
    }
  };

  const handleOwnerChange = (event) => {
    setOwner(event.target.value);
  };

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handleProductChange = (event) => {
    const selectedProduct = event.target.value;
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setProducts([...products, selectedProduct]);
      if(selectedProduct==="MFI"){
        setShowMfiGrading(true);
      }
    } else {
      if(products.map((product)=> product !=="MFI"))
      {
        setShowMfiGrading(false);
      }

      setProducts(
        products.filter((product) => product !== selectedProduct)
      );
    }
  };

  const handleAumChange = (event) => {
    setAum(event.target.value);
  };

  const handleminCreditRatingChange = (event) => {
    setminCreditRating(event.target.value);
  };

  const handleminInterestRateChange = (event) => {
    setminInterestRate(event.target.value);
  };

  const handleMinLoanAmountChange = (event) => {
    setMinLoanAmount(event.target.value);
  };

  const handleMaxLoanAmountChange = (event) => {
    setMaxLoanAmount(event.target.value);
  };

  const handleMfiGradingChange = (event) => {
    setMfiGrading(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission here
  

    try {
      // Send a POST request to the backend API
  

     Axios.post("http://localhost:3001/api/lender", {
      name: name,
      region: region,
      state: state,
      city: city,
      loanTypes: loanTypes,
      owner: owner,
      productType: productType,
      products: products,
      mincreditRating: mincreditRating,
      minInterestRate: minInterestRate,
      mfiGrading: mfiGrading,
      aum: aum,
      minLoanAmount: minLoanAmount,
      maxLoanAmount: maxLoanAmount,
      Borrowerregion: Borrowerregion,
    }, {
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      // Handle the response from the server
      
      console.log('Response:', response.data);

      // Reset form fields
      setName('');
      setRegion('');
      setState('');
      setCity('');
      setLoanTypes([]);
      setOwner('');
      setProductType('');
      setProducts([]);
      setminCreditRating('');
      setminInterestRate('');
      setMfiGrading('');
      setAum('');
      setMinLoanAmount('');
      setMaxLoanAmount('');
      setBorrowerregion([]);
      alert("details submitted");

      // Display success message or perform other actions
      console.log('Lender data submitted successfully!');
    });
    } catch (error) {
      // Handle error response
      console.error('Error submitting Lender data:', error);
      // Display error message or perform other actions
    }

    // Reset form fields
    
  };

  return (
    <div id="form">
      <div className="borrowers_details">Lender's Details</div>
    <form onSubmit={handleSubmit}>
      <div id="name">
        <label htmlFor="name">Name of Lender:</label>
        <input
          type="text"
          
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div id="region">
        <label htmlFor="region">Region:</label>
        <select
          
          value={region}
          onChange={handleRegionChange}
          required
        >
          <option value="">Select a region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div id="state">
        <label htmlFor="state">State:</label>
        <select
          
          value={state}
          onChange={handleStateChange}
          required={region !== ''}
        >
          <option value="">Select a state</option>
          {region !== '' &&
            statesByRegion[region].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
        </select>
      </div>

      <div id="city">
        <label htmlFor="city">City:</label>
        <select
          
          value={city}
          onChange={handleCityChange}
          required={state !== ''}
        >
          <option value="">Select a city</option>
          {state !== '' &&
            citiesByState[state].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>

      <div id="Loan-type">
        <label>Loan Types:</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="Type 1"
              checked={loanTypes.includes('Type 1')}
              onChange={handleLoanTypeChange}
            />
            Term Loan
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Type 2"
              checked={loanTypes.includes('Type 2')}
              onChange={handleLoanTypeChange}
            />
            BC
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Type 3"
              checked={loanTypes.includes('Type 3')}
              onChange={handleLoanTypeChange}
            />
            PTC
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Type 4"
              checked={loanTypes.includes('Type 4')}
              onChange={handleLoanTypeChange}
            />
            DA
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Type 5"
              checked={loanTypes.includes('Type 5')}
              onChange={handleLoanTypeChange}
            />
            Venture Debt
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Type 5"
              checked={loanTypes.includes('Type 5')}
              onChange={handleLoanTypeChange}
            />
            Other type 
          </label>
        </div>
      </div>

      <div id="Owner_name">
        <label htmlFor="Ownername">Owner of lender:</label>
        <input
          type="text"
          
          value={owner}
          onChange={handleOwnerChange}
          required
        />
      </div>

      <div>
          <label htmlFor="productType">Product Type:</label>
          <select
            id="productType"
            value={productType}
            onChange={handleProductTypeChange}
            required
          >
            <option value="">Select Product Type</option>
            <option value="Secured">Secured</option>
            <option value="Unsecured">Unsecured</option>
          </select>
        </div>

        <div className="borrowerregion">
        <label>Borrower region:</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="North"
              checked={Borrowerregion.includes('North')}
              onChange={handleBorrowerregionChange}
            />
            North
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="South"
              checked={Borrowerregion.includes('South')}
              onChange={handleBorrowerregionChange}
            />
            South
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="East"
              checked={Borrowerregion.includes('East')}
              onChange={handleBorrowerregionChange}
            />
            East
          </label>
        </div><div>
          <label>
            <input
              type="checkbox"
              value="West"
              checked={Borrowerregion.includes('West')}
              onChange={handleBorrowerregionChange}
            />
            West
          </label>
        </div>
        </div>
      
        <div>
          <label htmlFor="products">Products:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="Auto Loan"
                checked={products.includes('Auto Loan')}
                onChange={handleProductChange}
              />
              Auto Loan
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="Two wheeler loan"
                checked={products.includes('Two wheeler loan')}
                onChange={handleProductChange}
              />
              Two Wheeler Loan
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="Gold Loan"
                checked={products.includes('Gold Loan')}
                onChange={handleProductChange}
              />
              Gold Loan
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="MFI"
                checked={products.includes('MFI')}
                onChange={handleProductChange}
              />
              MFI
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="Commercial Vehicle"
                checked={products.includes('Commercial Vehicle')}
                onChange={handleProductChange}
              />
              Commercial Vehicle
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="MSME"
                checked={products.includes('MSME')}
                onChange={handleProductChange}
              />
              MSME
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="LAP"
                checked={products.includes('LAP')}
                onChange={handleProductChange}
              />
              LAP
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="Personal Loan"
                checked={products.includes('Personal Loan')}
                onChange={handleProductChange}
              />
              Personal Loan
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="Agriculture Loans"
                checked={products.includes('Agriculture Loans')}
                onChange={handleProductChange}
              />
              Agriculture Loans
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
        </div>

        <div>
          <label htmlFor="creditRating">Minimum Credit Rating:</label>
          <select
            id="creditRating"
            value={mincreditRating}
            onChange={handleminCreditRatingChange}
            required
          >
            <option value="">Select Credit Rating</option>
            <option value="AAA">AAA</option>
            <option value="AA">AA</option>
            <option value="A">A</option>
            <option value="BBB">BBB</option>
            <option value="BB">BB</option>
            <option value="B">B</option>
            <option value="Not Rated">Not Rated</option>
          </select>
        </div>

        <div>
          <label htmlFor="aum">AUM ( in crores):</label>
          <input
            type="decimal"
            id="aum"
            value={aum}
            onChange={handleAumChange}
            required
          />
        </div>

        <div>
          <label htmlFor="minLoanAmount">Minimum Loan Amount (in crores):</label>
          <input
            type="decimal"
            id="minLoanAmount"
            value={minLoanAmount}
            onChange={handleMinLoanAmountChange}
            required
          />
        </div>

        <div>
          <label htmlFor="maxLoanAmount">Maximum Loan Amount (in crores):</label>
          <input
            type="decimal"
            id="maxLoanAmount"
            value={maxLoanAmount}
            onChange={handleMaxLoanAmountChange}
            required
          />
        </div>

        <div>
          <label htmlFor="minInterestRate">Minimum Interest Rate (%):</label>
          <input
            type="decimal"
            id="minInterestRate"
            value={minInterestRate}
            onChange={handleminInterestRateChange}
            required
          />
        </div>

        {showMfiGrading && (
          <div>
            <label htmlFor="mfiGrading">MFI Grading:</label>
            <select
              id="mfiGrading"
              value={mfiGrading}
              onChange={handleMfiGradingChange}
              required
            >
              <option value="">Select MFI Grading</option>
              <option value="mfR1">mfR1</option>
              <option value="mfR2">mfR2</option>
              <option value="mfR3">mfR3</option>
              <option value="mfR4">mfR4</option>
              <option value="mfR5">mfR5</option>
              <option value="mfR6">mfR6</option>
              <option value="mfR7">mfR7</option>
              <option value="mfR8">mfR8</option>
              <option value="Not Graded">Not Graded</option>
            </select>
          </div>
        )}


      <button type="submit">Submit</button>
    </form>
   
    </div>
  );
};

export default Lender;
