import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
  next();
})
const puerto = 8080;

const headersList = {
  "Accept": "*/*",
  'Content-Type': 'application/json',
  "X-VTEX-API-AppToken": process.env.TOKEN,
  "X-VTEX-API-AppKey": process.env.KEY
}

app.get('/', (req, res) => {
  res.json('SaulDev');
})
app.post('/api/mexist', async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const response = await fetch(`${process.env.HOST}/api/dataentities/${process.env.ENTITY}/search?_where=email=${email}`, {
    method: "GET",
    headers: headersList
  });
  const data = await response.text();
  res.json(JSON.parse(data));
})
app.post('/api/saveMail', async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const response = await fetch(`${process.env.HOST}/api/dataentities/${process.env.ENTITY}/documents`, {
    method: "POST",
    body: JSON.stringify({
      email
    }),
    headers: {
      "content-type": "application/json",
      "accept": "application/vnd.vtex.ds.v10+json"
    }
  });
  const data = await response.text();
  res.json(JSON.parse(data));
})

app.post('/api/uptch', async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const response = await fetch(`${process.env.HOST}/api/dataentities/${process.env.ENTITY}/documents`, {
    method: "PATCH",
    body: JSON.stringify({
      email,
      isNewsletterOptIn: true
    }),
    headers: {
      "content-type": "application/json",
      "accept": "application/vnd.vtex.ds.v10+json"
    }
  });
  const data = await response.text();
  res.json(JSON.parse(data));
})

const server = app.listen(puerto, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server jalando en el puerto: ${server.address().port}`);
})
