var count = document.querySelector(".out");
var lesphotos = document.querySelector(".lesphotos");

fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
.then(response => {
  return response.json();
}).then(data => {

  if(count) {
  let out="";
  for(key in data){
    //if(key == "photographers") {
      data["photographers"].forEach(function (el){
        out += `<figure>`;
        out += `<figcaption>`;
        out += `<div>${el.city}</div>`;
        out += `</figcaption>`;
        out += `</figure>`;
      })
    }
    count.appendChild(out);
  }

  function date_sort(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}

  if(lesphotos) {
  let med="";
    for(key in data) {
        data[key].forEach(function (el, index){
          if(el['photographerId'] === 243)
          
          med+=`    
          <figure>
            <a href="#"><img src="img/${el.photographerId}/${el.image}" alt="${el.name}"></a>
            <figcaption> 
            <div class="city">${el.price}€</div>
            <div class="brand">${el.likes}</div>
          </figcaption>
          </figure>   
          `
        })
      }     
    lesphotos.innerHTML = med;

  } 

}).catch(err => {
  console.log('Fetch Error :-S', err);
});
