import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import { AddTicketType } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getTicketTypesService() {
  const ticketTypes = await ticketRepository.getTicketTypesDB();
  if (!ticketTypes) throw notFoundError();
  return ticketTypes;
}

async function getTicketByUserIdService(userId: number) {
  // encontrar se o usuário possui enrollment
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  // encontrar o ticket do usuário baseado no enrollment id do usuario
  const ticket = await ticketRepository.getTicketByEnrollmentIdDB(enrollment.id);
  if (!ticket) throw notFoundError();
  return ticket;
}

async function createTicketService(userId: number, ticketTypeId: number) {
  // encontrar o enrollment
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  // adicionar o ticket ao seu cadastro (enrollment)
  const ticketData: AddTicketType = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };
  await ticketRepository.createTicketDB(ticketData);
  // buscar o cadastro do ticket para retornar o array desejado
  const createdTicket = await getTicketByUserIdService(userId);
  return createdTicket;
}

const ticketsService = {
  getTicketTypesService,
  getTicketByUserIdService,
  createTicketService,
};

export default ticketsService;
