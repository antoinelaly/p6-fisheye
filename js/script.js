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
  videos.src = `img/${el.photographerId}/${el.video}`;
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

  //console.log(datum);
}

window.addEventListener('load', () => {
  fetch('https://raw.githubusercontent.com/antoinelaly/p6-fisheye/main/js/fisheyedatafr.json')
    .then(response => {
      return response.json();
    }).then(data => {

      displayData(data);
      ladata = data.media;

    }).catch(err => {
      console.log('Fetch Error :-S', err);
    });

  var select = document.getElementById("my-select");

  select.onchange = function (data) {
    lesphotos.innerHTML = '';

    var choice = select.value;
    const lesort = {
      'likes': false,
      'date': false,
      'price': true,
    }
    return lesort[sortResults(choice)] ?? "not found";

    function sortResults(prop, asc) {

      datum.sort(function (a, b) {
        if (asc) return ((a[prop] + "").toLowerCase() > (b[prop] + "").toLowerCase()) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      });
      //console.log(lesphotos);
      displayFolio();
      new AsyncGallery();
    }

    function displayFolio() {
      datum.forEach(el => {
        creatFolio(el, lesphotos);

      })
    }
  }


  function displayData(data) {

    var searchParams = new URLSearchParams(window.location.search);  // url get string id
    var folioId = searchParams.get('id'); // convert to var
    var folioIdNum = parseInt(folioId); // convert string to num

    if (home) {
      data.photographers.forEach(function (el, valueFigure) {
        var valueFigure = home;
        creatFigure(el, valueFigure); // homepage figures 
      })
    };
    if (tagpage && searchParams.has('id')) {
      data.photographers.forEach(el => {
        if (el.tags.includes(folioId)) {
          var valueFigure = tagpage;
          creatFigure(el, valueFigure); // tagpage figures
        }
      })
    };
    if (nav) { // nav buttons
      data.photographers.forEach(el => {
        var temp = [] // no duplication
        dataa = el.tags.filter((el) => {
          if (!temp.includes(el.userid)) {
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
    if (searchParams.has('id')) { // if id in url, folio id 
      data.media.forEach(el => {
        if (el.photographerId === folioIdNum) {
          creatFolio(el, lesphotos);
          datum.push(el);
        }
      })
      data.photographers.forEach(el => {
        if (el.id === folioIdNum) {
          var valueFigure = presentation; // photographer presentation 
          creatFigure(el, valueFigure);
        }
      })
    } else {
      //window.location.pathname = 'folio';
    }
  }
});

/******** Gallery ********/

class AsyncGallery {
  constructor(settings) {
    this.settings = {
      images: ".gallery__Image",
      loop: true,
      next: undefined,
      prev: undefined,
      close: undefined,
      loader: undefined,
      keyboardNavigation: true,
      hiddenElements: []
    };

    Object.assign(this.settings, settings);

    this.gallery = null;
    this.index = 0;
    this.items = [...document.querySelectorAll(this.settings.images)];

    this.addedItems = {};

    this.touch = {
      endX: 0,
      startX: 0
    };

    this.init();
  }

  get loading() {
    return !this.settings.hiddenElements.includes("loader");
  }

  init() {
    this.clearUncomplete();
    this.createElements();
    this.bindEvents();
  }

  clearUncomplete() {
    this.items = this.items.filter(item => {
      return item.dataset.large;
    });
  }

  createElements() {
    this.gallery = document.createElement("DIV");
    this.gallery.classList.add("asyncGallery");

    this.createSingleElement({
      element: "prev",
      type: "BUTTON",
      event: "click",
      func: this.getPrevious
    });

    this.createSingleElement({
      element: "next",
      type: "BUTTON",
      event: "click",
      func: this.getNext
    });

    this.createSingleElement({
      element: "close",
      type: "BUTTON",
      event: "click",
      func: this.closeGallery
    });

    this.createSingleElement({
      element: "loader",
      type: "SPAN",
      text: "Loading..."
    });

    window.document.body.append(this.gallery);
  }

  createSingleElement({ element, type, event = "click", func, text }) {
    if (!this.settings.hiddenElements.includes(element)) {
      if (!this.settings[element]) {
        this[element] = document.createElement(type);
        this[element].classList.add(
          `asyncGallery__${this.capitalizeFirstLetter(element)}`
        );
        this[element].innerHTML = text !== undefined ? text : element;
        this.gallery.append(this[element]);
      } else {
        this[element] = document.querySelector(this.settings[element]);
        this.gallery.append(this[element]);
      }

      if (func) {
        this[element].addEventListener(event, func.bind(this));
      }
    }
  }

  getItem(i, content = null) {
    let contentObj = content;
    if (contentObj === null) {
      contentObj = {};
      contentObj.src = this.items[i].dataset.large;
      contentObj.description = this.items[i].dataset.description;
    }

    if (!this.addedItems.hasOwnProperty(i)) {
      let image = document.createElement("IMG");
      let video = document.createElement("VIDEO");
      
      let galleryItem = document.createElement("DIV");
      galleryItem.classList.add("asyncGallery__Item");

      if (this.loading) {
        this.loader.classList.add("is-visible");
      }

      this.clearVisible();
      
      let lobject = contentObj.src;

      this.gallery.append(galleryItem);
      this.addedItems[i] = galleryItem;

      if (lobject.endsWith('mp4')) {
        video.src = contentObj.src;
        galleryItem.innerHTML = `
        <div class="asyncGallery__ItemImage">
          ${video.outerHTML}
        </div>
        `;
        video.addEventListener("load", () => {
          this.addedItems[i].loaded = true;
          if (!this.gallery.querySelector(".asyncGallery__Item.is-visible")) {
            this.addedItems[i].classList.add("is-visible");
          }
          if (this.loading) {
            this.loader.classList.remove("is-visible");
          }
        }); console.log(video);

      }  else if (lobject.endsWith('jpg')) {
        image.src = contentObj.src;
        galleryItem.innerHTML = `
        <div class="asyncGallery__ItemImage">
          ${image.outerHTML}
        </div>
        `;
        image.addEventListener("load", () => {
          this.addedItems[i].loaded = true;
          if (!this.gallery.querySelector(".asyncGallery__Item.is-visible")) {
            this.addedItems[i].classList.add("is-visible");
          }
          if (this.loading) {
            this.loader.classList.remove("is-visible");
          }
        });
      }
      
      image.alt = contentObj.description ? contentObj.description : "";
      if (contentObj.description) {
        galleryItem.innerHTML += `
            <div class="asyncGallery__ItemDescription">
              <p>${contentObj.description}</p>
            </div>
            `;
      }


    } else {
      this.clearVisible();
      if (this.addedItems[this.index].loaded) {
        this.addedItems[this.index].classList.add("is-visible");
        if (this.loading) {
          this.loader.classList.remove("is-visible");
        }
      } else if (this.loading) {
        this.loader.classList.add("is-visible");
      }
    }

    if (!this.settings.loop) {
      if (this.index === 0) this.prev.setAttribute("disabled", true);
      else this.prev.removeAttribute("disabled");

      if (this.index === this.items.length - 1)
        this.next.setAttribute("disabled", true);
      else this.next.removeAttribute("disabled");
    }
  }

  clearVisible() {
    if (this.gallery.querySelector(".asyncGallery__Item.is-visible")) {
      this.gallery
        .querySelector(".asyncGallery__Item.is-visible")
        .classList.remove("is-visible");
    }
  }

  closeGallery() {
    this.gallery.classList.remove("is-visible");
    this.clearVisible();
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleGesure() {
    if (this.touch.endX > this.touch.startX + 20) {
      this.getPrevious();
    } else if (this.touch.endX < this.touch.startX - 20) {
      this.getNext();
    }
  }

  getPrevious() {
    if (this.settings.loop) {
      this.index--;
      if (this.index === -1) {
        this.index = this.items.length - 1;
      }
      this.getItem(this.index);
    } else if (this.index > 0) {
      this.index--;
      this.getItem(this.index);
    }
  }

  getNext() {
    if (this.settings.loop) {
      this.index++;
      if (this.index === this.items.length) {
        this.index = 0;
      }
      this.getItem(this.index);
    } else if (this.index < this.items.length - 1) {
      this.index++;
      this.getItem(this.index);
    }
  }

  bindEvents() {
    this.items.forEach((item, i) => {
      item.addEventListener("click", e => {
        this.gallery.classList.add("is-visible");
        this.index = i;
        this.getItem(i, {
          src: e.target.dataset.large,
          description: e.target.dataset.description
        });
      });
    });

    document.addEventListener("keyup", e => {
      if (this.gallery.classList.contains("is-visible")) {
        if (e.key === "Escape") this.closeGallery();
        if (this.settings.keyboardNavigation) {
          if (e.keyCode === 39) this.getNext();
          else if (e.keyCode === 37) this.getPrevious();
        }
      }
    });

    this.gallery.addEventListener(
      "touchstart",
      e => {
        this.touch.startX = e.changedTouches[0].screenX;
      },
      false
    );

    this.gallery.addEventListener(
      "touchend",
      e => {
        this.touch.endX = e.changedTouches[0].screenX;
        this.handleGesure();
      },
      false
    );
  }
}

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

async function delayedGreeting() {
  await sleep(1000);
  new AsyncGallery();
}

delayedGreeting();