import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', todoRoutes);

export default app;
