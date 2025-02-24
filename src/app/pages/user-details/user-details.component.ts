import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
export class UserDetailsComponent {
  minDate: Date = new Date('2025-02-01');
  maxDate: Date = new Date('2025-02-28');
  selectedDate: Date = new Date();
  products: any[] = [];
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      stayPeriod: [null, Validators.required],
      continent: [null, Validators.required],
      country: [null, Validators.required],
      gender: ['O', Validators.required],
      hobbies: [[], Validators.required],
    });
  }

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

  submitForm() {
    //debugger;
    const formData = this.registrationForm;
    //localStorage.setItem('formData', JSON.stringify(formData));
    console.log('Form Data:', formData);
    console.log('Updated Form:', this.registrationForm.value);
    //debugger;
  }

  handleValueChange(value: string) {
    console.log('Selected Value:', value);
  }

  handleCheckboxChange(selectedValues: any[]) {
    console.log('Selected Values:', selectedValues);
  }

  onRadioValueChange(value: any) {
    console.log('Selected Value:', value);
    this.registrationForm.patchValue({ gender: value });
    console.log('Updated:', this.registrationForm.value);
  }
}
