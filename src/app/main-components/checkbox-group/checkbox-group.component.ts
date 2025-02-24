import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [FormsModule, CheckboxModule, CommonModule],
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class CheckboxGroupComponent implements ControlValueAccessor {
  @Input() categories: { name: string; value: string }[] = [];
  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
  @Input() btnLabel: string = '';

  selectedCategories: any[] = [];

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.selectedCategories = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectionChange() {
    this.onChange(this.selectedCategories);
    this.onTouched();
  }
}
