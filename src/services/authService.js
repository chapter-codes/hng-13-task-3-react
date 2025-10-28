const SESSION_KEY = "ticketapp_session";

function delay(ms = 400) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function login({ email, password }) {
  await delay();
  if (email === "test@example.com" && password === "Password123") {
    const session = {
      token: "sess_" + Math.random().toString(36).slice(2),
      user: { id: "u_1", name: "Test User", email },
      expiresAt: null,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }
  const e = new Error("Invalid credentials");
  e.code = "INVALID_CREDENTIALS";
  throw e;
}

export async function signup({ name, email, password }) {
  await delay();
  // basic fake signup: accept everything except if email already "test@example.com" in this demo
  const session = {
    token: "sess_" + Math.random().toString(36).slice(2),
    user: { id: "u_2", name, email },
    expiresAt: null,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function ensureAuth() {
  return !!getSession();
}
