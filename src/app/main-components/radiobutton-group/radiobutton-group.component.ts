import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radiobutton-group',
  standalone: true,
  imports: [FormsModule, RadioButtonModule, CommonModule],
  templateUrl: './radiobutton-group.component.html',
  styleUrls: ['./radiobutton-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiobuttonGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadiobuttonGroupComponent implements ControlValueAccessor {
  @Input() categories: { name: string; key: string }[] = [];
  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
  @Input() labelName: string = '';

  @Output() onRadioButtonValueChange = new EventEmitter<any>();

  selectedValue: string | null = null;

  onRadioValueChange(event: any) {
    //if (event.value !== this.selectedValue) {
    this.selectedValue = event.target.value;
    this.onChange(this.selectedValue);
    this.onRadioButtonValueChange.emit(this.selectedValue);
    //}
  }
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onBlur() {
    this.onTouched();
  }
}
