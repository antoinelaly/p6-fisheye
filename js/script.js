var home = document.querySelector(".out");
var lesphotos = document.querySelector(".lesphotos");
var presentation = document.querySelector(".presentation");
var nav = document.querySelector(".nav");
var tagpage = document.querySelector(".tagpage");

function createNode(element) {
	return document.createElement(element);
}
function append(parent, el) {
	return parent.appendChild(el);
}

function creatFigure(el, valueFigure) {
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
    (aTag = createNode("a"));
    aTag.href = `tag?id=${el.tags[j]}`;
    liTags.className = "petitsb"; 
    liTags.innerHTML = `#${el.tags[j]}`;
    append(ul, aTag);
    append(aTag, liTags);
  }

  append(figure, aImg);
  append(aImg, img);
  append(figure, figcaption);
  append(figcaption, h2);
  append(figcaption, p);
  append(figcaption, ul);
  append(valueFigure, figure);
}

function creatFolio(el, valueFolio) {
  let figure = createNode("figure"), 
  figcaption = createNode("figcaption");
  (img = createNode("img")),
  (p = createNode("p")),
  (pp = createNode("p"));
  img.src = `img/${el.photographerId}/${el.image}`;
  p.innerHTML = `${el.date}`;
  pp.innerHTML = `${el.price} €    ${el.likes} &hearts;`;
  append(figure, img);
  append(figure, figcaption);
  append(figcaption, p);
  append(figcaption, pp);
  append(valueFolio, figure);
}



fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json') 
		.then(response => {
      return response.json();
    }).then(data => {
      displayHome(data);
		}).catch(err => {
      console.log('Fetch Error :-S', err);
	});

  function displayHome(data) {

   
  if(home) {
    data["photographers"].forEach(function (el, valueFigure){
      var valueFigure = home;
      creatFigure(el, valueFigure); // homepage figures 
    })
  };

  }