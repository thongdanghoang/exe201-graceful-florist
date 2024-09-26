import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[headerTableTemplate]'
})
export class HeaderTableTemplateDirective {
  @Input('headerTableTemplate') column!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
