import express from 'express';
import cors from 'cors';
import { kakaoLoginHandler, refreshTokenHandler } from './routes/kakao';

const app = express();
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'] }));
app.use(express.json());

app.post('/kakao-login', kakaoLoginHandler);      // Promise<Response> 허용됨
app.post('/refresh-token', refreshTokenHandler);  // Promise<Response> 허용됨

export default app;
