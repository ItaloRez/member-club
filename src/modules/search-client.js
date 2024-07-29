import { getClientById } from "../services/get-client";
import { loadClient } from "./load-client";

const input = document.getElementsByTagName("input")[0];
const button = document.getElementsByTagName("button")[0];

button.addEventListener("click", async () => {
  try {
    const value = input.value;

    await searchClient(value);
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar cliente");
  }
});

export async function searchClient(id) {
  try {
    const response = await getClientById({ id });

    if (response.status === 200) {
      const client = await response.json();
      loadClient(client);
    }

    if (response.status === 404) {
      alert("Cliente não encontrado");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar cliente");
  }
}
