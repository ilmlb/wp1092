import mongoose from 'mongoose';

function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db = mongoose.connection;
  // db.dropDatabase();
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('mongo connected!');
  });
}

const mongo = {
  connect: connectMongo,
};

export default mongo;
