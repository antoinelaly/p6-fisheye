var count = document.querySelector(".out");
//const url = "https://choisirsontheme.com/formation/ocr/p6-fisheye/fisheyedatafr.json";


fetch('https://choisirsontheme.com/formation/ocr/p6-fisheye/fisheyedatafr.json')
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