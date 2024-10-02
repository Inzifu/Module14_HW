// Задание 3

const input = document.querySelector('.input');
const button = document.getElementById('btn')
const imagesDiv = document.querySelector('.photos')
const span = document.querySelector('.text')


function useRequest(url,callback){
    const value = document.querySelector('input').value;
    url = url + value;
    if(value < 1 || value > 10){
        span.innerHTML =('Ввели некорректное число')
    }else{
        span.innerHTML =('Ваши фото:');
        let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
  
    xhr.onload = function() {
        if (xhr.status != 200) {
          console.log('Статус ответа: ', xhr.status);
        } else {
          const result = JSON.parse(xhr.response);
          if (callback) {
            callback(result);
          }
        }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
    };
}



function displayResult(apiData){
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
         <div class="card">
           <img
             src="${item.thumbnailUrl}"/>
            <p>${item.title}</p>
        </div>
     `;
     cards = cards + cardBlock;
     //Не нашел информации как добавить css свойство для наших кард-блоков
  });
  
    
  imagesDiv.innerHTML = cards;
}

button.addEventListener('click', () => {
    useRequest('https://jsonplaceholder.typicode.com/photos?_limit=',displayResult)
})



//    Задание 4 //

const input1 = document.querySelector(".input1")
const input2 = document.querySelector(".input2")
const button1 = document.getElementById("button1")
const span1 = document.querySelector('.span1')
const img = document.getElementById("img")
const btn5 = document.getElementById("button5")

//https://dummyimage.com/150x200


button1.addEventListener('click', () =>{
    const value1 = +document.querySelector('.input1').value;
    const value2 = +document.querySelector('.input2').value;

    if(value1 < 100 || value1 > 300 || value2 < 100 || value2 > 300){
        span1.innerHTML = ("Нужны числа от 100 до 300")
    }else{
        fetch("https://dummyimage.com/" + value1 + "x" + value2)
            .then((response) => {img.src = response.url})
    }
})


//    Задание 5 //
// https://jsonplaceholder.typicode.com/photos?_page=0&_limit=8
const input01 = document.querySelector(".input01");
const input02 = document.querySelector(".input02");
const span05 = document.querySelector(".span05")
const img5 = document.querySelector(".img5")

document.addEventListener("DOMContentLoaded", () => {
  storageItem = localStorage.getItem('cards')
  if (storageItem) {
    span05.innerHTML = ("Ваши фото")
    img5.innerHTML = (storageItem)  
  }
});


function ex5(callback){
  const input5_1 = document.querySelector(".input01").value;
  const input5_2 = document.querySelector(".input02").value;
  let url5 =  "https://jsonplaceholder.typicode.com/photos?_page=" + input5_1 + "&_limit=" + input5_2;

  if(input5_1 < 1 || input5_1 > 10){
    if(input5_2 < 1 || input5_2 > 10){
      span05.innerHTML = ("Номер страницы и лимит вне диапазона от 1 до 10")
    }else{
      span05.innerHTML = ("Номер страницы вне диапазона от 1 до 10");
    }
  }else{
    if(input5_2 < 1 || input5_2 > 10){
      if(input5_1 < 1 || input5_1 > 10){
        span05.innerHTML = ("Номер страницы и лимит вне диапазона от 1 до 10")
      }else{
        span05.innerHTML = ("Лимит вне диапазона от 1 до 10");
      }
    }
  }
  if((input5_1 > 0 && input5_1 < 11) && (input5_2 > 0 && input5_2 < 11)){
    span05.innerHTML = ("Ваши фото:");
    let xhr5 = new XMLHttpRequest();
    xhr5.open('GET', url5);
  
    xhr5.onload = function() {
        if (xhr5.status != 200) {
          console.log('Статус ответа: ', xhr5.status);
        } else {
          const result = JSON.parse(xhr5.response);
          callback(result)
        }
  };
  
  xhr5.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr5.status);
  };
  
  xhr5.send();
  }

}


function displayResult5(apiData){
  let cards5 = '';
  apiData.forEach (item => {
      const cardBlock5 = `
       <div class="card">
         <img
           src="${item.thumbnailUrl}"/>
          <p>${item.title}</p>
      </div>
   `;
   cards5 = cards5 + cardBlock5;

});

  
img5.innerHTML = cards5;
const requestResult = cards5
localStorage.setItem('cards', requestResult)
}

btn5.addEventListener('click', async () =>{
  await ex5(displayResult5)
})