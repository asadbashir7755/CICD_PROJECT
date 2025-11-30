import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import userRouter from './routes/user.js';
import errorMiddleware from './middlewares/error-middleware.js';
import passport from './config/passport.js';
import session from 'express-session';
import { FRONTEND_URL, NODE_ENV } from './config/utils.js';

const app = express();

const allowedOrigins = [FRONTEND_URL as string];
if (NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000');
  allowedOrigins.push('http://localhost:5173');
}

app.use(
  cors({
    // In production, strictly allow only FRONTEND_URL. In dev, allow localhost too.
    // If FRONTEND_URL is not set (dev only), fall back to allowing all (or handle as needed)
    origin: FRONTEND_URL ? allowedOrigins : true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// API route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Yay!! Backend of wanderlust app is now accessible');
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: '!Oops page not found',
  });
});

app.use(errorMiddleware);
export default app;
