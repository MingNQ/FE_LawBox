import { http } from "@shared/api/http";

const baseUrl = "/admin/payment-management";

export async function getPaymentStats() {
  const result = await http.get(`${baseUrl}/stats`);
  return result.data;
}

export async function getAllTransactions() {
  const result = await http.get(`${baseUrl}/transactions`);
  return result.data;
}
