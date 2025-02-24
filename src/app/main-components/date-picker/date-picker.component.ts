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
  @Input() selectionMode: 'single' | 'range' = 'single';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;

  @Output() dateChange = new EventEmitter<
    Date | [Date | null, Date | null] | null
  >();

  selectedDate: Date | [Date | null, Date | null] | null = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (this.selectionMode === 'single') {
      // Handle single date value (can be a string or Date)
      this.selectedDate = value ? new Date(value) : null;
    } else if (
      this.selectionMode === 'range' &&
      Array.isArray(value) &&
      value.length === 2
    ) {
      // Handle date range with null values
      const startDate = value[0] ? new Date(value[0]) : null;
      const endDate = value[1] ? new Date(value[1]) : null;
      this.selectedDate = [startDate, endDate];
    } else {
      this.selectedDate = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDateChange(event: any) {
    if (this.selectionMode === 'single') {
      // For single date
      this.selectedDate = event ? new Date(event) : null;
    } else if (
      this.selectionMode === 'range' &&
      Array.isArray(event) &&
      event.length === 2
    ) {
      // For date range with null values
      const startDate = event[0] ? new Date(event[0]) : null;
      const endDate = event[1] ? new Date(event[1]) : null;
      this.selectedDate = [startDate, endDate];
    } else {
      this.selectedDate = null;
    }

    // Emit changes
    this.onChange(this.selectedDate);
    this.dateChange.emit(this.selectedDate);
  }

  onBlur() {
    this.onTouched();
  }
}
