document.addEventListener("DOMContentLoaded", () => {
  const services = [
    {
      name: "Mercados",
      img: "./assets/images/img-mercados.png",
      description:
        "Seguimiento continuo de las principales criptomonedas y divisas.",
      ventajas: [
        "Principales criptomonedas y divisas",
        "Cotizaciones en tiempo real",
        "Tablas personalizadas",
      ],
      url: "pages/mercados.html",
    },
    {
      name: "Conversor",
      img: "./assets/images/img-conversor.png",
      description:
        "Convierte entre diferentes divisas con tasas de cambio actualizadas.",
      ventajas: [
        "Conversión en tiempo real",
        "Fácil de usar",
        "30 monedas disponibles",
      ],
      url: "pages/conversor.html",
    },
    {
      name: "Noticias",
      img: "./assets/images/img-noticias.png",
      description: "Mantente informado con las últimas noticias del mundo.",
      ventajas: [
        "Noticias actualizadas",
        "Buscador por palabra clave",
        "Link a la noticia",
      ],
      url: "pages/noticias.html",
    },
  ];

  const servicesContainer = document.getElementById("services-container");

  servicesContainer.innerHTML = services
    .map(
      (service) => `
    <div class="card">
      <div class="card__header">
        <img src="${service.img}" class="img-fluid" alt="${service.name}">
      </div>
      <div class="card-body card__body">
        <h5 class="card__body-title card-title"><strong>${service.name}</strong></h5>
        <p class="card__body-text card-text">${service.description}</p>
        <a href="${service.url}" class="card__body-link button button--primary"> Ver más </a>
      </div>
    </div>
  `
    )
    .join("");
});

const page = "Inicio";

// Seleccionar el header y el footer de forma segura
const headerElement = document.querySelector(".header");
const footerElement = document.querySelector(".footer");

// Verificar si existe antes de insertar
if (headerElement && footerElement) {
  headerElement.insertAdjacentHTML("beforeend", createHeader(page));
  footerElement.insertAdjacentHTML("beforeend", createFooter(page));
}
