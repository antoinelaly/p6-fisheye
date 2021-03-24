
var home = document.querySelector(".out");
var lesphotos = document.querySelector(".lesphotos");
var presentation = document.querySelector(".presentation");
var nav = document.querySelector(".nav");

function createNode(element) {
	return document.createElement(element);
}
function append(parent, el) {
	return parent.appendChild(el);
}
/*function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}*/
function sortJSON(data, key) {
  return data.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}



window.addEventListener('load', () => {


fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
.then(response => {
  return response.json();
}).then(data => {

  var searchParams = new URLSearchParams(window.location.search);
  // url get string id

  if(nav) {
    data["photographers"].forEach(function (el){
      
      var temp = [ ]
      data = el.tags.filter((el)=>{
      if(!temp.includes(el.userid)){
        temp.push(el.userid)
        return true;
      }
      });

      let ul = createNode("ul");
      for (let j = 0; j < data.length; j++) {

        let liTags = createNode("li");
        liTags.className = "petitsb"; 
        liTags.innerHTML = data[j];
        append(ul, liTags);
      }

      append(nav, ul);

    })
  };

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

  if(searchParams.has('id')) { // s'il y a un id dans l'url
    var folioId = searchParams.get('id'); // convert to var
    var folioIdNum = parseInt(folioId); // convert string to num

        data["media"].forEach(function (el){ // start looping in media
          if(el['photographerId'] === folioIdNum) { // target objets
            
            let figure = createNode("figure"), // creat html
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
        console.log(lesphotos);

        data["photographers"].forEach(function (el){
          if(el['id'] === folioIdNum) {

            let ul = createNode("ul"),
            figure = createNode("figure"),
            button = createNode("button"),
            figcaption = createNode("figcaption");
            (img = createNode("img")),
            (h1 = createNode("h1")),
            (p = createNode("p"));
            h1.innerHTML = `${el.name}`;
            p.innerHTML = `${el.city}, ${el.country} <br>${el.tagline}`;
            ul.setAttribute("aria-label", "Secondary navigation");

            for (let i = 0; i < el.tags.length; i++) {
              let liTags = createNode("li");
              liTags.className = "petitsb"; 
              liTags.innerHTML = el.tags[i];
              append(ul, liTags);
            }

            img.src = `img/${el.illustration}`;
            button.innerHTML = "Contactez-moi";
            button.className = "push-right";
            append(figure, figcaption);
            append(figcaption, h1);
            append(figcaption, p);
            append(figcaption, ul);
            append(figure, button);
            append(figure, img);
            append(presentation, figure);
          }
        })

  }     else {
      //window.location.pathname = 'folio';
  }

 

}).catch(err => {
  console.log('Fetch Error :-S', err);
});
});