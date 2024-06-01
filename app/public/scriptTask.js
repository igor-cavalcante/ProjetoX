// Tema de cores
const themeMap = {
  dark: "light",
  light: "dark",
};

const theme = localStorage.getItem("theme") || (Object.keys(themeMap)[0], localStorage.setItem("theme", Object.keys(themeMap)[0]), Object.keys(themeMap)[0]);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem("theme");
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem("theme", next);
}

document.getElementById("themeButton").onclick = toggleTheme;

// Modal Funcionando
const openModalButton = document.querySelector(".open-modal-button");
const closeModalButton = document.querySelector(".fa-circle-xmark");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach(el => {
  el.addEventListener("click", toggleModal);
});

// Calendário Funcional
const datas = document.querySelector(".datas");
const header = document.querySelector(".calendario h3");
const nav = document.querySelectorAll("#anterior, #proximo");
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  let datasHtml = "";

  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  for (let i = start; i > 0; i--) {
    datasHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? ' class="today"' : "";
    datasHtml += `<li${className} data-date="${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}">${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datasHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  datas.innerHTML = datasHtml;
  header.textContent = `${meses[month]} ${year}`;

  // Adicione os ouvintes de evento para cada elemento de data no calendário
  datas.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", e => {
      const selectedDate = e.target.getAttribute("data-date");
      document.getElementById("selectedDate").value = selectedDate; // Define o valor da data selecionada no campo de entrada
    });
  });
}

nav.forEach(navButton => {
  navButton.addEventListener("click", e => {
    e.preventDefault(); 
    const btnId = e.target.id;
    if (btnId === "anterior" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "proximo" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "proximo" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    renderCalendar();
  });
});

renderCalendar();
