//* Funciones globales **/
const createHeader = (page) => {
  let pathOffCanvas = "";
  let pathImg = "../";
  let pathIndex = "../";
  if (page === "Inicio") {
    pathOffCanvas = "pages/";
    pathImg = "./";
    pathIndex = "";
  }
  return `
      <!-- Img Logo Bárbara -->
      <a href="${pathImg}index.html">
        <img
          class="header__logo"
          src="./assets/icons-svg/Logo-incodecoin.svg"
          alt="imagen de la empresa In Code Coin"
        />
      </a>

      <!-- Menú para pantallas grandes -->
      <nav class="header__nav">
        <ul class="header__menu">
          <li class="header__menu-item">
            <a class="header__menu-link" href="${pathIndex}index.html">Inicio</a>
          </li>
          <li class="header__menu-item">
            <a class="header__menu-link" href="${pathOffCanvas}mercados.html">Mercados</a>
          </li>
          <li class="header__menu-item">
            <a class="header__menu-link" href="${pathOffCanvas}conversor.html">Conversor</a>
          </li>
          <li class="header__menu-item">
            <a class="header__menu-link" href="${pathOffCanvas}noticias.html">Noticias</a>
          </li>
          <li class="header__menu-item">
            <a class="header__menu-link" href="${pathOffCanvas}contacto.html"
              >Contacto</a
            >
          </li>
          <li class="header__menu-item">
            <a class="header__menu-link" href="${pathOffCanvas}aviso-legal.html"
              >Aviso Legal</a
            >
          </li>
        </ul>
      </nav>

      <!-- Botón para abrir el offcanvas -->
      <img
        class="header__offcanvas-btn"
        type="button"
        src="${pathImg}assets/icons-svg/menu-icon.svg"
        alt="Button menu"
        data-bs-toggle="offcanvas"
        data-bs-target="#headerOffcanvas${page}"
        aria-controls="headerOffcanvas${page}"
      />

      <!-- Offcanvas para móviles -->
      <div
        class="header__offcanvas offcanvas offcanvas-start"
        tabindex="-1"
        id="headerOffcanvas${page}"
        aria-labelledby="headerOffcanvas${page}Label"
        data-bs-scroll="true"
      >
      <div class="offcanvas-header">
        <h4 class="offcanvas-title" id="headerOffcanvas${page}Label">Menu</h4>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <nav class="header__offcanvas-menu">
          <ul class="header__menuOff">
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="../index.html">Inicio</a>
            </li>
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="${pathOffCanvas}mercados.html"
                >Mercados</a
              >
            </li>
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="${pathOffCanvas}conversor.html"
                >Conversor</a
              >
            </li>
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="${pathOffCanvas}noticias.html"
                >Noticias</a
              >
            </li>
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="${pathOffCanvas}contacto.html"
                >Contacto</a
              >
            </li>
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="${pathOffCanvas}aviso-legal.html"
                >Aviso Legal</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `;
};

/* Funcion para crear el footer */
const createFooter = (page) => {
  let pathImg = "../";
  let pathIndex = "../";
  if (page === "Inicio") {
    pathImg = "./";
    pathIndex = "";
  }
  return `
      <p class="footer__text">
        &copy; In Code Coin
      </p>
      <p class="footer__legal">
        <a href="${pathIndex}pages/aviso-legal.html">
          Menciones Legales | Política de confidencialidad
        </a>
      </p>
  `;
};

document.addEventListener("DOMContentLoaded", function () {
  const menuSmallScreen = document.getElementById("mobile-menu");

  // Redirigir al link seleccionado
  menuSmallScreen.addEventListener("change", function () {
    const selectedValue = this.value;
    if (selectedValue) {
      window.location.href = selectedValue;
    }
  });
});

/* Función que detecta cuando hay scroll en la página para modificar el estilo del footer */
function ajustarFooter() {
  const footer = document.querySelector(".footer");
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;

  if (bodyHeight <= windowHeight) {
    footer.classList.add("footer__fixe"); // No hay scroll
  } else {
    footer.classList.remove("footer__fixe"); // Si hay scroll
  }
}

// Ejecutar cuando la página cargue y al redimensionar la ventana
window.addEventListener("load", ajustarFooter);
window.addEventListener("resize", ajustarFooter);


