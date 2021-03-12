var count = document.querySelector(".out");

fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyename.json')
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