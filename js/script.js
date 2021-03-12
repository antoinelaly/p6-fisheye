var count = document.querySelector(".out");

fetch('https://choisirsontheme.com/formation/ocr/p6-fisheye-fetch/js/fisheyedatafr.json')
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