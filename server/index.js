const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_entries_QUERY = 'SELECT * FROM entries';

const connection = mysql.createConnection({
    host: '35.228.67.196',
    user: 'app',
    password: '2CXJhjTw',
    database: 'contactbook'
})

connection.connect(err => {
    if(err) {
        return err;
    }
})

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /entries to see entries')
})

app.get('/entries/add', (req, res) => {
    const { contactName, phoneNumber } = req.query;
    const INSERT_CONTACTS_QUERY = `INSERT INTO entries (contactName, phoneNumber) values ('${contactName}', '${phoneNumber}')`;
    connection.query(INSERT_CONTACTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('added')
        }
    })
})

app.get('/entries', (req, res) => {
    connection.query(SELECT_ALL_entries_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.listen(4000, () => {
    console.log(`entries server on port 4000`)
})