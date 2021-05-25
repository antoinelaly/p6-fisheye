const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

const openModal = function() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden')
}

for(let i = 0; i < btnOpenModal.length; i++) {
    btnOpenModal[i].addEventListener('click', function(){
        openModal();
    });
}

btnCloseModal.addEventListener('click',closeModal );
overlay.addEventListener('click', closeModal);

/************* modal / form  *************/
const form = document.getElementById("form");
form.addEventListener("submit", e => {
  e.preventDefault(); // method useful when Clicking on a "Submit" button
  functionValidation();
});

function functionValidation() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

function sConsole(event) {
  event.preventDefault();
  var first = document.getElementById("first");
  console.log('Prénom : ', first.value);
  var last = document.getElementById("last");
  console.log('Nom : ', last.value);
  var email = document.getElementById("email");
  console.log('Email : ', email.value);
  var message = document.getElementById("message");
  console.log('Message : ', message.value);
}  

/* count */
setTimeout(function() {
var qtyIncs = document.querySelectorAll(".qty-inc");

qtyIncs.forEach((el) => {
  el.addEventListener("click",function(e){
    e.target.previousElementSibling.value++;
    //e.target.previousElementSibling.stepUp(1);
  })
})
console.log('FB loaded after 2s');
}, 2000);
console.log('Started');


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
      hiddenElements: [],
      gallery: null,
      index: 0,
      touch: { endX: 0, startX: 0 },
    };

    Object.assign(this.settings, settings);

    this.items = [...document.querySelectorAll(this.settings.images)];

    this.addedItems = {};

    this.init();
  }

  get loading() {
    return !this.settings.hiddenElements.includes("loader");
  }

  init() {
    //this.clearUncomplete();
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
      if (video.canPlayType("video/mp4")) {
        video.setAttribute("src",`${video.outerHTML}`);
      } else {
        video.setAttribute("src",`${video.outerHTML}`);
      }
      video.setAttribute("width", "640");
      video.setAttribute("height", "480");
      video.setAttribute("controls", "controls");

      let galleryItem = document.createElement("DIV");
      galleryItem.classList.add("asyncGallery__Item");

      if (this.loading) {
        this.loader.classList.add("is-visible");
      }
      
      this.clearVisible();

      //let lobject = contentObj.src; 
      this.gallery.append(galleryItem);
      this.addedItems[i] = galleryItem;

      if  (contentObj.src.endsWith('mp4')) {
        
        video.addEventListener("loadeddata", () => {
          console.log('mp4');
          this.addedItems[i].loaded = true;
          
          if (!this.gallery.querySelector(".asyncGallery__Item.is-visible")) {
            this.addedItems[i].classList.add("is-visible");
          }
          if (this.loading) {
            this.loader.classList.remove("is-visible");
          }
        });
        video.src = contentObj.src;
        galleryItem.innerHTML = `
        <div class="asyncGallery__ItemImage">
          ${video.outerHTML}
        </div>
        `;
      }  else if (contentObj.src.endsWith('jpg')) {
        image.addEventListener("load", () => {
          console.log('jpg');
          this.addedItems[i].loaded = true;
          
          if (!this.gallery.querySelector(".asyncGallery__Item.is-visible")) {
            this.addedItems[i].classList.add("is-visible");
          }
          if (this.loading) {
            this.loader.classList.remove("is-visible");
          }
        });
        image.src = contentObj.src;
        galleryItem.innerHTML = `
        <div class="asyncGallery__ItemImage">
          ${image.outerHTML}
        </div> 
        `;
      } 

      image.alt = contentObj.description ? contentObj.description : "";
      video.alt = contentObj.description ? contentObj.description : "";
      
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

