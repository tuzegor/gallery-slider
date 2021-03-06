const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
//==========================================================
const galleryList = document.querySelector('.js-gallery');

const galleryItemsMarkup = galleryItems.map((elem, index) => {
  console.log(index);
  const item = document.createElement('li');
  item.classList.add('gallery__item');
  // -------
  const link = document.createElement('a');
  link.href = elem.original;
  link.classList.add('gallery__link');
  // -------
  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = elem.preview;
  image.alt = elem.description;
  image.setAttribute('source', elem.original);
  //--------
  link.appendChild(image);
  item.appendChild(link);
  console.log(item);
  return item;
});

galleryList.append(...galleryItemsMarkup);

console.log(galleryList);

//--------------------------------------------------------

const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = lightbox.querySelector('.lightbox__image');
let currentSlide = 0;
galleryList.addEventListener('click', openLightbox);

function openLightbox(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  lightbox.classList.add('is-open');
  event.preventDefault();

  currentSlide = galleryItems.findIndex(
    galleryItem => galleryItem.original === event.target.parentNode.href,
  );

  lightboxImage.src = galleryItems[currentSlide].original;

  window.addEventListener('keydown', scrollImage);
  window.addEventListener('keydown', closeLightboxOnEsc);
}

//--------------------------------------------------------
const closeLightboxButton = document.querySelector('[data-action="close-lightbox"]');
closeLightboxButton.addEventListener('click', closeLightbox);

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
}
function closeLightboxOnEsc(event) {
  if (event.code === 'Escape') {
    closeLightbox();
  }
}

function scrollImage(event) {
  const arrayForScroll = galleryItems.map((elem, index) => {
    return elem.original;
  });
  if (event.code === 'ArrowRight') {
    if (currentSlide === galleryItems.length - 1) {
      return;
    }
    currentSlide = currentSlide + 1;
    console.log(currentSlide);
    lightboxImage.src = galleryItems[currentSlide].original;
  }

  if (event.code === 'ArrowLeft') {
    if (currentSlide === 0) {
      return;
    }
    currentSlide = currentSlide - 1;
    console.log(currentSlide);
    lightboxImage.src = galleryItems[currentSlide].original;
  }
}
