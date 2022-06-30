const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000
const open = require('open')

// -- Temporary Comment

const { BrowserWindow } = require('electron')

const { invoiceDir } = require('./directories')

var count = 0

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
    // -- Temporary Comment 
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

  // Abrir en navegador por default
  /* await open(invoiceDir + `\\output${count}.pdf`, 
  {
    app: {
      name: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
    }
  })
  */

  // Abrir en Gestor de Archivos PDF
  //await open(invoiceDir + `\\output${count}.pdf`)


  count++

  res.redirect('/')
})

// -------------------- RENDER PDF IN A ELECTRON WINDOWS ----------------- //
async function renderWindowsPdf(currentCount) {
  
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

app.listen(port, () => {
  console.log('Server on port', port)
})
