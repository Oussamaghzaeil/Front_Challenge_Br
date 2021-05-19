import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainServicesService} from '../../core/services/main-services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formbuilder: FormBuilder,private router: Router,private services:MainServicesService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  Login() {
    if (this.loginForm.invalid ) {
      return;
    }
    this.services.signIn(this.loginForm.getRawValue())
      .subscribe(
        data => {
          localStorage.setItem('token',data.acces_token)
          this.router.navigateByUrl('admin/task')
        });

  }
}
