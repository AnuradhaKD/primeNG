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
      this.selectedDate = value ? new Date(value) : null;
    } else if (this.selectionMode === 'range' && Array.isArray(value)) {
      const startDate =
        value.length > 0 && value[0] ? new Date(value[0]) : null;
      const endDate = value.length > 1 && value[1] ? new Date(value[1]) : null;

      this.selectedDate = [startDate, endDate] as [Date | null, Date | null];
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

  selectedRange: [Date | null, Date | null] = [null, null];

  onDateChange(event: any) {
    if (this.selectionMode === 'single') {
      this.selectedDate = event ? new Date(event) : null;
      this.onChange(this.selectedDate);
      this.dateChange.emit(this.selectedDate);
    } else if (this.selectionMode === 'range') {
      if (!Array.isArray(event)) {
        if (!this.selectedRange[0]) {
          this.selectedRange[0] = new Date(event);
        } else {
          this.selectedRange[1] = new Date(event);
        }

        if (this.selectedRange[0] && this.selectedRange[1]) {
          this.selectedDate = [...this.selectedRange] as [
            Date | null,
            Date | null
          ];
          this.onChange(this.selectedDate);
          this.dateChange.emit(this.selectedDate);

          this.selectedRange = [null, null];
        }
      } else {
        this.selectedDate = [
          event[0] ? new Date(event[0]) : null,
          event[1] ? new Date(event[1]) : null,
        ] as [Date | null, Date | null];

        this.onChange(this.selectedDate);
        this.dateChange.emit(this.selectedDate);
      }
    }
  }

  onBlur() {
    this.onTouched();
  }
}
