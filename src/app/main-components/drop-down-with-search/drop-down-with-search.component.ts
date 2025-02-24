import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-drop-down-with-search',
  standalone: true,
  imports: [SelectModule, FloatLabelModule],
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

  onValueChange(event: any) {
    this.selectedValue = event.value;
    this.onChange(this.selectedValue);
  }

  onBlur() {
    this.onTouched();
  }
}
