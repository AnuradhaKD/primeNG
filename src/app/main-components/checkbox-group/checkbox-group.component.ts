import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox-group',
  imports: [FormsModule, CheckboxModule, CommonModule],
  templateUrl: './checkbox-group.component.html',
  styleUrl: './checkbox-group.component.css',
})
export class CheckboxGroupComponent {
  @Input() categories: { name: string; value: string }[] = [];
  @Input() selectedCategories: any[] = [];
  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
  @Output() selectedCategoriesChange = new EventEmitter<any[]>();

  onSelectionChange() {
    this.selectedCategoriesChange.emit(this.selectedCategories);
  }
}
