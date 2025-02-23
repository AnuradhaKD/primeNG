import { Component, OnInit } from '@angular/core';
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
import { TableComponent } from '../../main-components/table/table.component';

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
    TableComponent,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  registrationForm!: FormGroup;
  minDate: Date = new Date('2025-02-01');
  maxDate: Date = new Date('2025-02-28');
  selectedDate: Date = new Date();
  products: any[] = []; // Holds table data

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

  hobbyList = [
    { name: 'Gaming', value: '12' },
    { name: 'Singing', value: '10' },
    { name: 'Dancing', value: '13' },
    { name: 'Writing', value: '20' },
  ];

  genderList = [
    { name: 'Male', key: 'M' },
    { name: 'Female', key: 'F' },
    { name: 'Others', key: 'O' },
  ];

  cols = [
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'dob', header: 'Date of Birth' },
    { field: 'stayPeriod', header: 'Stay Period' },
    { field: 'continent', header: 'Continent' },
    { field: 'country', header: 'Country' },
    { field: 'gender', header: 'Gender' },
    { field: 'hobbies', header: 'Hobbies' },
  ];

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      stayPeriod: [null, Validators.required],
      continent: [[]],
      country: [[]],
      gender: ['', Validators.required],
      hobbies: [[]], // Multiple selections
    });

    // Load existing data from local storage
    this.loadTableData();
  }

  submitForm() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      // Convert to readable format
      const newData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob.toLocaleDateString(),
        stayPeriod: formData.stayPeriod,
        continent: this.getNameFromValue(
          this.continentsList,
          formData.continent
        ),
        country: this.getNameFromValue(this.countryList, formData.country),
        gender: this.getNameFromValue(this.genderList, formData.gender),
        hobbies: formData.hobbies.map((h: any) => h.name).join(', '),
      };

      // Store data in localStorage
      const storedData = JSON.parse(
        localStorage.getItem('userDetails') || '[]'
      );
      storedData.push(newData);
      localStorage.setItem('userDetails', JSON.stringify(storedData));

      // Reload table data
      this.loadTableData();
      this.registrationForm.reset();
    }
  }

  onDropdownChange(newValue: string, controlName: string) {
    this.registrationForm.get(controlName)?.setValue(newValue);
    console.log(`${controlName} selected:`, newValue);
  }

  loadTableData() {
    this.products = JSON.parse(localStorage.getItem('userDetails') || '[]');
  }

  getNameFromValue(list: any[], value: string) {
    const item = list.find((l) => l.value === value || l.key === value);
    return item ? item.name : value;
  }

  // onDateChange(event: Date) {
  //   this.selectedDate = event;
  //   console.log(this.selectedDate);
  // }
}
