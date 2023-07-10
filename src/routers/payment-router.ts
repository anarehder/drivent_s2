import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPayments, postPayments } from '@/controllers';

const paymentRouter = Router();

paymentRouter.all('/*', authenticateToken).get('/', getPayments).post('/process', postPayments);

export { paymentRouter };
