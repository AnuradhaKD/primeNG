import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-from',
  imports: [FormsModule],
  templateUrl: './template-from.component.html',
  styleUrl: './template-from.component.css',
})
export class TemplateFromComponent {
  isNewUser: boolean = true;
  userObj: User = new User();
  localStorageKey: string = 'userDetails';
  userList: User[] = [];

  ngOnInit() {
    const localData = localStorage.getItem(this.localStorageKey);
    this.userList = localData ? JSON.parse(localData) : [];
  }

  changeCard() {
    this.isNewUser = !this.isNewUser;
  }

  onSave() {
    debugger;
    this.userObj.userId = this.userList.length + 1;
    this.userList.push(this.userObj);
    this.userObj = new User();
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.userList));
    this.changeCard();
  }

  onUpdate() {
    const record = this.userList.find((m) => m.userId == this.userObj.userId);
    if (record != undefined) {
      record.firstName = this.userObj.firstName;
      record.lastName = this.userObj.lastName;
      record.address = this.userObj.address;
      record.gender = this.userObj.gender;
      record.phoneNumber = this.userObj.phoneNumber;
      record.zipCode = this.userObj.zipCode;
    }

    localStorage.setItem(this.localStorageKey, JSON.stringify(this.userList));
    this.changeCard();
  }

  onEdit(user: any) {
    this.userObj = user;
    this.changeCard();
  }

  onDelete(userId: number) {
    const isDelete = confirm('Are you Sure Delete??');
    if (isDelete) {
      const index = this.userList.findIndex((m) => m.userId == userId);
      this.userList.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.userList));
    }
  }
}

class User {
  userId: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: string;
  zipCode: string;
  isAgreed: boolean;

  constructor() {
    this.userId = 0;
    this.firstName = '';
    this.lastName = '';
    this.address = '';
    this.phoneNumber = '';
    this.gender = '';
    this.zipCode = '';
    this.isAgreed = false;
  }
}
