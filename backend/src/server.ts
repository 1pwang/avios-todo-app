import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import mongoose, {mongo} from "mongoose";
import { MongoClientOptions } from 'mongodb';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', todoRoutes);

const mongo_URL = 'mongodb+srv://paulinewang222:nfzaC54scBtUqt30@cluster0.mywzxrj.mongodb.net/?retryWrites=true&w=majority'

mongoose
    .connect(mongo_URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });


const PORT = process.env.PORT || 9091;
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server started. Port ${PORT}`);
});


export default app;
