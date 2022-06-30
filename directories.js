const fs = require('fs')
/* Home Path */
const homeDir = require('os').homedir()

const invoiceDir = homeDir + '\\.is2-solutions\\invoices'
const reportsDir = homeDir + '\\.is2-solutions\\reports'

/* Create Invoices Directory */
if (!fs.existsSync(invoiceDir)) {
  fs.mkdirSync(invoiceDir, { recursive: true })
}

/* Create Reports Directory */
if(!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true })
}

module.exports = { invoiceDir }