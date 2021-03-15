var count = document.querySelector(".out");
var lesphotos = document.querySelector(".lesphotos");

fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
.then(response => {
  return response.json();
}).then(data => {

  let out="";
  for(key in data){
    if(key == "photographers") {
      data[key].forEach(function (el){
        out+=`    
        <figure>
        <a href="#"><img src="img/${el.illustration}" alt="${el.name}"></a>
        <figcaption>
          <h2><a href="#">${el.name}</a></h2>  
          <div class="city">${el.city}</div>
          <div class="brand">${el.tagline}</div>
          <div class="price">${el.price}€/jour</div>
          <ul class="lestags">
              <li class="petitsb"><a href="#">#${el.tags}</a></li>
          </ul>
        </figcaption>
      </figure>   
        `
      })
    } 
  } 
 count.innerHTML = out;

 let photo="";
 //let mimi = _.find(data, ["photographerId", "243"]);
 //if (media.photographerId == 243) {
 for(key in data){
  if ( photographerId == 243) {
     data[key].forEach(function (ele){
      photo+=`    
       <figure>
       <img src="img/${ele.image}" alt="${ele.name}">
     </figure>   
       `
     })
   } 
 } 
 lesphotos.innerHTML = photo;


}).catch(err => {
  console.log('Fetch Error :-S', err);
});
