import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appHasError]'
})
export class HasErrorDirective implements OnInit {

  static CSS_CLASS = 'has-danger';

  @Input('appHasError') control: AbstractControl;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  private toggleError(): void {
    if (this.control.dirty && this.control.invalid) {
      this.renderer.addClass(this.el.nativeElement, HasErrorDirective.CSS_CLASS);
    } else {
      this.renderer.removeClass(this.el.nativeElement, HasErrorDirective.CSS_CLASS);
    }
  }

  ngOnInit(): void {
    this.toggleError();

    this.control.statusChanges.subscribe(() => {
      this.toggleError();
    });
  }

}
