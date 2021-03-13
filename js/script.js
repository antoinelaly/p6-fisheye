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
      <a href="#"><img src="img/${el.portrait}" alt="${el.name}"></a>
      <figcaption>
        <h2><a href="#">${el.name}</a></h2>  
        <div class="city">city${el.city}</div>
        <div class="brand">${el.tagline}</div>
        <div class="price">${el.price}€/jour</div>
        <ul>
          <li class="petitsb"><a href="#">#sport</a></li>
          <li class="petitsb"><a href="#">#event</a></li>
          <li class="petitsb"><a href="#">#travel</a></li>
          <li class="petitsb"><a href="#">#animals</a></li>
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