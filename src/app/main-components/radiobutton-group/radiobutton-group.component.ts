import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-radiobutton-group',
  imports: [FormsModule, RadioButtonModule, CommonModule],
  templateUrl: './radiobutton-group.component.html',
  styleUrl: './radiobutton-group.component.css',
})
export class RadiobuttonGroupComponent {
  @Input() categories: { name: string; key: string }[] = [];
  @Input() selectedCategories: any[] = [];
  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
  @Output() selectedCategoriesChange = new EventEmitter<any[]>();

  onSelectionChange() {
    this.selectedCategoriesChange.emit(this.selectedCategories);
  }
}
