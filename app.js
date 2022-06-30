const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000
const open = require('open')
const { BrowserWindow } = require('electron')



const { invoiceDir } = require('./directories')

var count = 0

/* Home Path 
const homeDir = require('os').homedir()
const newDir = homeDir + '\\.is2-solutions\\invoices'
*/

// PDF
const pdf = require('pdf-creator-node')
const fs = require('fs')
const html = fs.readFileSync('template.html', 'utf8')

// PDF General Settings
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


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))

//app.use(express.static(path.join(__dirname, 'reports')));

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/open', async (req, res) => {
  console.log(count)

  /* Data to PDF */
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
  
  /* Config Document */
  var document = {
    html: html,
    data: {
      users: users,
    },
    path: invoiceDir + `\\output${count}.pdf`,
    type: "",
  };
  
  /* Create Document */
  try {
    await pdf.create(document, options)
    renderWindowsPdf(count)
  } catch (err) {
    console.log(err)
  }

  

/*   pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  }); */

  count++

  //await open('http://localhost:3000/openpdf')
  res.redirect('/')
})

async function renderWindowsPdf(currentCount) {
  /* Open PDF */
  let win = new BrowserWindow({
    webPreferences: {
      plugins: true
    }
  })
  
  try {
    await win.loadURL(invoiceDir + `\\output${currentCount}.pdf`)
  } catch (e) {
    console.log(e)
  }
  
}

/*
app.get('/openpdf', (req, res, next) => {
  
  next()

  //res.sendFile('./reports/output.pdf', { root: __dirname }) 
})
*/

app.listen(port, () => {
  //initDirectory()
  console.log('Server on port', port)
})
