import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[cellTableTemplate]'
})
export class CellTableTemplateDirective {
  @Input('cellTableTemplate') column!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
