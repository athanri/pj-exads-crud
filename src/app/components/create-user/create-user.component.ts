import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'exads-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user: any = {id: 0, first_name: '', username: '', last_name: '', creation_date: '', id_status: 1, email: ''}; 
  id: string = '';
  message: string = '';
  formGroup: any;
  titleAlert: string = 'Required field, must be between 3 and 20 characters.';
  post: any = '';
  exists:boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'id': '',
      'id_status': '',
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'username': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'first_name': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'last_name': ''
    });
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid email' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This email is already in use' : '';
  }

  onSubmit(data) {
    this.userService.checkUserName(data).subscribe(user => {
      if (user['data'].count > 0) {
        this.openSnackBar(`Username "${data.username}" already exists, please enter unique username`, 'OK')
      } else {
        this.userService.createUser(data).subscribe(user => {
          this.openSnackBar(`Username "${data.username}" create successfully`, 'OK')
        })
      }
    });    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
