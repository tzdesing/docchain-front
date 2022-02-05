import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@app/@shared/model';
import { AuthService } from '@app/@shared/services/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  @ViewChild('loginForm') loginForm: ElementRef;
  public loginFormHeight: number = 0;
  public pageForm: FormGroup = this.formBulder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private formBulder: FormBuilder, private router: Router) { }
  public product: any;
  
  ngOnInit(): void {
    this.product = environment.product as any;
  }

}
