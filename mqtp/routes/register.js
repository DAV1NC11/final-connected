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
  const { name, email, password } = req.body;

  sql.connect(config, (err) => {
    if (err) {
      console.error('Error connecting to SQL Server: ', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const query = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
    const request = new sql.Request();

    request.query(query, (err) => {
      if (err) {
        console.error('Error executing SQL query: ', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(200).json({ message: 'Registration successful' });
    });
  });
});

module.exports = router;
