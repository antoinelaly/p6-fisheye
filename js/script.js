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
  (videos = createNode("video")),
  (p = createNode("p")),
  (pp = createNode("p"));
  img.src = `img/${el.photographerId}/${el.image}`;
  videos.src = `img/${el.photographerId}/${el.video}`;
  p.innerHTML = `${el.date}`;
  pp.innerHTML = `${el.price} €    ${el.likes} &hearts;`;

  for (let j = 0; j < el.image.length; j++) {
  if (el.videos == undefined) { append(figure, img)}
  else { append(figure, videos)} ;
  }
  
  //append(figure, img) ; // if el.img null 
  append(figure, figcaption);
  append(figcaption, p);
  append(figcaption, pp);
  append(valueFolio, figure);
}

window.addEventListener('load', () => {
fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json') 
		.then(response => {
      return response.json();
    }).then(data => {
      displayData(data);
      
      mediaObj = data.media;
      photoObj = data.photographers;
      var dataObj = Object.assign({}, mediaObj, photoObj);
      //const dataObj = data.flat(Infinity);
      //console.log(dataObj);
      showObj(data);
      leFiltre(dataObj);

		}).catch(err => {
      console.log('Fetch Error :-S', err);
	});

function leFiltre(dataObj) {
  for (var item in dataObj) {
    console.log(dataObj[item]);
  }
}

function showObj(data) { // function dans fetch retourne data
  data.photographers.forEach(el => { 
    el.photographerId = el.id;
    //delete el.id;
  })
  console.log(data.photographers);

  data.media.forEach(el => { // loop in media 
    grapherid = el.photographerId; // objects
    limage = el.image || el.video;

  class MyClass {
    constructor() {
        this.graphes_ = []; // photographer id
        this.imgs_ = []; // 
    }

  set graphe(value) { this.graphes_.push(value); }
  get graphe() { return this.graphes_[this.graphes_.length - 1];}
  
  set img(value) { this.imgs_.push(value); }
  get img() { return this.imgs_[this.imgs_.length - 1];} 
}

  const myClassInstance = new MyClass();
  myClassInstance.graphe = grapherid;
  myClassInstance.img = limage;

  console.log(myClassInstance.imgs_);
  })
}


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

