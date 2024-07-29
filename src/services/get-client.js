import { apiConfig } from "./api-config";

export async function getClientById({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/clients/${id}`, {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}
