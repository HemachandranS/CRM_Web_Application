import React, { useState } from 'react';
import Axios from 'axios';
// import './Borrower.css';

export const regions = ['North', 'South', 'East', 'West'];
export const entityTypes = ['Proprietorship', 'Partnership Firm', 'Company', 'Trust', 'Society'];

export const statesByRegion = {
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

export const citiesByState = {
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
 
const Borrower = () => {
  const [entityType, setEntityType] = useState('');
  const [cin, setCIN] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [loanTypes, setLoanTypes] = useState([]);
  const [owner, setOwner] = useState('');
  const [productType, setProductType] = useState('');
  const [products, setProducts] = useState([]);
  const [creditRating, setCreditRating] = useState('');
  const [quarterAUM, setQuarterAUM] = useState('');       
  const [financialYearAUM, setFinancialYearAUM] = useState('');
  const [aum, setAum] = useState('');
  const [maxInterestRate, setMaxInterestRate] = useState('');
  const [minLoanAmount, setMinLoanAmount] = useState('');
  const [mfiGrading, setMfiGrading] = useState('');
  const [showMfiGrading, setShowMfiGrading] = useState(false);

  const handleEntityTypeChange = (event) => {
    const selectedEntityType = event.target.value;
    setEntityType(selectedEntityType);
  };

  const handleCINChange = (event) => {
    const enteredCIN = event.target.value;
    setCIN(enteredCIN);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleOwnerChange = (event) => {
    setOwner(event.target.value);
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

  const handleCreditRatingChange = (event) => {
    setCreditRating(event.target.value);
  };
 
  const handleFinancialYearAUMchange = (event) => {
    const FinancialYearAUM = event.target.value;
    setFinancialYearAUM(FinancialYearAUM);
  };

  const handleQuarterAUMchange = (event) => {
    const quarterAUM = event.target.value;
    setQuarterAUM(quarterAUM);
  };

  const handleAumChange = (event) => {
    setAum(event.target.value);
  };

  const handleMaxInterestRateChange = (event) => {
    setMaxInterestRate(event.target.value);
  };

  const handleMinLoanAmountChange = (event) => {
    setMinLoanAmount(event.target.value);
  };

  const handleMfiGradingChange = (event) => {
    setMfiGrading(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend API
  

     Axios.post("http://localhost:3001/api/borrower", {
      entityType: entityType,
      cin: cin,
      name: name,
      region: region,
      state: state,
      city: city,
      loanTypes: loanTypes,
      owner:owner,
      productType: productType,
      products: products,
      creditRating: creditRating,
      financialYearAUM: financialYearAUM,
      quarterAUM: quarterAUM,
      aum: aum,
      maxInterestRate: maxInterestRate,
      minLoanAmount: minLoanAmount,
      mfiGrading: mfiGrading,
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
      setEntityType('');
      setCIN('');
      setOwner('');
      setProductType('');
      setProducts([]);
      setCreditRating('');
      setQuarterAUM('');
      setAum('');
      setMaxInterestRate('');
      setMinLoanAmount('');
      setMfiGrading('');
      alert("details submitted");

      // Display success message or perform other actions
      console.log('Borrower data submitted successfully!');
    });
    } catch (error) {
      // Handle error response
      console.error('Error submitting borrower data:', error);
      // Display error message or perform other actions
    }

    // Reset form fields
    
  };

  return (
    <div id="form">
      <div className="borrowers_details">Borrower's Details</div>
    <form onSubmit={handleSubmit}>
   
    <div id="entityType">
        <label htmlFor="entityType">Entity Type:</label>
        <select
          
          value={entityType}
          onChange={handleEntityTypeChange}
          required
        >
          <option value="">Select entity type</option>
          {entityTypes.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    {entityType === 'Company' && (
        <div id="cin">
          <label htmlFor="cin">CIN:</label>
          <input
            type="text"
            value={cin}
            onChange={handleCINChange}
            required={entityType === 'Company'}
          />
        </div>
      )}
      
      <div id="name">
        <label htmlFor="name">Name of borrower:</label>
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
              value="Term Loan"
              checked={loanTypes.includes('Term Loan')}
              onChange={handleLoanTypeChange}
            />
            Term Loan
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="BC"
              checked={loanTypes.includes('BC')}
              onChange={handleLoanTypeChange}
            />
            BC
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="PTC"
              checked={loanTypes.includes('PTC')}
              onChange={handleLoanTypeChange}
            />
            PTC
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="DA"
              checked={loanTypes.includes('DA')}
              onChange={handleLoanTypeChange}
            />
            DA
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Venture Debt"
              checked={loanTypes.includes('Venture Debt')}
              onChange={handleLoanTypeChange}
            />
            Venture Debt
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Other type"
              checked={loanTypes.includes('Other type')}
              onChange={handleLoanTypeChange}
            />
            Other type 
          </label>
        </div>
      </div>

      <div id="Owner_name">
        <label htmlFor="Ownername">Owner of borrower:</label>
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
          <label htmlFor="creditRating">Credit Rating:</label>
          <select
            id="creditRating"
            value={creditRating}
            onChange={handleCreditRatingChange}
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
          <label htmlFor="Financial Year">Financial year for AUM</label>
          <select
            id="FinancialYearAUM"
            value={financialYearAUM}
            onChange={handleFinancialYearAUMchange}
            required
          >
            <option value="">financial year</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
            <option value="2027-2028">2027-2028</option>
            <option value="2028-2029">2028-2029</option>
            <option value="2029-2030">2029-2030</option>
            <option value="2030-2031">2030-2031</option>
            <option value="2031-2032">2031-2032</option>
            <option value="2032-2033">2032-2033</option>
          </select>
        </div>
        <div>
          <label htmlFor="QuarterAUM">Quarte of year for AUM</label>
          <select
            id="QuarterAUM"
            value={quarterAUM}
            onChange={handleQuarterAUMchange}
            required
          >
            <option value="">quarter of year</option>
            <option value="march">march</option>
            <option value="june">june</option>
            <option value="september">september</option>
            <option value="december">december</option>

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
          <label htmlFor="maxInterestRate">Maximum Interest Rate (%):</label>
          <input
            type="decimal"
            id="maxInterestRate"
            value={maxInterestRate}
            onChange={handleMaxInterestRateChange}
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

        {/* Show MFI Grading field only if MFI is chosen as entity type */}
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

export default Borrower;
