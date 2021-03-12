var count = document.querySelector(".out");

fetch('https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json')
.then(response => {
  return response.json();
}).then(data => {
  let out="";
  for(key in data){
    data[key].forEach(function (el){
      out+=`<li> ${el.name} </li>`
    })
  } 
 count.innerHTML = out;
}).catch(err => {
  console.log('Fetch Error :-S', err);
});