const api_key_coinranking = "coinranking22b1d5f1ed17ba55bcd4a9c076747c62d4bca3520a85df31";
const api_key_fx = "fxf_IbCpIl0sJD8z8xkkB25k";

const options = {
  headers: {
    "x-access-token": api_key_coinranking,
  },
};
// Función para formatear la fecha en formato legible
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
}

// Función para formatear números grandes
function formatLargeNumber(number) {
  const num = Number(number);
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "T";
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  }
  return num.toLocaleString();
}

// Número de criptomonedas a mostrar
const limitCryptos = 15;

// Función para obtener criptomonedas
function fetchCryptos() {
  fetch(`https://api.coinranking.com/v2/coins?limit=${limitCryptos}`, options)
    .then(response => response.json())
    .then(result => {
      const coins = result.data.coins;
      const tableBody = document.getElementById("mercados__table-body");
      tableBody.innerHTML = ""; // Limpiar la tabla antes de actualizar

      coins.forEach(coin => {
        const row = document.createElement("tr");
        row.classList.add("mercados__table-row");

        const changeClass = coin.change >= 0 ? "mercados__table-change--positive" : "mercados__table-change--negative";

        row.innerHTML = `
          <td class="mercados__table-cell">
            <img class="mercados__table-logo" src="${coin.iconUrl}" alt="${coin.name} logo">
          </td>
          <td class="mercados__table-cell">${coin.name}</td>
          <td class="mercados__table-cell">${coin.symbol}</td>
          <td class="mercados__table-cell">$${parseFloat(coin.price).toFixed(2)}</td>
          <td class="mercados__table-cell ${changeClass}">${coin.change}%</td>
          <td class="mercados__table-cell">$${formatLargeNumber(coin.marketCap)}</td>
          <td class="mercados__table-cell">$${formatLargeNumber(coin["24hVolume"])}</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error al obtener criptomonedas:", error));
}

// Función para obtener tasas de cambio
function fetchDivisas() {
    const baseEur = "EUR";
    const baseUsd = "USD";
    const currenciesEUR = "USD,GBP,CHF,JPY,CAD,AUD,HKD,MXN";
    const currenciesUSD = "EUR,GBP,CHF,JPY,CAD,AUD,HKD,MXN";

  fetch(`https://api.fxfeed.io/v1/latest?base=${baseEur}&currencies=${currenciesEUR}&api_key=${api_key_fx}`)
    .then(response => response.json())
    .then(data => {
    console.log(data)
      const tableBody = document.getElementById("mercados__divisas-body-eur");
      tableBody.innerHTML = ""; // Limpiar la tabla antes de actualizar
      const ultimaFecha = document.getElementById("mercados__actualizacion");
      ultimaFecha.textContent = `Última actualización: ${formatDateTime(data.date)} ✔️`

      if (data.success) {
        Object.entries(data.rates).forEach(([currency, rate]) => {
          const row = document.createElement("tr");
          row.classList.add("mercados__table-row");

          row.innerHTML = `
            <td class="mercados__table-cell">${currency}</td>
            <td class="mercados__table-cell">${rate.toFixed(4)}</td>
          `;

          tableBody.appendChild(row);
        });
      } else {
        console.error("Error en la API de divisas:", data.error.info);
      }
    })
    .catch(error => console.error("Error al obtener divisas:", error));

    fetch(`https://api.fxfeed.io/v1/latest?base=${baseUsd}&currencies=${currenciesUSD}&api_key=${api_key_fx}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("mercados__divisas-body-usd");
      tableBody.innerHTML = ""; // Limpiar la tabla antes de actualizar

      if (data.success) {
        Object.entries(data.rates).forEach(([currency, rate]) => {
          const row = document.createElement("tr");
          row.classList.add("mercados__table-row");

          row.innerHTML = `
            <td class="mercados__table-cell">${currency}</td>
            <td class="mercados__table-cell">${rate.toFixed(4)}</td>
          `;

          tableBody.appendChild(row);
        });
      } else {
        console.error("Error en la API de divisas:", data.error.info);
      }
    })
    .catch(error => console.error("Error al obtener divisas:", error));
}



// Manejo de botones de selección
document.addEventListener("DOMContentLoaded", function () {
  const cryptoBtn = document.getElementById("mercados__toggle-crypto");
  const divisasBtn = document.getElementById("mercados__toggle-divisas");
  const cryptoSection = document.querySelector(".mercados__crypto");
  const divisasSection = document.getElementById("mercados__divisas");

  if (cryptoBtn && divisasBtn) {
    cryptoBtn.addEventListener("change", () => {
      cryptoSection.classList.remove("mercados__section--hidden");
      divisasSection.classList.add("mercados__section--hidden");
      fetchCryptos();
    });

    divisasBtn.addEventListener("change", () => {
      cryptoSection.classList.add("mercados__section--hidden");
      divisasSection.classList.remove("mercados__section--hidden");
      fetchDivisas();
    });
  } else {
    console.error("Los botones de selección no se encontraron en el DOM.");
  }

  // Cargar criptos por defecto
  fetchCryptos();
});
