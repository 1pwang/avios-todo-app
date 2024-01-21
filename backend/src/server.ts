import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', todoRoutes);


const PORT = process.env.PORT || 9091;
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server started. Port ${PORT}`);
});


export default app;
