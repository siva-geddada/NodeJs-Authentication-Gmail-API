const mongoose = require('mongoose')
/* To Connect MongoDBAtlas DataBase */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}


/* To Connect Local DataBase */

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log(`MongoDB Connected`)
//   })
//   .catch((err) => console.log(err.message))

// mongoose.connection.on('dsiconnected', () => {
//     console.log(`MongoDB Disconnected: ${conn.connection.host}`);
// })

// process.on('SIGINT', async () => {
//     await mongoose.connection.close()
//     process.exit(0)
// })

module.exports = connectDB