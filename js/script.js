var count = document.querySelector(".out");
var lesphotos = document.querySelector(".lesphotos");
var lestags = document.querySelector(".lestags");

fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
.then(response => {
  return response.json();
}).then(data => {

  let out="";
  let lin="";
  for(key in data){
    if(count && key == "photographers") {
      data[key].forEach(function (el){
        out+=`    
        <figure>
        <a href="#"><img src="img/${el.illustration}" alt="${el.name}"></a>
        <figcaption>
          <h2><a href="#">${el.name}</a></h2>  
          <div class="city">${el.city}</div>
          <div class="brand">${el.tagline}</div>
          <div class="price">${el.price}€/jour</div>
          <ul class="lestags">`
          lin+=`<li class="petitsb"><a href="#">#${el.tags}</a></li>`
          out+=`</ul>
        </figcaption>
      </figure>   
        `
      })
    } 
    count.innerHTML = out;
    lestags.innerHTML = lin;
  /*}

  for (key in data) {
    data[key].forEach(function (el){
    let buttonWrap = document.createElement('li');
    buttonWrap.className = 'petitsb';

    let link = document.createElement('a');
    link.innerHTML = el.tags;
    document.getElementsByClassName('lestags')[key].appendChild(buttonWrap).appendChild(link);
    })*/
  };

 let photo="";
 //let mimi = _.find(data, ["photographerId", "243"]);
 //if (media.photographerId == 243) {
for(key in data){
  if (media.photographerId.indexOf("243")) {
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
