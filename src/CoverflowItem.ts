
/**
 * @author  raizensoft.com
 */

import Coverflow3D from "./Coverflow3D";

/**
 * CarouselItem
 * @class CarouselItem
 */
export default class CoverflowItem {

  c3d:Coverflow3D;
  el:HTMLDivElement;
  angle:number;
  xpos:number;
  ypos:number;
  zpos:number;
  xAngle:number;
  yAngle:number;
  index:number;

  constructor(c3d:Coverflow3D, index:number) {

    this.c3d = c3d;
    this.angle = 0;
    this.index = index;
    this.init();
  }

  /**
   * Init class components
   * @method init
   */
  private init() {

    const el = this.el = document.createElement('div');
    el.className = 'coverflow-item';
    
    // Add click interactive
    el.addEventListener('click', () => {
      this.c3d.target(this.index);
    });
  }

  /**
   * Set carousel position based on angle
   */
  setPosition(angle:number) {

    this.angle = angle;
    const xpos = Math.cos(angle * Math.PI / 180) * this.c3d.radius;
    const zpos = Math.sin(angle * Math.PI / 180) * this.c3d.radius;
    this.el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${90 - angle}deg) `;
  }

  setTransform(xpos:number, zpos:number, yAngle:number) {
    this.el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${yAngle}deg)`;
  }
  
  setBackground(url:string) {
    this.el.style.background = `url${url}`;
  }
}
