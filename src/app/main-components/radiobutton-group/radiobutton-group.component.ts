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
  @Input() selectedValue: string | null = null; // This will hold the selected value from the form
  @Output() selectedValueChange = new EventEmitter<string | null>();

  private onChange: (value: string | null) => void = () => {}; // function to call when value changes
  private onTouched: () => void = () => {}; // function to call when input is touched

  // Required methods from ControlValueAccessor
  writeValue(value: string | null): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Handle value changes in the radio button group
  onSelectionChange(value: string | null) {
    this.selectedValue = value;
    this.onChange(value); // Notify the form about the change
    this.selectedValueChange.emit(value);
  }

  // Handle blur event to mark the control as touched
  onBlur() {
    this.onTouched();
  }
}
