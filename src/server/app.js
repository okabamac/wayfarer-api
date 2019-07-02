import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoute from '../routes/user.route';

const app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use('/api/v1/users', userRoute);
app.use('*', (req, res) => {
 return res.status(404).json({
    status: 404,
    error: "Sorry, we couldn't find that!",
  });
});

export default app;
