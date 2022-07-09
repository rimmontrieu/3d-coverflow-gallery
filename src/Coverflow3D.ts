
import CoverflowItem from './CoverflowItem';

/**
 * @author  raizensoft.com
 */
const ITEM_DISTANCE = 200;
const ITEM_ANGLE = -45;
const CENTER_ITEM_POP = 500;
const CENTER_ITEM_DISTANCE = 80;

/**
 * Carousel3D
 * @class Carousel3D
 */
export default class Coverflow3D {

  size:number;
  el:HTMLDivElement;
  total:number;
  radius:number;
  citems:CoverflowItem[];

  constructor(size:number = 400, total:number = 20, radius:number = 1000) {

    // Item size and default total items
    this.size = size;
    this.total = total;
    this.radius = radius;
    this.init();
  }

  /**
   * Init class components
   * @method init
   */
  private init() {

    const el = this.el = document.querySelector('.coverflow-3d') as HTMLDivElement;
    this.el.style.transform = `scale(1) translateZ(-350px) rotateX(-2deg)`;

    // Generate flow items
    this.citems = [];
    for (let i = 0; i < this.total; i++) {

      const ci = new CoverflowItem(this, i);
      this.el.appendChild(ci.el);
      this.citems.push(ci);
    }

    // Target the center item by default
    this.target(Math.round(this.total * 0.5));
  }

  /**
   * Bring an item to center
   */
  target(index:number) {

    for (let i = 0; i < this.total; i++) {

      const ci = this.citems[i];

      // Center item position and angle
      if (i == index)
        ci.setTransform(0, CENTER_ITEM_POP, 0);
      // Left items position and angle
      else if (i < index) {
        ci.setTransform((i - index) * ITEM_DISTANCE - CENTER_ITEM_DISTANCE, 0, -ITEM_ANGLE);
      }
      // Right items position and angle
      else
        ci.setTransform((i - index) * ITEM_DISTANCE + CENTER_ITEM_DISTANCE, 0, ITEM_ANGLE);
    }
  }
  
  loadImageSet(imgSet:any[]) {

    // Assign image to each item
    for (let i = 0; i < this.el.children.length; i++) {

      const item = this.el.children[i] as HTMLDivElement;
      item.style.backgroundImage = `url(${imgSet[i]})`;
    }
  }

}
