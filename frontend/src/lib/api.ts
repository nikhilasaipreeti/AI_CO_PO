const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export interface GenerateCOPayload {
  courseName: string;
  syllabus: string;
  programOutcomes?: string;
  programSpecificOutcomes?: string;
}

export interface MapQuestionsPayload {
  questions: string[];
  cos: { id?: string; code?: string; description: string }[];
}

export interface AttainmentReport {
  coAttainment: { co: string; value: number }[];
  poAttainment: { po: string; value: number }[];
  psoAttainment: { pso: string; value: number }[];
  studentPerformance: { name: string; marks: number }[];
}

export const api = {
  generateCO: (data: GenerateCOPayload) =>
    request<{ outcomes: string[]; data: { code: string; description: string; bloomLevel: string }[] }>("/generate-co", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  mapQuestions: (data: MapQuestionsPayload) =>
    request<{ data: { question: string; co_id: string; bloom_level: string; confidence: number }[] }>("/map-questions", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  uploadMarks: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return fetch(`${API_BASE}/upload-marks`, { method: "POST", body: formData }).then((r) => {
      if (!r.ok) throw new Error(`Upload failed: ${r.status}`);
      return r.json();
    });
  },

  calculateAttainment: (data: AttainmentReport | Record<string, unknown>) =>
    request<{ data: AttainmentReport }>("/calculate-attainment", { method: "POST", body: JSON.stringify(data) }),

  getReports: () =>
    request<{ data: AttainmentReport }>("/attainment-report"),
};

export default api;
