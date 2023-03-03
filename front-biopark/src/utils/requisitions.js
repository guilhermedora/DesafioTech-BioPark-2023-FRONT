import api from "../services/api";
import { getItem } from './storage';

export async function loadBuildings() {
  let token = '';

  token = getItem('token');

  try {
    const response = await api.get('/edificio', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const orderedBuildings = response.data.sort((a, b) => a - b);

    return orderedBuildings;
  } catch (error) {
    console.log(error.response);
  }
}

export async function loadApartments() {
  let token = '';

  token = getItem('token');

  try {
    const response = await api.get('/lista-apartamentos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}
