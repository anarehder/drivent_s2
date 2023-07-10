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

async function createTicketDB(newTicket: AddTicketType) {
  return await prisma.ticket.create({
    data: newTicket,
  });
}

const ticketRepository = {
  getTicketTypesDB,
  getTicketByEnrollmentIdDB,
  createTicketDB,
};

export default ticketRepository;
