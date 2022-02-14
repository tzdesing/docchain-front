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
  
  @ViewChild('CadastroForm') CadastroForm: ElementRef;
  public pageFormCadastro: FormGroup = this.formBuilder.group({
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    artista: new FormControl('', [Validators.nullValidator]),
    cliente: new FormControl('', [Validators.nullValidator]),
    //artistaCliente: new FormControl('', [Validators.nullValidator]),
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}
  public product: any;
  
  ngOnInit(): void {
    this.product = environment.product as any;
  }

  // onSubmit() {
  //   this.authService
  //     .login(this.pageFormCadastro.get('email')?.value, this.pageFormCadastro.get('password')?.value)
  //     .then((result: boolean) => {
  //       console.log('result', result);
  //       if (result) {
  //         this.router.navigate(['/page/home']);
  //       }
  //     });
  // }

  postar() {
    if (!this.pageFormCadastro.valid) {
      console.log("Formulário inválido");
      return;
    }else if(this.pageFormCadastro.get('password')?.value != this.pageFormCadastro.get('confirmPassword')?.value){
      console.log("Senha não confere")
      return;
    }else if((this.pageFormCadastro.get('artista')?.value == false) && (this.pageFormCadastro.get('cliente')?.value == false)){
      //this.pageFormCadastro.get('artistaCliente').setValue(false);
      console.log("Formulário inválido selecione um perfil artista/cliente");
      return;
    }else{
      //this.pageFormCadastro.get('artistaCliente').setValue(true);
      console.log("Formulário válido", this.pageFormCadastro.value);
      //this.router.navigate(['/']);
    }
  }

}
