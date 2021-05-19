import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {user} from '../../../core/Models/user.interface';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {MainServicesService} from '../../../core/services/main-services.service';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(private formbuilder: FormBuilder,private router: Router, private services: MainServicesService) {
  }

  ngOnInit(): void {
    
    this.userForm = this.formbuilder.group(
      {
        id: [''],
        UserName: [''],
        Phone: [''],
        MobilePhone: [''],
        Email: [''],
        Password: [''],
        Address :[''],
        Birthdate: [''],
        Manager: [''],
        ManagerType: [''],
        Photo: ['aaa'],

      });
  }

  addUser() {

    if (this.userForm.invalid) {
      return;
    }
    let user = this.userForm.getRawValue();
    this.services.addUser(user)
      .subscribe(()=>{
        Swal.fire({
          title: 'Sucess!',
          text: "Usuário criado com sucesso",
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'Ok'
        });
        this.router.navigateByUrl('admin/task')
      });
    
  }

  
}
