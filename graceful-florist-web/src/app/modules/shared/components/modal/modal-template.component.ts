import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'graceful-florist-modal',
  templateUrl: './modal-template.component.html'
})
export class ModalTemplateComponent {
  @Input() title: string = '';
  @Input() primaryBtnClass: string = '';
  @Input() customFooter: boolean = false;
  @Input() hidePrimaryButton: boolean = false;
  @Input() hideSecondaryButton: boolean = false;
  @Input() hideDeleteButton: boolean = true;
  @Input() saveBtnLbl: string = 'Confirm';
  @Input() closeBtnLbl: string = 'Cancel';
  @Input() deleteBtnLbl: string = 'Delete';
  @Input() disablePrimaryButton: boolean = false;
  @Input() disableSecondaryButton: boolean = false;
  @Output() readonly saveEvent: EventEmitter<any> = new EventEmitter();
  @Output() readonly closeEvent: EventEmitter<any> = new EventEmitter();
  @Output() readonly backEvent: EventEmitter<any> = new EventEmitter();
  @Output() readonly deleteEvent: EventEmitter<any> = new EventEmitter();

  disableSubmitBtn = false;

  close(): void {
    this.closeEvent.emit();
  }

  save(): void {
    this.saveEvent.emit();
  }

  delete(): void {
    this.deleteEvent.emit();
  }

  enableSubmitButton(): void {
    this.disableSubmitBtn = false;
  }

  disableSubmitButton(): void {
    this.disableSubmitBtn = true;
  }
}
