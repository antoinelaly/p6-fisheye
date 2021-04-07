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

window.addEventListener('load', () => {
fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json') 
		.then(response => {
      return response.json();
    }).then(data => {
      displayData(data);
      
      mediaObj = data.media;
      photoObj = data.photographers;
      //console.log(photoObj);
      showObj(data);

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

function showObj(data) {

  class LePhotographe {
    constructor(photoObj) {
      this.name = photoObj.name;
      this.id = photoObj.id;
      this.city = photoObj.city;
      this.country = photoObj.country;
      this.tags = photoObj.tags;
      this.tagline = mediaObj.tagline;
      this.price = mediaObj.price;
      this.portrait = mediaObj.portrait;
      this.illustration = mediaObj.illustration;
    }
  }

  class FolioFactory {
    creat(photoObj) {
      return new LePhotographe(photoObj);
    }

    creatFromMedia(mediaObj) {
      const prepareMediaJson = {
        id: mediaObj.photographerId,
      };
      return new LePhotographe(mediaObj);
    }
  }

 const creatFromMedia = { photographerId: 82, };
 //console.log(photoObj.id);
}

function showObj(data) { // function dans fetch retourne data
  
  data.media.forEach(el => { // loop in media
    grapherid = el.photographerId; // objects
    limage = el.image;
    elvideo = el.video;

    class Media {
      constructor() {
        this._type = 'image';
      }
    }

  class MyClass {
    constructor() {
        this.graphes_ = []; // array from new n° photographer id
        this.imgs_ = []; // 
        this.videos_ = [];
        this.lemedia_ = [];

        let lemedia;
        this.creatMedia = function(el) {
          if (el === 'image' || el === 'video') lemedia = new Media();
          return lemedia_ = [];
        }  
    }

  set graphe(value) { this.graphes_.push(value); }
  get graphe() { return this.graphes_[this.graphes_.length - 1];}
  
  set img(value) { this.imgs_.push(value); }
  get img() { return this.imgs_[this.imgs_.length - 1];}

  set video(value) { this.videos_.push(value); }
  get video() { return this.videos_[this.imgs_.length - 1];}

  //set fullMedia(value) { this.imgs_.push(value) || this.videos_.push(value); }
  //get fullMedia() { return this.imgs_[this.imgs_.length - 1] || this.videos_[this.imgs_.length - 1]; }

}

  const myClassInstance = new MyClass();
  myClassInstance.graphe = grapherid;
  myClassInstance.img = limage;
  myClassInstance.video = elvideo;

  //console.log(myClassInstance.graphes_);
  //console.log(myClassInstance.videos_);
  console.log(limage);
  //console.log(lemedia_);
  
  })
}