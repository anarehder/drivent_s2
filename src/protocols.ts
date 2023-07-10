import { TicketStatus } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type TicketBody = {
  ticketTypeId: number;
};

export type AddTicketType = {
  ticketTypeId: number;
  enrollmentId: number;
  status: TicketStatus;
};

export type CardType = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

export type PaymentType = {
  userId: number;
  ticketId: number;
  cardInfo: CardType;
};

export type CreatePayment = {
  userId: number;
  ticketId: number;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type ViaCEPAddressError = {
  error: boolean;
};

export type ViaCEPAddressResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};
