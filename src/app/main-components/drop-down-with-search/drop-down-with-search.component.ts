import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-drop-down-with-search',
  imports: [FormsModule, SelectModule, FloatLabelModule],
  templateUrl: './drop-down-with-search.component.html',
  styleUrl: './drop-down-with-search.component.css',
})
export class DropDownWithSearchComponent {
  @Input() dropdownDataList: { name: string; value: string }[] = [];
  @Input() selectedItem: string | undefined;
  @Input() labelName: string = 'Select Option';

  @Output() selectedItemChange = new EventEmitter<string>();

  onSelectionChange(newValue: string) {
    this.selectedItemChange.emit(newValue);
  }
}
