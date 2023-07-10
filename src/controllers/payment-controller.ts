import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payment-service';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = Number(req.userId);
    if (!req.query.ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const ticketId = Number(req.query.ticketId);
    const payment = await paymentService.getPaymentsService(ticketId, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'RequestError') return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
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
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'RequestError') return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
