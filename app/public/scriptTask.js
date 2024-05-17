//Tema de cores
const themeMap = {
    dark: "light",
    light: "dark"
  };
  
  const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
  }
  
  document.getElementById('themeButton').onclick = toggleTheme;
  
  
  //Modal Funcionando
  
  const openModalButton = document.querySelector(".open-modal-button");
  const closeModalButton = document.querySelector(".fa-solid.fa-circle-xmark");
  const modal = document.querySelector("#modal");
  const fade = document.querySelector("#fade");
  
  const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
  };
  
  [openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
  });
  
  
  
  const openNewModalButton = document.getElementById('openNewModalButton');
  const closeNewModalButton = document.querySelector("#new-modal .fa-circle-xmark");
  const newModal = document.querySelector("#new-modal");
  const newFade = document.querySelector("#new-fade");
  
  const toggleNewModal = () => {
    newModal.classList.toggle("hide");
    newFade.classList.toggle("hide");
  };
  
  openNewModalButton.addEventListener("click", toggleNewModal);
  closeNewModalButton.addEventListener("click", toggleNewModal);
  
  
  
  //Calendário Funcional
  const datas = document.querySelector('.datas');
  const header = document.querySelector('.calendario h3');
  const nav = document.querySelectorAll('#anterior, #proximo');
  const meses = [
      "Janeiro","Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  let date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  
  function renderCalendar(){
    let datasHtml = '';
  
    const start = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month + 1, 0).getDate();
    const end = new Date(year, month, endDate).getDay();
    const endDatePrev = new Date(year, month, 0).getDate();
  
    for(let i = start; i > 0; i--){
        datasHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }
  
    for(let i = 1; i <= endDate; i++){
        let className = (
            i === date.getDate() &&
            month === new Date().getMonth() && 
            year === new Date().getFullYear()
            ? ' class="today"' 
            :""
        );
        datasHtml += `<li${className} data-date="${year}-${month + 1}-${i}">${i}</li>`;
    }
  
    for(let i = end; i < 6; i++){
        datasHtml += `<li class="inactive">${i - end + 1}</li>`;
    }
  
    datas.innerHTML = datasHtml;
    header.textContent = `${meses[month]} ${year}`;
  
    // Adicione os ouvintes de evento para cada elemento de data no calendário
    datas.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', e => {
            const selectedDate = e.target.getAttribute('data-date');
            document.getElementById('selectedDate').value = selectedDate; // Define o valor da data selecionada no campo de entrada
        });
    });
  }
  
  
  nav.forEach(nav => {
      nav.addEventListener('click', e => {
          const btnId = e.target.id;
          if(btnId === 'anterior' && month === 0){
            year--;
            month = 11; // Correção aqui, voltar para dezembro (índice 11)
          } else if(btnId === 'proximo' && month === 11){
              year++;
              month = 0; // Correção aqui, avançar para janeiro (índice 0)
          } else {
            month = (btnId === 'proximo') ? month + 1 : month - 1;
          }
  
          date = new Date(year, month, new Date().getDate());
          year = date.getFullYear();
          month = date.getMonth();
          renderCalendar();
      })
  });
  
  renderCalendar(); 
  
  