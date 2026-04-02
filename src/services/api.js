const API_BASE_URL = "http://10.0.2.2:3000/api"; 

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
}

export async function register(username, email, password) {
  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
}

export async function fetchUserLoans(userId) {
  const response = await fetch(`${API_BASE_URL}/loan/fetch-loans-userId`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user loans");
  }
  return response.json();
}