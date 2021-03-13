var count = document.querySelector(".out");
var lestags = document.querySelector(".lestags");

fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyename.json')
.then(response => {
  return response.json();
}).then(data => {

  let out="";
  for(key in data){
    data[key].forEach(function (el){
      out+=`    
      <figure>
      <a href="#"><img src="img/${el.portrait}" alt="${el.name}"></a>
      <figcaption>
        <h2><a href="#">${el.name}</a></h2>  
        <div class="city">city${el.city}</div>
        <div class="brand">${el.tagline}</div>
        <div class="price">${el.price}€/jour</div>
        <ul class="lestags">
          
        </ul>
      </figcaption>
    </figure>   
      `;
        liens+=`   
        <li class="petitsb"><a href="#">#${el.tags}</a></li>
        `
      })

  } 
 count.innerHTML = out;
 lestags.innerHTML = liens;
}).catch(err => {
  console.log('Fetch Error :-S', err);
});