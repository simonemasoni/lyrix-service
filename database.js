let mongoose = require('mongoose');

const username = "ldadmin";
const password = "CQRuqJajZh79QiT";
const server = `mongodb://${username}:${password}@beta-ld-shard-00-00-q88kd.mongodb.net:27017,beta-ld-shard-00-01-q88kd.mongodb.net:27017,beta-ld-shard-00-02-q88kd.mongodb.net:27017/admin?ssl=true&replicaSet=beta-ld-shard-0&authSource=admin&retryWrites=true&w=majority`; // REPLACE WITH YOUR DB SERVER
const database = 'lyrix';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb+srv://ldadmin:${password}@beta-ld-q88kd.mongodb.net/lyrix?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology:true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error ' + err)
       }).catch(err => {
            console.error(err);
       });
  }
}

module.exports = new Database()