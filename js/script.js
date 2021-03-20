
var home = document.querySelector(".out");
var lesphotos = document.querySelector(".lesphotos");

function createNode(element) {
	return document.createElement(element);
}
function append(parent, el) {
	return parent.appendChild(el);
}

window.addEventListener('load', () => {


fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
.then(response => {
  return response.json();
}).then(data => {

  if(home) {
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
        aImg.href = `folio?id=${el.id}`;
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
  };

  var searchParams = new URLSearchParams(window.location.search);

  if(searchParams.has('id')) {
    var folioId = searchParams.get('id');
    var folioIdNum = parseInt(folioId);

  let med="";
    /*for(key in data) {*/
        data["media"].forEach(function (el){
          if(el['photographerId'] === folioIdNum) {

            /*let figure = createNode("figure"),
            figcaption = createNode("figcaption");
            (img = createNode("img")),*/

            med+=`    
          <figure>
            <a href="#"><img src="img/${el.photographerId}/${el.image}" alt="${el.name}"></a>
            <figcaption> 
            <div class="city">${el.price}€</div>
            <div class="brand">${el.likes}</div>
          </figcaption>
          </figure>   
          `
          }
        })
      /*} */    
    lesphotos.innerHTML = med;
  }     else {
      //window.location.pathname = 'folio';
  }


}).catch(err => {
  console.log('Fetch Error :-S', err);
});
});