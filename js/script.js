
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
function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === 'string' ?
    a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ?
    b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      order === 'desc' ? comparison * -1 : comparison);

  };
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

/*function creatFolio(e, valueFolio) {
  let figure = createNode("figure"), 
  figcaption = createNode("figcaption");
  (img = createNode("img")),
  (p = createNode("p")),
  (pp = createNode("p"));
  img.src = `img/${e.photographerId}/${e.image}`;
  p.innerHTML = `${e.date}`;
  pp.innerHTML = `${e.price} €    ${e.likes} &hearts;`;
  append(figure, img);
  append(figure, figcaption);
  append(figcaption, p);
  append(figcaption, pp);
  append(valueFolio, figure);
}*/

window.addEventListener('load', () => {

fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
.then(response => {
  return response.json();
}).then(data => {

  var searchParams = new URLSearchParams(window.location.search);
  // url get string id
  var folioId = searchParams.get('id'); // convert to var
  var folioIdNum = parseInt(folioId); // convert string to num

  if(home) {
    data["photographers"].forEach(function (el, valueFigure){
      var valueFigure = home;
      creatFigure(el, valueFigure); // homepage figures 
    })
  };

  if(tagpage && searchParams.has('id')) {
    data["photographers"].forEach(function (el){
      if(el['tags'].includes(folioId)) { 
        var valueFigure = tagpage;
        creatFigure(el, valueFigure); // tagpage figures
      }
    })
  };

  if(nav) { // nav buttons
    data["photographers"].forEach(function (el){

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
        data["media"].forEach(function (el){ // in data media
          if(el['photographerId'] === folioIdNum) { // photographer id

            el.sort((a, b) => { return a.likes - b.likes; });
            el.forEach((e) => { 
              
              let figure = createNode("figure"), 
              figcaption = createNode("figcaption");
              (img = createNode("img")),
              (p = createNode("p")),
              (pp = createNode("p"));
              img.src = `img/${e.photographerId}/${e.image}`;
              p.innerHTML = `${e.date}`;
              pp.innerHTML = `${e.price} €    ${e.likes} &hearts;`;
              append(figure, img);
              append(figure, figcaption);
              append(figcaption, p);
              append(figcaption, pp);
              append(valueFolio, figure);
              creatFolio(e, lesphotos); 
            
            });
          }
        })

        data["photographers"].forEach(function (el){
          if(el['id'] === folioIdNum) {
            var valueFigure = presentation; // photographer presentation 
            creatFigure(el, valueFigure);
          }
        })

  }     else {
      //window.location.pathname = 'folio';
  }

}).catch(err => {
  console.log('Fetch Error :-S', err);
});
});