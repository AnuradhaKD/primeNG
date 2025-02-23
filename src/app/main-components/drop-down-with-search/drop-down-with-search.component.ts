import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-drop-down-with-search',
  imports: [FormsModule, ReactiveFormsModule, SelectModule, FloatLabelModule],
  templateUrl: './drop-down-with-search.component.html',
  styleUrl: './drop-down-with-search.component.css',
})
export class DropDownWithSearchComponent {
  @Input() dropdownDataList: { name: string; value: string }[] = [];
  @Input() labelName: string = 'Select Option';
  @Input() dropdownPlaceholder: string = 'Select One';

  @Input() formControl?: FormControl; // For direct FormControl binding
  @Input() dropdownFormControlName?: string; // For FormGroup binding
}
