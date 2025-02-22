import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FieldsetModule } from 'primeng/fieldset';
import { TextInputComponent } from '../../main-components/text-input/text-input.component';
import { DatePickerComponent } from '../../main-components/date-picker/date-picker.component';
import { DropDownWithSearchComponent } from '../../main-components/drop-down-with-search/drop-down-with-search.component';
import { CheckboxGroupComponent } from '../../main-components/checkbox-group/checkbox-group.component';
import { RadiobuttonGroupComponent } from '../../main-components/radiobutton-group/radiobutton-group.component';
import { ButtonComponent } from '../../main-components/button/button.component';

@Component({
  selector: 'app-user-details',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    DatePickerComponent,
    DropDownWithSearchComponent,
    CheckboxGroupComponent,
    RadiobuttonGroupComponent,
    ButtonComponent,
    FieldsetModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  registrationForm!: FormGroup;
  minDate: Date = new Date('2025-02-01');
  maxDate: Date = new Date('2025-02-28');

  constructor(private fb: FormBuilder) {}

  countryList = [
    { name: '--SELECT--', value: '1' },
    { name: 'Australia', value: 'AU' },
    { name: 'Brazil', value: 'BR' },
    { name: 'China', value: 'CN' },
    { name: 'Egypt', value: 'EG' },
    { name: 'France', value: 'FR' },
    { name: 'Germany', value: 'DE' },
    { name: 'India', value: 'IN' },
    { name: 'Japan', value: 'JP' },
    { name: 'Spain', value: 'ES' },
    { name: 'United States', value: 'US' },
  ];

  continentsList = [
    { name: '--SELECT--', value: '1' },
    { name: 'Asia', value: 'AS' },
    { name: 'Europe', value: 'EU' },
    { name: 'North America', value: 'NA' },
    { name: 'South America', value: 'SA' },
    { name: 'Africa', value: 'AF' },
    { name: 'Oceania', value: 'OC' },
  ];

  selectedItem: string | undefined = '1';

  onDropdownChange(newValue: string) {
    console.log('Selected Value:', newValue);
    this.selectedItem = newValue;
  }

  categories = [
    { name: 'Accounting', value: 'A' },
    { name: 'Marketing', value: '5' },
    { name: 'Production', value: 'P' },
    { name: 'Research', value: 'R' },
  ];

  categories1 = [
    { name: 'Accounting1', value: 'A' },
    { name: 'Marketing', value: 'M' },
    { name: 'Production', value: 'P' },
    { name: 'Research', value: 'R' },
  ];
  categories2 = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];

  categories3 = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];

  selectedCategories = [this.categories[1], this.categories[2]];
  selectedCategories1: any[] = [];
  selectedCategories2 = [this.categories2[1]];
  selectedCategories3: any[] = [];

  onCategoryChange(newSelection: any[]) {
    console.log('Updated Selected Categories:', newSelection);
    this.selectedCategories = newSelection;
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      stayPeriod: [null, Validators.required],
      continent: ['', Validators.required],
      country: [{ value: '', disabled: true }, Validators.required],
      acceptAgreement: [false, Validators.requiredTrue],
    });
  }
}
