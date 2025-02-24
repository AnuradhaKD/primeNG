import {
  Component,
  Input,
  EventEmitter,
  Output,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [DatePicker, FormsModule, FloatLabelModule, ReactiveFormsModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() labelName: string = '';
  @Input() selectionMode: any = 'single';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;

  @Output() dateChange = new EventEmitter<Date>();

  selectedDate: Date | undefined;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedDate = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.onChange(this.selectedDate);
    this.dateChange.emit(this.selectedDate);
  }
}
