import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-date-picker',
  imports: [DatePicker,FormsModule,FloatLabelModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
@Input() labelName: string = '';
  @Input() selectionMode: any = "single"; 
  @Input() selectedDate:Date | undefined
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;

  @Output() selectedDateChange = new EventEmitter<Date[]>();

  // If you need to handle the selection change
  onDateChange(event: Date[]) {
    this.selectedDateChange.emit(event);
  }

}
