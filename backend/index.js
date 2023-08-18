const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors=require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL Connection Pool Configuration
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'abcd',
  database: 'express_rupya',
});

// API endpoint for storing borrower data
app.post("/api/borrower", (req, res) => {
  const { name, region, state, city, loanTypes, entityType, cin, owner,productType,products,creditRating,aum,maxInterestRate, minLoanAmount, mfiGrading, quarterAUM, financialYearAUM} = req.body;

  // Perform the database query to store the data
  const query = `
  INSERT INTO borrowers (
    name,
    region,
    state,
    city,
    entityType,
    cin,
    loanTypes,
    owner,
    productType,
    products,
    creditRating,
    aum,
    maxInterestRate,
    minLoanAmount,
    mfiGrading,
    quarterAUM,
    financialYearAUM
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      res.status(500).json({ error: 'An error occurred while connecting to the database.' });
      return;
    }

    connection.query(query, [name, region, state, city, entityType, cin, JSON.stringify(loanTypes), owner, productType,
      JSON.stringify(products),
      creditRating,
      aum,
      maxInterestRate,
      minLoanAmount,
      mfiGrading,
      quarterAUM,
      financialYearAUM], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error storing borrower data: ' + err.stack);
        res.status(500).json({ error: 'An error occurred while storing borrower data.' });
      } else {
        console.log('Borrower data stored successfully.');
        res.status(200).json({ message: 'Borrower data stored successfully.' });
      }
    });
  });
});

app.get('/retriveName',(req,res)=>{
  
 
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const query = 'SELECT id, name FROM borrowers';

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});

app.post('/api/contactsborrower', (req, res) => {
  const { id, name, emailAddress, mailType, designation, mobileNumber, region} = req.body;

  // Perform the database query to store the data
  const query = `INSERT INTO contactdetailsborrower (id, name, emailAddress, mailType, designation, mobileNumber, region) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      res.status(500).json({ error: 'An error occurred while connecting to the database.' });
      return;
    }

    connection.query(query, [id, name, emailAddress, mailType, designation, mobileNumber, region], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error storing contacts data: ' + err.stack);
        res.status(500).json({ error: 'An error occurred while storing contacts data.' });
      } else {
        console.log('contacts data stored successfully.');
        res.status(200).json({ message: 'contact details stored successfully.' });
      }
    });
  });
});

app.get('/api/contact-details-borrower/:selectedBorrower', (req, res) => {
  const selectedBorrower = req.params.selectedBorrower;
  console.log(selectedBorrower+"hi");

  const query = `SELECT * FROM contactdetailsborrower WHERE id = ${selectedBorrower}`;

  pool.query(query, (error, results) => {
    if (error) {
      console.log('Error fetching contact details:', error);
      res.status(500).json({ error: 'Error fetching contact details' });
    } else {
      res.json(results);
    }
  });
});

app.delete('/api/contactdetailsborrower/:phone', (req, res) => {
  // const name = req.params.id;
  const phone = req.params.phone;

  // Perform the database delete operation
  const deleteQuery = 'DELETE FROM contactdetailsborrower WHERE  mobileNumber = ?';
  pool.query(deleteQuery, [phone], (err, result) => {
    if (err) {
      console.error('Error deleting contact detail:', err);
      res.status(500).json({ error: 'Error deleting contact detail' });
    } else {
      console.log('Contact detail deleted successfully in server');
      res.status(200).json({ message: 'Contact detail deleted successfully' });
    }
  });
});

app.get('/api/contact-details-lender/:selectedBorrower', (req, res) => {
  const selectedBorrower = req.params.selectedBorrower;
  // console.log(selectedBorrower+"hi");

  const query = `SELECT * FROM contactdetailslender WHERE id = ${selectedBorrower}`;

  pool.query(query, (error, results) => {
    if (error) {
      console.log('Error fetching contact details:', error);
      res.status(500).json({ error: 'Error fetching contact details' });
    } else {
      res.json(results);
    }
  });
});


app.delete('/api/contactdetailslender/:phone', (req, res) => {
  // const name = req.params.id;
  const phone = req.params.phone;

  // Perform the database delete operation
  const deleteQuery = 'DELETE FROM contactdetailslender WHERE  mobileNumber = ?';
  pool.query(deleteQuery, [phone], (err, result) => {
    if (err) {
      console.error('Error deleting contact detail:', err);
      res.status(500).json({ error: 'Error deleting contact detail' });
    } else {
      console.log('Contact detail deleted successfully in server');
      res.status(200).json({ message: 'Contact detail deleted successfully' });
    }
  });
});

app.post("/api/lender", (req, res) => {
  const { name, region, state, city, loanTypes, owner, productType, products, mincreditRating, minInterestRate, mfiGrading, aum, minLoanAmount, maxLoanAmount, Borrowerregion} = req.body;

  // Perform the database query to store the data
  const query = `INSERT INTO lenders (name, region, state, city, loanTypes, owner, productType, products, mincreditRating, minInterestRate, mfiGrading, aum, minLoanAmount, maxLoanAmount, Borrowerregion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      res.status(500).json({ error: 'An error occurred while connecting to the database.' });
      return;
    }

    connection.query(query, [name, region, state, city, JSON.stringify(loanTypes), owner, productType,
      JSON.stringify(products),
      mincreditRating, minInterestRate, mfiGrading, aum, minLoanAmount, maxLoanAmount, JSON.stringify(Borrowerregion)], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error storing Lender data: ' + err.stack);
        res.status(500).json({ error: 'An error occurred while storing lender data.' });
      } else {
        console.log('Lender data stored successfully.');
        res.status(200).json({ message: 'Lender data stored successfully.' });
      }
    });
  });
});

app.get('/api/List_borrowers', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const query = 'SELECT * FROM borrowers';

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});

app.get('/api/List_Lenders', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const query = 'SELECT * FROM lenders';

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});

app.post('/api/contactslender', (req, res) => {
  const { id, name, emailAddress, mailType, designation, mobileNumber, region} = req.body;

  // Perform the database query to store the data
  const query = `INSERT INTO contactdetailslender (id, name, emailAddress, mailType, designation, mobileNumber, region) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      res.status(500).json({ error: 'An error occurred while connecting to the database.' });
      return;
    }

    connection.query(query, [id, name, emailAddress, mailType, designation, mobileNumber, region], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error storing contacts data: ' + err.stack);
        res.status(500).json({ error: 'An error occurred while storing contacts data.' });
      } else {
        console.log('contacts data stored successfully.');
        res.status(200).json({ message: 'contact details stored successfully.' });
      }
    });
  });
});

app.put('/api/borrowers/:id', (req, res) => {
  const borrowerId = req.params.id;
  const updatedBorrower = req.body;

  // Perform the database update
  const updateQuery = `
    UPDATE borrowers
    SET
      name = ?,
      region = ?,
      state = ?,
      city = ?,
      entityType = ?,
      cin = ?,
      loanTypes = ?,
      owner = ?,
      productType = ?,
      products = ?,
      creditRating = ?,
      aum = ?,
      maxInterestRate = ?,
      minLoanAmount = ?,
      mfiGrading = ?,
      quarterAUM = ?,
      financialYearAUM = ?
    WHERE id = ?
  `;

  const queryParams = [
    updatedBorrower.name,
    updatedBorrower.region,
    updatedBorrower.state,
    updatedBorrower.city,
    updatedBorrower.entityType,
    updatedBorrower.cin,
    updatedBorrower.loanTypes,
    updatedBorrower.owner,
    updatedBorrower.productType,
    updatedBorrower.products,
    updatedBorrower.creditRating,
    updatedBorrower.aum,
    updatedBorrower.maxInterestRate,
    updatedBorrower.minLoanAmount,
    updatedBorrower.mfiGrading,
    updatedBorrower.QuarterAUM,
    updatedBorrower.financialYearAUM,
    borrowerId, // Borrower ID is used as the last parameter in the query
  ];

  pool.query(updateQuery, queryParams, (err, result) => {
    if (err) {
      console.error('Error updating borrower:', err);
      res.status(500).json({ error: 'Error updating borrower' });
    } else {
      console.log('Borrower updated successfully');
      res.status(200).json({ message: 'Borrower updated successfully' });
    }
  });
});

app.put('/api/lenders/:id', (req, res) => {
  const lenderId = req.params.id;
  const updatedLender = req.body;

  // Perform the database update
  const updateQuery = `
    UPDATE lenders
    SET
      name = ?,
      region = ?,
      state = ?,
      city = ?,
      loanTypes = ?,
      owner = ?,
      productType = ?,
      products = ?,
      minCreditRating = ?,
      minInterestRate = ?,
      aum=?,
      minLoanAmount = ?,
      maxLoanAmount = ?,
      Borrowerregion = ?
    WHERE id = ?
  `;

  const queryParams = [
    updatedLender.name,
    updatedLender.region,
    updatedLender.state,
    updatedLender.city,
    updatedLender.loanTypes,
    updatedLender.owner,
    updatedLender.productType,
    updatedLender.products,
    updatedLender.minCreditRating,
    updatedLender.minInterestRate,
    updatedLender.aum,
    updatedLender.minLoanAmount,
    updatedLender.maxLoanAmount,
    updatedLender.Borrowerregion,
    lenderId, // Lender ID is used as the last parameter in the query
  ];

  pool.query(updateQuery, queryParams, (err, result) => {
    if (err) {
      console.error('Error updating lender:', err);
      res.status(500).json({ error: 'Error updating lender' });
    } else {
      console.log('Lender updated successfully');
      res.status(200).json({ message: 'Lender updated successfully' });
    }
  });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
