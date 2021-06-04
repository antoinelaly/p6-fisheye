const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.getElementById("main-wrapper").setAttribute("aria-hidden", "true");
  document.getElementById("lemodal").setAttribute("aria-hidden", "false");
}
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  document.getElementById("main-wrapper").setAttribute("aria-hidden", "false");
  document.getElementById("lemodal").setAttribute("aria-hidden", "true");
}

for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener('click', function () {
    openModal();
  });
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

/************* form  *************/
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
/* counter select */
function theCounter() {
  setTimeout(function () {
    var qtyIncs = document.querySelectorAll(".qty-inc");
    qtyIncs.forEach((el) => {
      el.addEventListener("click", function (e) {
        e.target.previousElementSibling.value++;
        // La propriété renvoie le nœud (node) précédant immédiatement le nœud courant 
        // dans la liste de son parent
        console.log('value', value);
      })
    })
    //console.log('FB loaded after 2s');
  }, 2000);
  //console.log('Started');
}
/******** Gallery ********/

class AsyncGallery {
  constructor(settings) {
    this.settings = {
      images: ".gallery__Image",
      loop: true,
      next_image: undefined,
      previous_image: undefined,
      close_dialog: undefined,
      loader: undefined,
      keyboardNavigation: true,
      hiddenElements: [],
      gallery: null,
      index: 0,
      touch: { endX: 0, startX: 0 },
    };

    Object.assign(this.settings, settings);
    // La méthode Object.assign permet de copier les valeurs sur un autre objet cible
    // The JavaScript this keyword refers to the object it belongs to.

    this.items = [...document.querySelectorAll(this.settings.images)];
    // L’index items du portfolio est constitué à partir du DOM 
    // et en particulier de l’attribut de class image “gallery__Image”.


    this.addedItems = {};

    this.init();
  }

  get loading() {
    return !this.settings.hiddenElements.includes("loader");
  }

  init() {
    this.createElements(); //  initi dom
    this.bindEvents();
  }

  clearUncomplete() {
    this.items = this.items.filter(item => {
      return item.dataset.large;
      // dataset fournit un accès à l’attributs large en mode lecture et écriture 
    });
  } 

  createElements() { // creat in dom
    this.gallery = document.createElement("DIV");
    this.gallery.classList.add("asyncGallery");
    // environnement global et associés aux éléments de navigation

    this.createSingleElement({
      element: "previous_image",
      type: "BUTTON",
      event: "click",
      func: this.getPrevious
    });

    this.createSingleElement({
      element: "next_image",
      type: "BUTTON",
      event: "click",
      func: this.getNext
    });

    this.createSingleElement({
      element: "close_dialog",
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
    if (!this.settings.hiddenElements.includes(element)) { // !this false value, s'il n'a pas été créé
      if (!this.settings[element]) { // this[] keyword to retrive a value from a class instant
        this[element] = document.createElement(type); // next_image, BUTTON
        this[element].classList.add( 
          `asyncGallery__${this.capitalizeFirstLetter(element)}` // asyncGallery__Next_image
        );
        this[element].innerHTML = text !== undefined ? text : element;
        this.gallery.append(this[element]); 
      } else {
        this[element] = document.querySelector(this.settings[element]); // s'il existe le retrouver
        this.gallery.append(this[element]);
      }

      if (func) {
        this[element].addEventListener(event, func.bind(this));
      } // La méthode bind() crée une nouvelle fonction qui, lorsqu'elle est appelée, a pour contexte this la valeur passée // en paramètre et éventuellement une suite d'arguments qui précéderont ceux fournis à l'appel de la fonction créée.
    }
  }

  getItem(i, content = null) { 
    let contentObj = content;
    if (contentObj === null) {
      contentObj = {};
      contentObj.src = this.items[i].dataset.large;
      contentObj.description = this.items[i].dataset.description;
      // dataset fournit un accès en mode lecture et écriture, 
      // à tous les attributs de données sur mesure (data- large)
    }

    if (!this.addedItems.hasOwnProperty(i)) { // s'il n'est pas déjà créé
      let image = document.createElement("IMG");
      let video = document.createElement("VIDEO");
      if (video.canPlayType("video/mp4")) {
        video.setAttribute("src", `${video.outerHTML}`);
        // innerHTML as default. This replaces only the content inside the current element referred to. 
        // If you are using outerHTML, then the element referred to will also be replaced.
      } else { 
        image.setAttribute("src", `${image.outerHTML}`);
      }
      video.setAttribute("width", "640"); // specific attr for video
      video.setAttribute("height", "480");
      video.setAttribute("controls", "controls");

      let galleryItem = document.createElement("DIV");
      galleryItem.classList.add("asyncGallery__Item");

      if (this.loading) {
        this.loader.classList.add("is-visible");
      }

      this.clearVisible();

      this.gallery.append(galleryItem);
      this.addedItems[i] = galleryItem; // !

      if (contentObj.src.endsWith('mp4')) { // La méthode renvoie un booléen indiquant si la chaine 
        // de caractères se termine par la chaine de caractères fournie en argument.

        video.addEventListener("loadeddata", () => {
          //console.log('mp4');
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
      } else if (contentObj.src.endsWith('jpg')) { 
        image.addEventListener("load", () => {
          this.addedItems[i].loaded = true;

          if (!this.gallery.querySelector(".asyncGallery__Item.is-visible")) {
            this.addedItems[i].classList.add("is-visible");
          }
          if (this.loading) {
            this.loader.classList.remove("is-visible");
          }
        });
        image.src = contentObj.src;
        image.alt = contentObj.src;
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
    this.items.forEach((item, i) => { // items index allready completed
      item.addEventListener("click", e => { // 1 start here 
        this.gallery.classList.add("is-visible");
        this.index = i;
        this.getItem(i, { // getItem
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

  // Le slider est tactile et sensible aux touches du clavier flèches, enter, space et excape

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

// étant donnée que le script travail à partir du DOM 
// il est nécessaire de faire patienter l’activation du script

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

