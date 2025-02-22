import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
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

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
