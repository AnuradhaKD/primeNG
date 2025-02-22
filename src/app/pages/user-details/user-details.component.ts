import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '../../main-components/text-input/text-input.component';
import { DatePickerComponent } from '../../main-components/date-picker/date-picker.component';

@Component({
  selector: 'app-user-details',
  imports: [ReactiveFormsModule,TextInputComponent,DatePickerComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  registrationForm!: FormGroup;
   minDate: Date = new Date('2025-02-01');
  maxDate: Date = new Date('2025-02-28');
  // continents = [
  //   { name: 'Asia', code: 'AS' },
  //   { name: 'Europe', code: 'EU' },
  //   { name: 'North America', code: 'NA' },
  //   { name: 'South America', code: 'SA' },
  //   { name: 'Africa', code: 'AF' },
  //   { name: 'Oceania', code: 'OC' }
  // ];
  // countries: any[] = [];
  // countryList = {
  //   AS: ['India', 'China', 'Japan'],
  //   EU: ['France', 'Germany', 'Italy'],
  //   NA: ['USA', 'Canada', 'Mexico'],
  //   SA: ['Brazil', 'Argentina', 'Chile'],
  //   AF: ['Nigeria', 'South Africa', 'Egypt'],
  //   OC: ['Australia', 'New Zealand', 'Fiji']
  // };

  constructor(private fb: FormBuilder) {}

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
      acceptAgreement: [false, Validators.requiredTrue]
    });
  }


  // onContinentChange(event: any) {
  //   const selectedCode = event.target.value as keyof typeof this.countryList;
  //   this.countries = this.countryList[selectedCode] || [];
  //   this.registrationForm.get('country')?.enable();
  //   this.registrationForm.get('country')?.setValue('');
  // }
  

  // submitForm() {
  //   if (this.registrationForm.valid) {
  //     console.log(this.registrationForm.value);
  //   }
  // }
}