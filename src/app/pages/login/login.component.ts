import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@app/@shared/model';
import { AuthService } from '@app/@shared/services/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: ElementRef;
  public loginFormHeight: number = 0;
  public pageForm: FormGroup = this.formBulder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private formBulder: FormBuilder, private router: Router, private authService: AuthService) {}
  public product: any;

  ngOnInit(): void {
    this.product = environment.product as any;
  }

  onSubmit() {
    this.authService
      .login(this.pageForm.get('email')?.value, this.pageForm.get('password')?.value)
      .then((result: boolean) => {
        console.log('result', result);
        if (result) {
          this.router.navigate(['/page/home']);
        }
      });
  }
}
