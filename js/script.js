var home = document.querySelector(".out");
var lesphotos = document.querySelector(".lesphotos");
function createNode(element) {
	return document.createElement(element);
}
function append(parent, el) {
	return parent.appendChild(el);
}

fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
.then(response => {
  return response.json();
}).then(data => {

  if(home) {
  for(key in data){
      data["photographers"].forEach(function (el){

        let ul = createNode("ul"),
        figure = createNode("figure"),
        figcaption = createNode("figcaption");
        (img = createNode("img")),
        (h2 = createNode("h2")),
        (p = createNode("p"));
        address = createNode("address");
        a = createNode("a");
        aImg = createNode("a");
        h2.innerHTML = `${el.name}`;
        img.src = `img/${el.illustration}`;
        p.innerHTML = `${el.city} <br>${el.tagline} <br>${el.price}€/jour`;

        let menu = el.tags;
        for (let j = 0; j < menu.length; j++) {
          let li = createNode("li");
          li.className = "petitsb"; 
          li.innerHTML = tags;
          append(ul, li);
        }

        append(figure, img);
        append(figure, figcaption);
        append(figcaption, h2);
        append(figcaption, p);
        append(figcaption, ul);
        append(home, figure);
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
