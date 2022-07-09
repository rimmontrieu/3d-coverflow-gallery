
import ImageQuery from './ImageQuery';
import Coverflow3D from './Coverflow3D';
import './style.css'

const API_KEY = "YOUR_API_KEY";

let currentImageSet:any = [];

// Init 3D coverflow
const coverflow = new Coverflow3D();

// Init image query service
const iq = new ImageQuery(API_KEY)

// Setup image input element
const imageInput = document.querySelector('.image-input') as HTMLInputElement;
imageInput!.addEventListener('change', () => {

  iq.query(imageInput.value, (data) => {

    currentImageSet = data.hits;
    const imgSet = currentImageSet.map((it:any) => it.webformatURL);
    if (currentImageSet[0]) coverflow.loadImageSet(imgSet);
  });
});

// Select all text on click
imageInput.addEventListener('click', () => {
  imageInput.select();
});

