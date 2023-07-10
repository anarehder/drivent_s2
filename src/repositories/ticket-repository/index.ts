import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';
import { AddTicketType } from '@/protocols';

async function getTicketTypesDB() {
  return await prisma.ticketType.findMany();
}

async function getTicketByEnrollmentIdDB(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function getTypeByTicketDB(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function getTicketByIdDB(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
      TicketType: true,
    },
  });
}

async function createTicketDB(newTicket: AddTicketType) {
  return await prisma.ticket.create({
    data: newTicket,
  });
}

async function editStatusPaymentDB(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketRepository = {
  getTicketTypesDB,
  getTicketByEnrollmentIdDB,
  getTypeByTicketDB,
  getTicketByIdDB,
  createTicketDB,
  editStatusPaymentDB,
};

export default ticketRepository;
