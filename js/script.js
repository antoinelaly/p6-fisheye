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
  aImg.href = `folio.html?id=${el.id}`;
  if (home) {
    img.src = `img/${el.illustration}`;
  } else {
    img.src = `img/${el.portrait}`;
  }
  p.innerHTML = `${el.city} <br>${el.tagline} <br>${el.price}€/jour`;
  ul.setAttribute("aria-label", "Secondary navigation");
  for (let j = 0; j < el.tags.length; j++) {
    let liTags = createNode("li");
    (aTag = createNode("a"));
    aTag.href = `tag.html?id=${el.tags[j]}`;
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

var datum = [];

function creatFolio(el, lesphotos) {
  let figure = createNode("figure"),
    figcaption = createNode("figcaption");
  (img = createNode("img")),
    (videos = createNode("video")),
    (p = createNode("p")),
    (pp = createNode("p")),
    (aImg = createNode("a")),
    (aVid = createNode("a"));
  img.src = `img/${el.photographerId}/${el.image}`;
  if (videos.canPlayType("video/mp4")) {
    videos.setAttribute("src", `img/${el.photographerId}/${el.video}`);
  } else {
    videos.setAttribute("src", `img/${el.photographerId}/${el.video}`);
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
  pp.innerHTML = `${el.price} €    ${el.likes} &hearts;`;
  if (el.video == undefined) { append(figure, img); }
  else if (el.image == undefined) { append(figure, videos); };
  append(figure, figcaption);
  append(figcaption, p);
  append(figcaption, pp);
  append(lesphotos, figure);
}
function creatNav(dataa, nav) {
  let ul = createNode("ul");
  (aTag = createNode("a"));
  for (let j = 0; j < dataa.length; j++) {
    let liTags = createNode("li");
    (aTag = createNode("a"));
    aTag.href = `tag.html?id=${dataa[j]}`;
    liTags.className = "petitsb";
    liTags.innerHTML = `#${dataa[j]}`;
    append(ul, aTag);
    append(aTag, liTags);
    append(nav, ul);
  }
}

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
  //const combined1 = [].concat(array1, array2, array3, array4);
  console.log('merged2', dataa);
  //merged.map(dataa => {
    //console.log('merged', merged);
    creatNav(dataa, nav)
  //})
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
      }

      var searchParams = new URLSearchParams(window.location.search);
      var folioId = searchParams.get('id');
      var folioIdNum = parseInt(folioId);

      var leuser = DBUser.getUsers(db_users, folioIdNum); // folio photographe
      photographe(leuser);
      var lefolio = DBUser.getPosts(bd_posts, folioIdNum); // folio photos
      photos(lefolio);
      var lahome = DBUser.getPosts(db_users);  // la home
      graphes(lahome);
      //tagnav(lahome);
      var lestags = DBUser.getTags(db_users, folioId); // page tags 
      tagp(lestags);
      var tagsnav = DBUser.tagsNav(db_users); // page nav 
      var dataa = [...new Set(tagsnav[0].concat(tagsnav[1],tagsnav[2],tagsnav[3],tagsnav[4],tagsnav[5]))]
      //var merged = {...tagsnav[0], ...tagsnav[1], ...tagsnav[2],...tagsnav[3], ...tagsnav[4], ...tagsnav[5]};
      tagn(dataa);
      //console.log('merged', merged);
    });
    

}).catch(err => {
  console.log('Fetch Error :-S', err);
});
