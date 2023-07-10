import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payment-service';

export async function getPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.userId);
    if (!req.query.ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const ticketId = Number(req.query.ticketId);
    const payment = await paymentService.getPaymentsService(ticketId, userId);
    console.log('pagamento', payment);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.userId);
    const { ticketId, cardData } = req.body;
    if (!ticketId || !cardData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const payment = await paymentService.postPaymentsService(ticketId, userId, cardData);
    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}
