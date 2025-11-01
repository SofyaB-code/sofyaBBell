// === НАЧАЛО КОДА ===

async function loadData() {
  const info = document.getElementById("info");
  info.textContent = "Загружаю данные...";

  try {
    const resp = await fetch("/api/sales");
    const data = await resp.json();

    if (!Array.isArray(data) || data.length === 0) {
      info.textContent = "Нет данных. Проверь токен или права доступа.";
      return;
    }

    const byDate = {};
    data.forEach((item) => {
      const d = item.date?.slice(0, 10);
      if (!d) return;
      byDate[d] = (byDate[d]body>
  <h1>Сервис аналитики Wil0);
    });

    const labels = Object.keys(byDate).sort();
    const values = labels.map((l) => byDate[l]);

    info.textContent =кнопку Add file → Create new file) и вставляешь текст.

    new Chart(document.getElementById("salesChart"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Выручка, ₽",
            data: values,
            borderColor: "#6a0dad",
            backgroundColor: "rgba(106,13,173,0.2)",
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Динамика продаж Wildberries за неделю",
          },
        },
      },
    });
  } catch (e) {
    info.textContent = "Ошибка при загрузке данных с сервера.";
    console.error(e);
  }
}

loadData();
// === КОНЕЦ КОДА ===
