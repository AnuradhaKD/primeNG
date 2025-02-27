import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
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
import { DatePipe, formatDate } from '@angular/common';

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
  providers: [DatePipe],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements AfterViewInit {
  minDate: Date = new Date('2025-02-01');
  maxDate: Date = new Date('2025-02-28');
  selectedDate: Date = new Date();
  userDetailsTable: any[] = [];
  userList: any[] = [];
  selectedUser: any = {};

  localStorageKey: string;
  isNewUser: boolean = false;
  editDeleteButtons: string = `
  <div class="row">
  <div class="col-6">
        <a class="btn btn-sm btn-primary user-edit" style="width:100%">
        <span class="pi pi-pencil"></span>
        </a>
      </div>
      <div class="col-6">
      <a class="btn btn-sm btn-danger user-delete" style="width:100%">
          <span class="pi pi-trash"></span>
        </a>
        </div>
        </div>
        `;

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
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'dateOfBirth', header: 'Date of Birth' },
    { field: 'stayPeriod', header: 'Stay Period' },
    { field: 'continent', header: 'Continent' },
    { field: 'country', header: 'Country' },
    { field: 'gender', header: 'Gender' },
    { field: 'hobbies', header: 'Hobbies' },
    { field: 'actions', header: '' },
  ];

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.registrationForm = this.createForm();
    this.loadFormData();
    this.localStorageKey = 'userDetails';
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [null], // Add the id field (this will be handled dynamically)
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      stayPeriod: [{}, Validators.required],
      continent: [null, Validators.required],
      country: [null, Validators.required],
      gender: [[], Validators.required],
      hobbies: [[], Validators.required],
    });
  }
  continentSelected: boolean = false;
  onContinentChange(event: any) {
    this.continentSelected = !!event.value; // Set to true if continent is selected
    // Reset the country to null if the continent is changed
    if (!this.continentSelected) {
      this.registrationForm.get('country')?.setValue(null);
    }
  }

  ngOnInit(): void {
    const localData = localStorage.getItem(this.localStorageKey);
    this.userList = localData ? JSON.parse(localData) : [];
    this.drawTable(this.userList);
    this.loadFormData();
  }

  submitForm() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const existingData = JSON.parse(
        localStorage.getItem('userFormData') || '[]'
      );

      if (formData.id) {
        const index = existingData.findIndex(
          (user: { id: any }) => String(user.id) === String(formData.id)
        );

        if (index !== -1) {
          existingData[index] = formData;
        } else {
          console.error('User not found for update!');
        }
      } else {
        formData.id = existingData.length
          ? Math.max(...existingData.map((user: { id: any }) => user.id)) + 1
          : 1;
        existingData.push(formData);
      }

      localStorage.setItem('userFormData', JSON.stringify(existingData));

      this.registrationForm.reset();
      this.changeCards();
      this.drawTable(existingData);
      this.loadFormData();
    } else {
      alert('Please fill in all the required fields!');
    }
  }

  loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('userFormData') || '[]');
    console.log(savedData[0]);

    this.userDetailsTable = savedData.map((row: any, index: number) => {
      // Format the dateOfBirth
      const formattedDateOfBirth = this.datePipe.transform(
        row.dateOfBirth,
        'yyyy-MM-dd'
      );

      // Check if stayPeriod is a string and split it into an array, or directly handle the array if it's already an array
      let stayPeriodStart: string = '';
      let stayPeriodEnd: string = '';

      if (typeof row.stayPeriod === 'string') {
        const stayPeriodDates = row.stayPeriod.split(',');
        stayPeriodStart = stayPeriodDates[0]
          ? this.datePipe.transform(stayPeriodDates[0], 'yyyy-MM-dd') || ''
          : '';
        stayPeriodEnd = stayPeriodDates[1]
          ? this.datePipe.transform(stayPeriodDates[1], 'yyyy-MM-dd') || ''
          : '';
      } else if (Array.isArray(row.stayPeriod)) {
        stayPeriodStart = row.stayPeriod[0]
          ? this.datePipe.transform(row.stayPeriod[0], 'yyyy-MM-dd') || ''
          : '';
        stayPeriodEnd = row.stayPeriod[1]
          ? this.datePipe.transform(row.stayPeriod[1], 'yyyy-MM-dd') || ''
          : '';
      }

      return {
        id: index + 1,
        ...row,
        continent: row.continent?.name ?? row.continent,
        country: row.country?.name ?? row.country,
        gender:
          this.genderList.find((g) => g.key === row.gender)?.name ?? row.gender,
        hobbies: row.hobbies
          .map((h: any) => this.hobbyList.find((c) => c.value === h)?.name)
          .join(', '),
        dateOfBirth: formattedDateOfBirth,
        stayPeriod:
          stayPeriodStart && stayPeriodEnd
            ? `${stayPeriodStart} to ${stayPeriodEnd}`
            : '',
        actions: this.editDeleteButtons,
      };
    });

    console.log(this.userDetailsTable);
  }

  editUser(user: any) {
    const userToEdit = this.userDetailsTable.find(
      (u) => String(u.id) === String(user.id)
    );
    debugger;
    const selectedContinent = this.continentsList.find(
      (c: any) => c.name === user.rowData[5]
    );

    const selectedCountry = this.countryList.find(
      (c: any) => c.name === user.rowData[6]
    );
    console.log(selectedContinent);
    console.log(selectedCountry);

    // debugger;
    console.log(user.rowData);
    const selectedGender = this.genderList.find(
      (g) => g.name === user.rowData[7]
    )?.key;

    //alert(selectedGender);
    const selectedHobbies =
      typeof user.rowData[8] === 'string'
        ? user.rowData[8] // Ensure it's a string before calling split
            .split(',')
            .map(
              (h: any) =>
                this.hobbyList.find((c) => c.name.trim() === h.trim())?.value
            ) // Trim both sides
            .filter((value: any) => value !== undefined) // Filter out undefined values
        : []; // If it's not a string, default to an empty array

    console.log(selectedHobbies);

    if (userToEdit) {
      this.selectedUser = { ...userToEdit };
      let stayPeriod: any = [];
      if (this.selectedUser.stayPeriod) {
        if (typeof this.selectedUser.stayPeriod === 'string') {
          const stayPeriodDates = this.selectedUser.stayPeriod.split(' to ');
          if (stayPeriodDates.length === 2) {
            stayPeriod = stayPeriodDates.map(
              (date: string) =>
                this.datePipe.transform(date.trim(), 'yyyy-MM-dd') // Format each date
            );
          }
        } else if (Array.isArray(this.selectedUser.stayPeriod)) {
          stayPeriod = this.selectedUser.stayPeriod.map((date: string) =>
            this.datePipe.transform(date, 'yyyy-MM-dd')
          );
        }
      }
      if (this.registrationForm) {
        this.registrationForm.setValue({
          firstName: this.selectedUser.firstName,
          lastName: this.selectedUser.lastName,
          dateOfBirth: this.selectedUser.dateOfBirth,
          //stayPeriod: this.selectedUser.stayPeriod,
          stayPeriod: stayPeriod,
          //continent: this.selectedUser.continent,
          continent: selectedContinent,
          //country: this.selectedUser.country,
          country: selectedCountry,
          //gender: this.selectedUser.gender,
          gender: selectedGender,
          //hobbies: this.selectedUser.hobbies,
          hobbies: selectedHobbies,
          id: this.selectedUser.id,
        });
      }

      this.changeCards();
    } else {
      alert('User not found!');
    }
  }

  deleteUser(user: any) {
    alert('Deleting user with ID: ' + user);
    debugger;
    console.log(user);
    console.log(this.userDetailsTable);

    const index = this.userDetailsTable.findIndex((u) => String(u.id) === user);
    console.log(index);
    if (index > -1) {
      this.userDetailsTable.splice(index, 1);
      console.log(this.userDetailsTable);

      localStorage.setItem(
        'userFormData',
        JSON.stringify(this.userDetailsTable)
      );

      console.log('Deleted user with ID:', user.id);
    } else {
      console.log('User not found');
    }
  }

  formatDate(dateString: string): string {
    return dateString
      ? formatDate(new Date(dateString), 'yyyy-MM-dd', 'en-US')
      : '';
  }

  handleValueChange(value: string) {
    //console.log('Selected Value:', value);
  }

  handleCheckboxChange(selectedValues: any[]) {
    //console.log('Selected Values:', selectedValues);
  }

  onRadioValueChange(value: any) {
    //console.log('Selected Value:', value);
  }

  saveDataToLocalStorage(userList: any[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(userList));
  }

  drawTable(userList: any[]) {
    // debugger;
    this.userDetailsTable = userList;
    //console.log('user table : ', this.userDetailsTable);
  }

  ngAfterViewInit() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      // Check for edit button click
      if (target && target.classList.contains('user-edit')) {
        const row = target.closest('tr') as HTMLTableRowElement;
        if (row) {
          const rowData = this.getRowData(row);
          alert('Edit button clicked! Row data: ' + rowData.id);
          this.editUser(rowData);
        }
      }

      // Check for delete button click
      if (target && target.classList.contains('user-delete')) {
        const row = target.closest('tr') as HTMLTableRowElement;
        if (row) {
          const rowData = this.getRowData(row);
          const userId = rowData.id; // Assuming 'id' is in the rowData

          // Confirm delete action
          const confirmDelete = window.confirm(
            `Are you sure you want to delete user with ID: ${userId}?`
          );

          if (confirmDelete) {
            alert('Delete button clicked! Row data: ' + userId);
            this.deleteUser(userId);
          } else {
            alert('User deletion canceled');
          }
        }
      }
    });
  }

  // Helper function to extract row data
  getRowData(row: HTMLTableRowElement): any {
    const rowData = Array.from(row.cells).map((cell) => cell.textContent ?? ''); // Ensure safe extraction of textContent
    const rowId = rowData[0]; // Assuming the first cell contains the 'id'
    return { id: rowId, rowData }; // Return the 'id' and the entire row data
  }

  changeCards() {
    this.isNewUser = !this.isNewUser;
  }

  handleClick(event: Event) {
    event.preventDefault();
    console.log('Anchor tag clicked without navigating');
  }
}

class User {
  id?: number; // Optional for editing users
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: Date | null = null;
  stayPeriod: any = {}; // Define proper type if needed
  continent: string | null = null;
  country: string | null = null;
  gender: string[] = [];
  hobbies: string[] = [];
}
