import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔒 Твой токен WB
const API_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3NzgwOTMwLCJpZCI6IjAxOWE0MDI3LTlmZDQtN2I4ZS1hNzIzLWYyNjNkNWY4ZDAwYiIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjoxNjEyNiwic2lkIjoiNzZlZmM0NjktYTgxNS00NGEyLWIzMjEtNzMzNzI5ZjY0NjBlIiwidCI6ZmFsc2UsInVpZCI6MjAxNTQ2MTl9.kkC7tOSVAMfjqHW_Nb7G1xrcusbD7ijizu-I50sgHoRGf9I5QydxePFZ48siQwKn9fBhZwdDQPJYcRyAwfPTjw";

const HEADERS = { Authorization: API_TOKEN };
const BASE_URL = "https://statistics-api.wildberries.ru/api/v1/supplier";

// 📦 Продажи
app.get("/api/sales", async (req, res) => {
  const dateTo = new Date().toISOString().split("T")[0];
  const dateFrom = new Date(Date.now() - 7 * 24 * 3600 * 1000)
    .toISOString()
    .split("T")[0];

  const url = `${BASE_URL}/reportDetailByPeriod?dateFrom=${dateFrom}&dateTo=${dateTo}&limit=1000`;

  try {
    const r = await fetch(url, { headers: HEADERS });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log("✅ Сервер запущен на порту 3000"));
