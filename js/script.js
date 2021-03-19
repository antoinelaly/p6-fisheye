window.onload = function() {
  try {
    var url_string = (window.location.href).toLowerCase();
    var url = new URL(url_string);
    var q = url.searchParams.get("q");
    return q;
  } catch (err) {
    console.log("Issues with Parsing URL Parameter's - " + err);
  }
}


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
        aImg.href = `folio?q=${el.id}`;
        img.src = `img/${el.illustration}`;
        p.innerHTML = `${el.city} <br>${el.tagline} <br>${el.price}€/jour`;
        ul.setAttribute("aria-label", "Secondary navigation");

        for (let j = 0; j < el.tags.length; j++) {
          let liTags = createNode("li");
          liTags.className = "petitsb"; 
          liTags.innerHTML = el.tags[j];
          append(ul, liTags);
        }

        append(figure, aImg);
        append(aImg, img);
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
// 243


  if(lesphotos) {
  let med="";
    for(key in data) {
        data[key].forEach(function (el, q){
          if(el['photographerId'] === q)
          
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
