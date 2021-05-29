var home = document.querySelector(".out");
var lesphotos = document.querySelector(".lesphotos");
var presentation = document.querySelector(".presentation");
var nav = document.querySelector(".nav");
var tagpage = document.querySelector(".tagpage");
var lenom = document.querySelector(".lenom");

function createNode(element) {
  return document.createElement(element);
};
function append(parent, el) {
  return parent.appendChild(el);
};

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
  if (lesphotos) {
    lenom.innerHTML = `${el.name}`;
  }
  aImg.href = `folio.html?id=${el.id}`;
  if (home) {
    img.src = `img/${el.illustration}`;
  } else {
    img.src = `img/${el.portrait}`;
  }
  img.setAttribute("alt", `${el.name}`);
  p.innerHTML = `${el.city} <br>${el.tagline} <br>${el.price}€/jour`;
  ul.setAttribute("aria-label", "Secondary navigation");
  for (let j = 0; j < el.tags.length; j++) {
    let liTags = createNode("li");
    (aTag = createNode("a"));
    liTags.className = "petitsb";
    aTag.href = `tag.html?id=${el.tags[j]}`;
    aTag.innerHTML = `#${el.tags[j]}`;
    append(ul, liTags);
    append(liTags, aTag);
  }
  append(figure, aImg);
  append(aImg, img);
  append(figure, figcaption);
  append(figcaption, h2);
  append(figcaption, p);
  append(figcaption, ul);
  append(valueFigure, figure);
};

var datum = [];

function creatFolio(el, lesphotos) {
  let figure = createNode("figure"),
    figcaption = createNode("figcaption");
  (img = createNode("img")),
    (videos = createNode("video")),
    (p = createNode("p")),
    (pp = createNode("p")),
    (input = createNode("input")),
    (button = createNode("button")),
    (aImg = createNode("a")),
    (aVid = createNode("a"));
  img.src = `img/${el.photographerId}/${el.image}`;
  img.setAttribute("alt", `${el.image}`);
  if (videos.canPlayType("video/mp4")) {
    videos.setAttribute("src", `img/${el.photographerId}/${el.video}`);
    videos.setAttribute("alt", `${el.videos}`);
  } else {
    videos.setAttribute("src", `img/${el.photographerId}/${el.video}`);
    videos.setAttribute("alt", `${el.videos}`);
  }
  videos.setAttribute("width", "320");
  videos.setAttribute("height", "240");
  videos.setAttribute("controls", "controls");
  img.className = `gallery__Image`;
  videos.className = `gallery__Image`;
  img.setAttribute('data-description', `${el.date}  ${el.price} € ${el.likes} &hearts;`);
  img.setAttribute('data-large', `img/${el.photographerId}/${el.image}`);
  videos.setAttribute('data-description', `${el.date}`);
  videos.setAttribute('data-large', `img/${el.photographerId}/${el.video}`);
  p.innerHTML = `${el.date}`;
  pp.innerHTML = `${el.price} €`;
  input.setAttribute("type", "number");
  input.setAttribute("value", `${el.likes}`);
  input.setAttribute("aria-label", "Likes");
  button.className = `qty-inc`;
  button.innerHTML = `&hearts;`;
  if (el.video == undefined) { append(figure, img); }
  else if (el.image == undefined) { append(figure, videos); };
  append(figure, figcaption);
  append(figcaption, p);
  append(figcaption, pp);
  append(figcaption, input);
  append(figcaption, button);
  append(lesphotos, figure);
};

function creatNav(dataa, nav) {
  let ul = createNode("ul");
  (aTag = createNode("a"));
  for (let j = 0; j < dataa.length; j++) {
    let liTags = createNode("li");
    (aTag = createNode("a"));
    liTags.className = "petitsb";
    aTag.href = `tag.html?id=${dataa[j]}`;
    aTag.innerHTML = `#${dataa[j]}`;
    append(ul, liTags);
    append(liTags, aTag);
    append(nav, ul); // f
  }
};

/* count */

setTimeout(function () {
  var qtyIncs = document.querySelectorAll(".qty-inc");
  qtyIncs.forEach((el) => {
    el.addEventListener("click", function (e) {
      e.target.previousElementSibling.value++;
      console.log('value', value);
    })
  })
}, 2000);
/************* selecteur  *************/
var select = document.getElementById("my-select");

if (lesphotos) {
  select.onchange = function(data) {
    lesphotos.innerHTML = '';
    var choice = select.value;
      switch (choice) {
        case 'likes':
          sortResults('likes', false);
          break;
        case 'date':
          sortResults('date', false);
          break;
        case 'price':
          sortResults('price', false);
          break;
      }
    }
  function sortResults(prop, asc) {

    datum.sort(function (a, b) {
      if (asc) return ((a[prop] + "").toLowerCase() > (b[prop] + "").toLowerCase()) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    displayFolio();
    new AsyncGallery();
    theCounter();
  }
}
function displayFolio() {
  datum.forEach(el => {
    creatFolio(el, lesphotos);
  })
}
/************* selecteur  *************/

function photographe(leuser) { // folio photographe
  leuser.map(el => {
    var valueFigure = presentation;
    creatFigure(el, valueFigure);
  })
};
function photos(lefolio) { // folio photos
  lefolio.map(el => {
    creatFolio(el, lesphotos);
    datum.push(el);
  })
};
function graphes(lahome) { // la home
  lahome.map(el => {
    var valueFigure = home;
    if (home) {
      creatFigure(el, valueFigure);
    }
  })
};
function tagp(lestags) { // page tags 
  lestags.map(el => {
    var valueFigure = tagpage;
    creatFigure(el, valueFigure);
  })
};
function tagp(lestags) { // page tags 
  lestags.map(el => {
    var valueFigure = tagpage;
    creatFigure(el, valueFigure);
  })
};
function tagn(dataa) { // nav tags 
  creatNav(dataa, nav)
};

window.addEventListener('load', () => {
  fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
    .then(response => {
      return response.json();
    }).then(data => {

      let db_users = data.photographers;
      let bd_posts = data.media;

      class DBUser {
        constructor(id) {
          this.id = id;
        }

        static getPosts(db, userUID) {
          const map = new Map(Object.entries(db));
          const values = map.values();
          let posts = [];
          for (let item of values) {
            if (item.photographerId === userUID) {
              posts.push(item);
            }
          }
          return posts;
        }
        static getUsers(db, userUID) {
          const map = new Map(Object.entries(db));
          const values = map.values();
          let posts = [];
          for (let item of values) {
            if (item.id === userUID) {
              posts.push(item);
            }
          }
          return posts;
        }
        static getTags(db, userUID) {
          const map = new Map(Object.entries(db));
          const values = map.values();
          let posts = [];
          for (let item of values) {
            if (item.tags.includes(userUID)) {
              posts.push(item);
            }
          }
          return posts;
        }
        static tagsNav(db) {
          const map = new Map(Object.entries(db));
          const values = map.values();
          let posts = [];
          for (let item of values) {
            if (!item.tags.includes(posts)) {
              posts.push(item.tags);
            }
          }
          return posts;
        }
      };

      var searchParams = new URLSearchParams(window.location.search);
      var folioId = searchParams.get('id');
      var folioIdNum = parseInt(folioId);

      var leuser = DBUser.getUsers(db_users, folioIdNum); // folio photographe
      photographe(leuser);
      var lefolio = DBUser.getPosts(bd_posts, folioIdNum); // folio photos
      photos(lefolio);
      var lahome = DBUser.getPosts(db_users);  // la home
      graphes(lahome);
      var lestags = DBUser.getTags(db_users, folioId); // page tags 
      tagp(lestags);
      if (nav) {
        var tagsnav = DBUser.tagsNav(db_users); // page nav 
        var dataa = [...new Set(tagsnav[0].concat(tagsnav[1], tagsnav[2], tagsnav[3], tagsnav[4], tagsnav[5]))]
        tagn(dataa);
      }
    });


}).catch(err => {
  console.log('Fetch Error :-S', err);
});
