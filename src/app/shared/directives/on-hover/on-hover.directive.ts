import { Directive, ElementRef, HostListener, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appOnHover]'
})
export class OnHoverDirective {

  //constructor(private el: ElementRef, private renderer: Renderer2) { }

  /*@HostListener('mouseenter') onMouseEnter(): void{
    this.renderer.addClass(this.el.nativeElement, 'mat-elevation-z6');
  }

  @HostListener('mouseleave') onMouseLeave(): void{
    this.renderer.removeClass(this.el.nativeElement, 'mat-elevation-z6');
  }*/


}
