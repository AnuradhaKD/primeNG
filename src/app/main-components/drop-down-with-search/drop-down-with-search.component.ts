import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-drop-down-with-search',
  standalone: true,
  imports: [SelectModule, FloatLabelModule, FormsModule],
  templateUrl: './drop-down-with-search.component.html',
  styleUrls: ['./drop-down-with-search.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownWithSearchComponent),
      multi: true,
    },
  ],
})
export class DropDownWithSearchComponent implements ControlValueAccessor {
  @Input() dropdownDataList: { name: string; value: string }[] = [];
  @Input() labelName: string = 'Select Option';
  @Input() dropdownPlaceholder: string = 'Select One';

  @Output() onValueChange = new EventEmitter<any>();

  selectedValue: string | null = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDropdownChange(event: any) {
    this.selectedValue = event;
    this.onChange(this.selectedValue);
    this.onValueChange.emit(this.selectedValue);
  }

  onBlur() {
    this.onTouched();
  }
}
