
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
    //var folioId = searchParams.get('id'); // convert to var
    //var folioIdNum = parseInt(folioId); // convert string to num

        data["media"].forEach(function (el){ // in data media
          if(el['photographerId'] === folioIdNum) { // photographer id

            var array = [];
            for (var key in el) {
              array.push(likes[key]);
            }
            array.sort(function(a, b){
                return b.score - a.score;
            });
            var rank = 1;
            for (var i = 0; i < array.length; i++) {
              if (i > 0 && array[i].score < array[i - 1].score) {
                rank++;
              }
              array[i].rank = rank;
            }
            
            console.log(array);
            
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
            append(lesphotos, figure);

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