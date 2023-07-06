const express = require('express');
const router = express.Router();
const sql = require('mssql');

const config = {
  user: 'johnchaga', // Replace with your username
  password: 'Chaga@2019', // Replace with your password
  server: 'mqtp.database.windows.net', // Replace with your server name
  database: 'connectedmqtp', // Replace with your database name
  options: {
    encrypt: true, // Enable encryption
    trustServerCertificate: false // Change to true if using a self-signed certificate
  }
};

router.post('/', (req, res) => {
  const { email, password } = req.body;

  sql.connect(config, (err) => {
    if (err) {
      console.error('Error connecting to SQL Server: ', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    const request = new sql.Request();

    request.query(query, (err, result) => {
      if (err) {
        console.error('Error executing SQL query: ', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      if (result.recordset.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
});

module.exports = router;
