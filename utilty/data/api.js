import axios from "axios";

// let API_BASE_URL = "https://beuaty-backend.onrender.com/api/";
let API_BASE_URL = 'http://localhost:5001/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300000,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function login(email, password) {
  const res = await api.post('auth/login', { email:email, password:password });
  if (res.status === 200 && res.data.token) {
    localStorage.setItem('authToken', res.data.token);
  }
  return res.data;
}


export async function register(userData) {
  // userData = { name, email, password, ... }
  const res = await api.post('auth/register', userData);
  return res.data;
}


export async function fetchData(endpoint) {
  const res = await api.get(endpoint);
  return res.data;
}

// Insert data (authenticated)
export async function insertData(endpoint, payload) {
  const res = await api.post(endpoint, payload);
  return res.data;
}

// Logout helper to clear token
export function logout() {
  localStorage.removeItem('authToken');
  // optionally redirect user to login page
}

export const updateData = async (endpoint,data)=>{
  const res = await api.put(endpoint,data)
  return res.data
}


export const updateDatas = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

export const deleteData = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};


// export const fetchData = async (endpoint) => {
//   const response = await fetch(`${API_BASE}/${endpoint}`, {
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   if (!response.ok) throw new Error('Network response was not ok');
//   return await response.json();
// };

// export const insertData = async (endpoint, data) => {
//   const response = await fetch(`${API_BASE}/${endpoint}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     },
//     body: JSON.stringify(data)
//   });
//   if (!response.ok) throw new Error('Network response was not ok');
//   return await response.json();
// };