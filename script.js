// === НАЧАЛО КОДА ===
// 🔑 Сюда вставь свой личный API-токен WB
const API_TOKEN = "EY...ТВОЙ_ТОКЕН_ЗДЕСЬ..."; // не делись им публично

// --- Настройки периода (за последние 7 дней)
const today = new Date();
const start = new Date(today);
start.setDate(today.getDate() - 7);
const dateFrom = start.toISOString().split('T')[0];
const dateTo = today.toISOString().split('T')[0];

// --- URL запросов к Wildberries
const BASE_URL = "https://statistics-api.wildberries.ru/api/v1/supplier";
const URL_SALES  = ${BASE_URL}/reportDetailByPeriod?dateFrom=${dateFrom}&dateTo=${dateTo}&limit=1000;
const URL_STOCKS = ${BASE_URL}/stocks?dateFrom=${dateFrom}&dateTo=${dateTo};
const URL_ADS    = "https://advert-api.wb.ru/adv/v1/analytics";

async function loadData() {
  try {
    // --- 1) Продажи
    const salesResp = await fetch(URL_SALES,  { headers: { Authorization: API_TOKEN } });
    const sales = await salesResp.json();

    // --- 2) Остатки
    const stockResp = await fetch(URL_STOCKS, { headers: { Authorization: API_TOKEN } });
    const stocks = await stockResp.json();

    // --- 3) Реклама (если доступно этим токеном)
    let ads = [];
    try {
      const adsResp = await fetch(URL_ADS, { headers: { Authorization: API_TOKEN } });
      ads = await adsResp.json();
    } catch (e) {
      console.warn("ADV недоступна этим токеном или эндпоинт другой:", e?.message);
    }

    console.log("✅ Продажи:", sales);
    console.log("📦 Остатки:", stocks);
    console.log("📊 Реклама:", ads);

    // --- 4) Агрегация выручки по датам
    const byDate = {};
    (Array.isArray(sales) ? sales : []).forEach(item => {
      const d = (item.date || "").slice(0, 10);
      if (!d) return;
      byDate[d] = (byDate[d]  0) + (Number(item.retail_amount)  0);
    });

    const labels = Object.keys(byDate).sort();
    const values = labels.map(l => byDate[l]);

    // --- 5) Построение графика (Chart.js должен быть подключён в index.html)
    const ctx = document.getElementById("salesChart");
    if (!ctx) {
      console.warn("Canvas #salesChart не найден в index.html");
      return;
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Выручка, ₽",
          data: values,
          borderColor: "#6a0dad",
          backgroundColor: "rgba(106,13,173,0.2)",
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: Реальные продажи Wildberries: ${dateFrom} — ${dateTo} }
        }
      }
    });

    // --- 6) Короткая сводка
    const extra = document.getElementById("extra");
    if (extra) {
      extra.innerHTML = `
        <h3>Дополнительно</h3>
        <p>Дата начала: ${labels[0] || "-"}</p>
        <p>Дата конца: ${labels.at(-1) || "-"}</p>
        <p>Товаров на складе: ${Array.isArray(stocks) ? stocks.length : 0}</p>
        <p>Рекламных кампаний: ${Array.isArray(ads) ? ads.length : 0}</p>
      `;
    }

  } catch (err) {
    console.error("Ошибка:", err);
    alert("Ошибка при получении данных. Проверь токен/права API или CORS.");
  }
}

document.addEventListener("DOMContentLoaded", loadData);
// === КОНЕЦ КОДА ===
