const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("fedin_token");
}

export function setToken(token: string) {
  localStorage.setItem("fedin_token", token);
}

export function clearToken() {
  localStorage.removeItem("fedin_token");
  localStorage.removeItem("fedin_user");
}

export function getStoredUser(): { id: string; email: string } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("fedin_user");
  return raw ? JSON.parse(raw) : null;
}

export function setStoredUser(user: { id: string; email: string }) {
  localStorage.setItem("fedin_user", JSON.stringify(user));
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      if (typeof window !== "undefined") {
        clearToken();
        window.location.href = "/login";
      }
    }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || body.error || "Request failed");
  }

  return res.json();
}

export interface Article {
  id: number;
  title: string;
  link: string;
  content: string;
  publishedAt: string;
  sourceId: number;
  source: { name: string };
  relevanceScore?: number;
  summary?: string;
}

export interface Source {
  id: number;
  name: string;
  url: string;
  type: "RSS" | "API";
  config: Record<string, unknown>;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function getFeed(userId: string, page = 1, limit = 50) {
  return apiFetch<{ data: Article[]; meta: Meta & { personalized?: boolean } }>(
    `/feed?userId=${userId}&page=${page}&limit=${limit}`
  );
}

export function getArticles(sourceId?: string, page = 1, limit = 30) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (sourceId) params.set("sourceId", sourceId);
  return apiFetch<{ data: Article[]; meta: Meta }>(`/articles?${params}`);
}

export function getArticleById(id: number) {
  return apiFetch<{ data: Article }>(`/articles/${id}`);
}

export function interactWithArticle(
  articleId: number,
  type: "READ" | "SAVE" | "CLICK",
  userId: string
) {
  return apiFetch<{ message: string }>(`/articles/${articleId}/interact`, {
    method: "POST",
    body: JSON.stringify({ userId, type }),
  });
}

export function summarizeArticle(articleId: number) {
  return apiFetch<{ message: string }>(`/articles/${articleId}/summarize`, {
    method: "POST"
  });
}

export function getSources() {
  return apiFetch<{ data: Source[] }>("/sources");
}

export function addSource(data: { name: string; url: string; type: "RSS" | "API"; config?: Record<string, unknown> }) {
  return apiFetch<{ data: Source }>("/sources", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function deleteSource(id: number) {
  return apiFetch<{ message: string }>(`/sources/${id}`, { method: "DELETE" });
}

export function getUser(id: string) {
  return apiFetch<{ status: string; data: { id: string; email: string; role: string; preferences: Record<string, unknown> } }>(
    `/users/${id}`
  );
}

export function updateUserPreferences(id: string, preferences: Record<string, unknown>) {
  return apiFetch<{ status: string }>(`/users/${id}/preferences`, {
    method: "PUT",
    body: JSON.stringify({ preferences }),
  });
}

export interface UserSource {
  userId: string;
  sourceId: number;
  addedAt: string;
  source: Source;
}

export function getUserSources(userId: string) {
  return apiFetch<{ data: UserSource[] }>(`/users/${userId}/sources`);
}

export function addExistingSource(userId: string, sourceId: number) {
  return apiFetch<{ data: UserSource }>(`/users/${userId}/sources`, {
    method: "POST",
    body: JSON.stringify({ sourceId }),
  });
}

export function createUserSource(userId: string, data: { name: string; url: string; type: "RSS" | "API"; config?: Record<string, unknown> }) {
  return apiFetch<{ data: Source & { userSource: { userId: string } } }>(`/users/${userId}/sources/custom`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function removeUserSource(userId: string, sourceId: number) {
  return apiFetch<{ message: string }>(`/users/${userId}/sources/${sourceId}`, { method: "DELETE" });
}

export function register(email: string, password: string, role = "USER") {
  return apiFetch<{ message: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
  });
}

export function login(email: string, password: string) {
  return apiFetch<{ token: string; message: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
