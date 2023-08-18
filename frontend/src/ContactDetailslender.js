import React, { useEffect, useState } from 'react'
// import './Borrower.css';
import './ContactDetails.css';
import Axios from 'axios';
import { regions } from './Borrower';
const Contactdetaileslender = () => {
  const [lenders, setLenders] = useState([]);
  const [selectedLender, setSelectedLender] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [mailType, setMailType] = useState('');
  const [designation, setDesignation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const [contactDetails, setContactDetails] = useState([]);

  const handleSubmit = (event) => {
    const msg="Contact detailes submited successfully to "+ selectedLender;
    alert(selectedLender);
    event.preventDefault();
    try {
      
  

     Axios.post("http://localhost:3001/api/contactslender", {
      id: selectedLender,
      name: name,
      emailAddress: emailAddress,
      mailType: mailType,
      designation: designation,
      mobileNumber: mobileNumber,
      region: region,
      
    }, {
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      
      
      console.log('Response:', response.data);

     
      setSelectedLender('');
      setName('');
      setEmail('');
      setMailType('');
      setDesignation('');
      setMobileNumber('');
      setRegion('');
      alert("details submitted");

      
      console.log('Contact details submitted successfully!');
    });
    } catch (error) {
      
      console.error('Error submitting contact data:', error);
     
    }
  }


  useEffect(() => {
    Axios.get("http://localhost:3001/api/List_lenders")
      .then(response => {
        setLenders(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch contact details for the specific borrowerId
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/api/contact-details-lender/${selectedLender}`);
        setContactDetails(response.data);
        console.log(response.data);
        console.log(selectedLender);
      } catch (error) {
        console.log('Error fetching contact details:', error);
      }
    };

    fetchData();
  }, [selectedLender]);

  const handleDeleteContact = (contactname,contactmobilenumber) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this contact detail?');
    // Send a DELETE request to the backend API to delete the contact detail
    if(shouldDelete){
    Axios.delete(`http://localhost:3001/api/contactdetailslender/${contactmobilenumber}`)
      .then((response) => {
        // Remove the deleted contact detail from the state
        setContactDetails(contactDetails.filter((contact) => contact.name !== contactname));
        console.log('Lender Contact detail deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting Lender contact detail:', error);
      });
    }
  };

  const handleselectchange = event => {
    setSelectedLender(event.target.value);
  };
  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    
  };
  return (
    <>
    <div className="contacts">
      <div className="formdiv">
      <div className='Contact'><h1>Contact Details</h1></div>
      <form className='form'>
        <div className='contactform'>
          <label >Lender Name</label>
          <select className='companys' value={selectedLender} onChange={handleselectchange}>
            <option value="">select the name of Lender</option>
            {lenders.map(lender => (
          <option key={lender.id} value={lender.id}>
            {lender.name}
          </option>
        ))}
          </select>
          <div>
        <label htmlFor="name">Name of person:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
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
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={emailAddress}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="mailType">TO/CC:</label>
        <select
          id="mailType"
          value={mailType}
          onChange={(event) => setMailType(event.target.value)}
          required
        >
          <option value="">Select an option</option>
          <option value="TO">TO</option>
          <option value="CC">CC</option>
        </select>
      </div>
      <div>
        <label htmlFor="designation">Designation:</label>
        <input
          type="text"
          id="designation"
          value={designation}
          onChange={(event) => setDesignation(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="tel"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
          required
        />
      </div>
        <br></br>
      <div className='Update'></div>
          <button type='submit' onClick={handleSubmit}>Submit contact details</button>
      </div>
      </form >
      </div>

      <div className="showcontacts">
        <div><h1>Existing contacts</h1></div>
      <table id="contactstable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Region</th>
          <th>Email</th>
          <th>TO/CC</th>
          <th>Designation</th>
          <th>Mobile Number</th>
          <th>Delete Contact</th>
        </tr>
      </thead>
      <tbody>
        {contactDetails.map((contact) => (
          <tr key={contact.mobileNumber}>
            <td>{contact.name}</td>
            <td>{contact.region}</td>
            <td>{contact.emailAddress}</td>
            <td>{contact.mailType}</td>
            <td>{contact.designation}</td>
            <td>{contact.mobileNumber}</td>
            <td>
                <button onClick={() => handleDeleteContact(contact.name,contact.mobileNumber)}>Delete</button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    {contactDetails.length===0 && 
      <div><b>There is no existing contact details for this lender</b></div>
      }
      </div>
      </div>
    </>
  )
}
export default Contactdetaileslender