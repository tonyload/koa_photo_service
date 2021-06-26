const mongoose = require('mongoose')
const {name} = require('./db').db
async function connect () {
  mongoose.set('useCreateIndex', true)  
  await mongoose.connect(name,{ useNewUrlParser: true,useUnifiedTopology:true }).then(res => {
    console.log('数据库连接成功')
  })
}

async function close () {
  await mongoose.connection.close()
}
module.exports = {
  mongoose,
  connect,
  close
}