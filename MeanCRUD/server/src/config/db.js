const mongoose = require('mongoose');



var url = `mongodb://localhost:27017/mydb`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
      console.log('MongoDb Connected');
    })
  .catch(error => {
      console.log('Failed to connect MongoDB ', error);
    })
module.exports = mongoose
