const config = require('../config')
const redis = require('redis');

const RedisClient = redis.createClient({
  //url: `redis://874ec05192d44f5a8d4e2a3e94515ab6@eu1-fast-poodle-35837.upstash.io:35837`
  url: `redis://127.0.0.1:6379`
})

const connect = async () => {
  try {

    let connected = false
    try {
      const pong = await RedisClient.ping()
      if(pong == 'PONG') {
        connected = true
      }
    } catch(ex) {
      console.log(ex)
    }

    if(!connected) {
      await RedisClient.connect();
    }

    return RedisClient
  } catch (ex) {
    console.log(ex)
  }
}

module.exports = {
  connect
}
