import { notFoundError, unauthorizedError } from '@/errors';
import { CardType, AddPaymentType } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function findTicketEnrollment(ticketId: number, userId: number) {
  // verifica se o ticket Id realmente existe
  const ticket = await ticketRepository.getTicketByIdDB(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  // busca o enrollment associado a este usuario e compara os ids do enrollment com o usuario logado
  const enrollment = await enrollmentRepository.findEnrollmentByIdDB(ticket.enrollmentId);
  if (!enrollment) {
    throw notFoundError();
  }

  if (enrollment.userId !== userId) throw unauthorizedError();
}

async function getPaymentsService(ticketId: number, userId: number) {
  console.log(ticketId, userId);
  await findTicketEnrollment(ticketId, userId);

  const payment = await paymentRepository.getpaymentDB(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

async function postPaymentsService(ticketId: number, userId: number, cardData: CardType) {
  await findTicketEnrollment(ticketId, userId);
  // buscar informacoes do ticket
  const ticket = await ticketRepository.getTypeByTicketDB(ticketId);

  const paymentData: AddPaymentType = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.postPaymentDB(ticketId, paymentData);
  await ticketRepository.editStatusPaymentDB(ticketId);

  return payment;
}

const paymentService = {
  getPaymentsService,
  postPaymentsService,
};

export default paymentService;
