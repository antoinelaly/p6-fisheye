var count = document.querySelector(".out");

fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyename.json')
.then(response => {
  return response.json();
}).then(data => {

  let out="";
  for(key in data){
    data[key].forEach(function (el){
      out+=`    
      <figure>
      <a href="#"><img src="img/${el.photographers.portrait}" alt="${el.photographers.name}"></a>
      <figcaption>
        <h2><a href="#">${el.photographers.name}</a></h2>  
        <div class="city">city${el.photographers.city}</div>
        <div class="brand">${el.photographers.tagline}</div>
        <div class="price">${el.photographers.price}€/jour</div>
        <ul class="lestags">
            <li class="petitsb"><a href="#">#${el.photographers.tags}</a></li>
        </ul>
      </figcaption>
    </figure>   
      `
    })
  } 
 count.innerHTML = out;

}).catch(err => {
  console.log('Fetch Error :-S', err);
});
