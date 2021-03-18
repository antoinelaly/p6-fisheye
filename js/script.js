var home = document.querySelector(".out");
var lesphotos = document.querySelector(".lesphotos");

fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
.then(response => {
  return response.json();
}).then(data => {

  if(home) {
  for(key in data){
      data["photographers"].forEach(function (el){
        var figure = document.createElement("figure");
        var figcaption = document.createElement("figcaption");
        figure.appendChild(figcaption);
        var cityDiv = document.createElement("div");
        figcaption.appendChild(cityDiv);
        var city = document.createTextNode(el[city]);
        cityDiv.appendChild(city);

        home.appendChild(figure);
      })
    }

    
  }

/* function date_sort(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}*/

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
