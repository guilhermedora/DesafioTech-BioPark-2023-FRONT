import api from "../services/api";
import { getItem } from './storage';

export async function loadBuildings() {
  let token = '';
  token = getItem('token');
  const response = await api.get('/list-buildings', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  let data = response.data
  if (data) {
    const orderedBuildings = data.sort((a, b) => a - b);
    return orderedBuildings;
  }
}

export async function loadApartments() {
  let token = '';
  token = getItem('token');
  const response = await api.get('/list-apartments', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function loadContracts() {
  let token = '';
  token = getItem('token');
  const response = await api.get('/my-contracts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data
}

export async function requiredContracts() {
  let token = '';
  token = getItem('token');
  const response = await api.get('/requirements', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data
}