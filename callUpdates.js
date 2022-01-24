const request = require('request-promise')

async function doWork() {
  try {
    let options = {
      uri: 'http://52.90.250.211:8080/api/v1/updateAssets',
      headers: {
        'Authorization': 'Basic QTdEQTlBMDUwNzMxMTE3MDBFNDcyMTEwODBCOUE5RkEyMzFFNjMyMDhEMTc0NjQ1MEJGMkZDREVCNTU4OTlFQTowQTZDMkQyMkYxNDcwOTNFQ0NERUFFMzE4MTQ5NUE2RjUyNkUzREI1NzBDMkVFQTkzREI5QzEwOEZBQkNFOTc5'
      }
    }
    console.log('updating assets...')
    const done1 = await request(options)

    options.uri = 'http://52.90.250.211:8080/api/v1/updatePairs'


    console.log('updating pairs...')
    const done2 = await request(options)

    console.log('done')
  } catch(ex) {
    console.log(ex)
  }
}

doWork()