import {Directive, ElementRef} from '@angular/core';

/**
 * Generated class for the RainbowDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[rainbow]' // Attribute selector
})
export class RainbowDirective {

  public rainbow: Array<string> = [
    'red', 'orange', 'yellow', 'green', 'blue', 'purple'
  ];

  constructor(element: ElementRef) {
    this.changeColor(element);
  }

  /**
   * Changes the color of the html element every 2 secs
   * @param element
   */
  changeColor(element) {
    element.nativeElement.style.color = this.rainbow[0];
    let index = 1;
    setInterval(() => {
      element.nativeElement.style.color = this.rainbow[index];
      index++;
      index = index % 6;
    }, 2000)
  }

}
