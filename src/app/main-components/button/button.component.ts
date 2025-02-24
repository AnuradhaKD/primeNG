import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() btnLabel: string = '';
  @Input() btnType: string = 'button';
  @Input() btnSeverity: any = 'primary';
  @Input() btnIcon: string = '';
  @Input() btnVariant: any = '';
  @Input() loading: boolean = false;
  @Input() isBtnDisabled: boolean = false;
  @Input() isBtnRaised: boolean = false;

  @Output() buttonClick = new EventEmitter<void>();

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.buttonClick.emit();
  }
}
