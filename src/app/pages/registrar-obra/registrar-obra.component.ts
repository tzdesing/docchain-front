import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@app/@shared/model';
import { AuthService } from '@app/@shared/services/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-registrar-obra',
  templateUrl: './registrar-obra.component.html',
  styleUrls: ['./registrar-obra.component.scss']
})
export class RegistrarObraComponent implements OnInit {

  @ViewChild('RegistrodeObraForm') RegistrodeObraForm: ElementRef;
  public pageRegistroObra: FormGroup = this.formBuilder.group({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    descricao: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    termos: new FormControl('', [Validators.required]),
    imagem: new FormControl('', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }
  public product: any;

  ngOnInit(): void {
    this.product = environment.product as any;
  }

  postar() {
    if (!this.pageRegistroObra.valid) {
      console.log("Formulário inválido");
      return;
    }else{
      console.log("Formulário válido", this.pageRegistroObra.value);
      //this.router.navigate(['/page/minhasObras']);
    }
  }

}
