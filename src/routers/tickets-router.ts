import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/ticket-schemas';
import { createTicket, getTicketByUserId, getTicketTypes } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getTicketByUserId)
  .post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };
