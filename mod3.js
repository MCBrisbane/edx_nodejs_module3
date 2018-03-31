const mongodb= require('mongodb')
const async = require('async')

const userBlockCount = parseInt(process.argv[2], 10) || 1000
const url = 'mongodb://localhost:27017/custdb'

// Data files to import
const customers = require('./m3-customer-data.json')
const customerAddresses = require('./m3-customer-address-data.json')

let taskGroups = []

mongodb.MongoClient.connect(url, (error, database) => {
  if (error) return process.exit(1)

  // Need this to avoid 'course is not defined' error
  var db=database.db('custdb');  

  customers.forEach((customer, index, list) => {
    customers[index] = Object.assign(customer, customerAddresses[index])

    // 'mod' the counter to get break point for taskGroup array
    if (index % userBlockCount == 0) {
      const procStart = index
      var procEnd = 0

      if((procStart + userBlockCount) > customers.length) {
        procEnd = customers.length - 1 }
      else  {
        procEnd = procStart + userBlockCount }


      taskGroups.push((done) => {
        console.log(`Processing ${procStart}-${procEnd} out of ${customers.length}`)
        db.collection('customers').insert(customers.slice(procStart, procEnd), (error, results) => {
          done(error, results)
        })
      })
    } 
  })
  
  console.log(`Async start: ${taskGroups.length} parallel task(s)`)
  const sTime = Date.now()
  
  async.parallel(taskGroups, (error, results) => {
    if (error) console.error(error)
    const eTime = Date.now()
    console.log(`Performance (ms): Start: ${sTime} End: ${eTime} Elapsed: ${eTime-sTime}`)
    database.close()
  })
})

