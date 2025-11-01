export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3NzgwOTMwLCJpZCI6IjAxOWE0MDI3LTlmZDQtN2I4ZS1hNzIzLWYyNjNkNWY4ZDAwYiIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjoxNjEyNiwic2lkIjoiNzZlZmM0NjktYTgxNS00NGEyLWIzMjEtNzMzNzI5ZjY0NjBlIiwidCI6ZmFsc2UsInVpZCI6MjAxNTQ2MTl9.kkC7tOSVAMfjqHW_Nb7G1xrcusbD7ijizu-I50sgHoRGf9I5QydxePFZ48siQwKn9fBhZwdDQPJYcRyAwfPTjw";
  const targetUrl = "https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod";

  const params = new URLSearchParams({
    dateFrom: "2025-10-01",
    dateTo: "2025-10-31",
    limit: "1000"
  });

  try {
    const response = await fetch(`${targetUrl}?${params.toString()}`, {
      headers: { Authorization: token }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при запросе к Wildberries", details: err.message });
  }
}
