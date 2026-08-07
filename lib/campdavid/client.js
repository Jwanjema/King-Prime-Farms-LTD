import "server-only";

// Thin fetch wrapper around the CampDavid Laravel API. This backend returns
// HTTP 200 even on business-logic failure (branch on data.success, a string
// "1"/"0", not on HTTP status) and can throw a raw non-JSON 500 on at least
// one known route (user-signin with an unknown phone) — so every response is
// parsed defensively and normalized into { ok, status, data }.
export async function campdavidFetch(path, { method = "POST", body, token, revalidate } = {}) {
  const headers = { "Content-Type": "application/json", Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const fetchOptions = {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };
  if (revalidate !== undefined) {
    fetchOptions.next = { revalidate };
  } else {
    fetchOptions.cache = "no-store";
  }

  let res;
  try {
    res = await fetch(`${process.env.CAMPDAVID_API_URL}${path}`, fetchOptions);
  } catch (err) {
    return { ok: false, status: 0, data: null, error: err.message };
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // Non-JSON response (e.g. the known signin-with-unknown-phone 500).
    return { ok: false, status: res.status, data: null, error: "Non-JSON response from backend" };
  }

  return { ok: res.ok, status: res.status, data };
}

export function toImageUrl(photo) {
  if (!photo) return null;
  return `${process.env.CAMPDAVID_IMAGE_BASE}${photo}`;
}
