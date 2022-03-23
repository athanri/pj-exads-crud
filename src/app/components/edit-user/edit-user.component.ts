import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'exads-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(this.id).subscribe(user => {
      this.user = user['data'].user;
    })
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
    this.userService.patchUserById(data, data.id).subscribe(user => {
      this.message = user['data'].user.username + ' ' +user['message'];
      this.openSnackBar(this.message, 'ok');
    });    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
