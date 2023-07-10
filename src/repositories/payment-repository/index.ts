import { prisma } from '@/config';
import { AddPaymentType } from '@/protocols';

async function getpaymentDB(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function postPaymentDB(ticketId: number, paymentData: AddPaymentType) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...paymentData,
    },
  });
}

const paymentRepository = {
  getpaymentDB,
  postPaymentDB,
};

export default paymentRepository;
