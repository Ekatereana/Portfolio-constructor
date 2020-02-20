'use strict'

const fs = require('fs')

fs.readFile('example.js', (err, data) => {
  console.log(data.toString())
  if (err) return console.error(err)
})
