import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]',
  standalone: true
})
export class RenduDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.fontWeight = 'bold'
    el.nativeElement.style.color = 'green'
   }

}
