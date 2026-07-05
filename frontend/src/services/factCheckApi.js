// services/factCheckApi.js
//
// Isolates the network call so components never talk to fetch() directly.
// Swap the endpoint or add auth headers here without touching any UI code.

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "";

export async function verifySentence(sentence) {
  const response = await fetch(`${API_BASE_URL}/v1/verifyfact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sentence }),
  });

  if (!response.ok) {
    const message =
      response.status === 429
        ? "Too many requests. Wait a moment and try again."
        : "The verification service could not be reached.";
    throw new Error(message);
  }

  const data = await response.json();
  console.log(data);

  if (!Array.isArray(data)) {
    throw new Error("Unexpected response shape from the verification service.");
  }

  return data;
}