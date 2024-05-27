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
  
  
//   form.addEventListener('submit', function(event){
    
//     const weight = document.getElementById('weight').value;
//     const height = document.getElementById('height').value;

//     const bmi = (weight/(height * height)).toFixed(2);
//     const value = document.querySelector('#value');
//     let description = '';

//     document.getElementById('info').classList.remove('hidden');

//     // Remover todas as classes de cor antes de adicionar a classe relevante
//     value.classList.remove('takecare', 'attention', 'yourefine');

//      switch (true) {
//         case bmi < 16:
//             description = 'Cuidado! Você está muito abaixo do peso!';
//             value.classList.add('takecare');
//             break;
//         case bmi >= 16 && bmi < 18.5:
//             description = 'Cuidado! Você está abaixo do peso!';
//             value.classList.add('attention');
//             break;
//         case bmi >= 18.5 && bmi <= 25:
//             description = 'Você está na faixa de peso ideal!';
//             value.classList.add('yourefine');
//             break;
//         case bmi > 25 && bmi <= 30:
//             description = 'Você está com sobrepeso!';
//             value.classList.add('attention');
//             break;
//         case bmi > 30 && bmi <= 40:
//             description = 'Cuidado! Você está obeso!';
//             value.classList.add('takecare');
//             break;
//         case bmi > 40:
//             description = 'Cuidado! Você está com obesidade mórbida!';
//             value.classList.add('takecare');
//             break;
//         default:
//             break;
//     }


//     value.textContent = bmi.replace('.',',');
//     document.getElementById('description').textContent = description;
// })