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
  //img.src = `img/${el.photographerId}/${limg}`;
  p.innerHTML = `${el.date}`;
  pp.innerHTML = `${el.price} €    ${el.likes} &hearts;`;
  append(figure, img);
  append(figure, figcaption);
  append(figcaption, p);
  append(figcaption, pp);
  append(valueFolio, figure);
}

let mediaObj = {};
let showObj = function() {
  for (let key in mediaObj) {
    console.log(key);
    console.log(mediaObj[key]);
  };
}

class ImgFactory {
  constructor() {
    this.createImg = function(mediaObj) {
      let limg;
      if (mediaObj === 'image' || mediaObj === 'video') limg = new Limage();
      return limg;
    };
    console.log(limg);
  }
}

class Limage {
  constructor() {

  }
}

window.addEventListener('load', () => {
fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json') 
		.then(response => {
      return response.json();
    }).then(data => {
      displayData(data);
      
      mediaObj = data.media;

      showObj();

		}).catch(err => {
      console.log('Fetch Error :-S', err);
	});

  function displayData(data) {
   
    var searchParams = new URLSearchParams(window.location.search);  // url get string id
    var folioId = searchParams.get('id'); // convert to var
    var folioIdNum = parseInt(folioId); // convert string to num
  
    if(home) {
      data.photographers.forEach(function (el, valueFigure){
        var valueFigure = home;
        creatFigure(el, valueFigure); // homepage figures 
      })
    };
    if(tagpage && searchParams.has('id')) {
      data.photographers.forEach(el => {
        if(el.tags.includes(folioId)) { 
          var valueFigure = tagpage;
          creatFigure(el, valueFigure); // tagpage figures
        }
      })
    };
    if(nav) { // nav buttons
      data.photographers.forEach(el => {
        var temp = [ ] // no duplication
        dataa = el.tags.filter((el)=>{
        if(!temp.includes(el.userid)){
          temp.push(el.userid)
          return true;
          }
        });
        let ul = createNode("ul");
        for (let j = 0; j < dataa.length; j++) {
          let liTags = createNode("li");
          (aTag = createNode("a"));
          aTag.href = `tag?id=${dataa[j]}`;
          liTags.className = "petitsb"; 
          liTags.innerHTML = `#${dataa[j]}`;
          append(ul, aTag);
          append(aTag, liTags);
        }
        append(nav, ul);
      })
    };
    if(searchParams.has('id')) { // if id in url, folio id 
          data.media.forEach(el => { 
            if(el.photographerId === folioIdNum) {
              var valueFolio = lesphotos;
              creatFolio(el, valueFolio);
            }
          })
  
          data.photographers.forEach(el => {
            if(el.id === folioIdNum) {
              var valueFigure = presentation; // photographer presentation 
              creatFigure(el, valueFigure);
            }
          })
    }     else {
        //window.location.pathname = 'folio';
    }
  }
});