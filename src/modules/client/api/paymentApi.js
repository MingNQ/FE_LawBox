import { http } from "@shared/api/http";

const baseUrl = "/client/payment";

export async function getPlans() {
  const result = await http.get(`${baseUrl}/plans`);
  return result.data;
}

export async function createPayment(payload) {
  const result = await http.post(`${baseUrl}/create`, payload);
  return result.data;
}

export async function getMySubscription() {
  const result = await http.get(`${baseUrl}/my-subscription`);
  return result.data;
}
