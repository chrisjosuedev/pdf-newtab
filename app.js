const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000
const open = require('open')
const path = require('path')

var count = 1

// PDF
const pdf = require('pdf-creator-node')
const fs = require('fs')
const html = fs.readFileSync('template.html', 'utf8')

// PDF Settings
const options = {
  format: "Letter",
  orientation: "portrait",
  border: "10mm",
  header: {
      height: "45mm",
      contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
  },
  footer: {
      height: "28mm",
      contents: {
          first: 'Cover page',
          2: 'Second page', // Any page number is working. 1-based index
          default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
      }
  }
}

var users = [
  {
    name: "Shyam",
    age: "26",
  },
  {
    name: "Navjot",
    age: "26",
  },
  {
    name: "Vitthal",
    age: "26",
  },
];

var document = {
  html: html,
  data: {
    users: users,
  },
  path: "./reports/output.pdf",
  type: "",
};

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))

//app.use(express.static(path.join(__dirname, 'reports')));

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/open', async (req, res) => {
  console.log(req.body.name)
  
  try {
    await pdf.create(document, options)
  } catch (err) {
    console.log(err)
  }
  
  await open('http://localhost:3000/openpdf')
  res.redirect('/')
})

app.get('/openpdf', (req, res) => {
  res.sendFile('./reports/output.pdf', { root: __dirname }) 
})

app.listen(port, () => {
  console.log('Server on port', port)
})
