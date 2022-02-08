import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@app/@shared/model';
import { AuthService } from '@app/@shared/services/auth/auth.service';
import { environment } from '@env/environment';
import { textSpanIntersectsWithTextSpan } from 'typescript';

@Component({
  selector: 'app-rec-senha',
  templateUrl: './rec-senha.component.html',
  styleUrls: ['./rec-senha.component.scss']
})
export class RecSenhaComponent implements OnInit {

  @ViewChild('RecupForm') RecupForm: ElementRef;
  public pageRecup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }
  public product: any;

  ngOnInit(): void {
    this.product = environment.product as any;
  }

  postar() {
    if (!this.pageRecup.valid) {
      console.log("Formulário inválido");
      return;
    }else{
      console.log("Formulário válido", this.pageRecup.value);
      alert("Verifique seu email.");
      //this.router.navigate(['/']);
    }
  }

}
