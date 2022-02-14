import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@app/@shared/model';
import { AuthService } from '@app/@shared/services/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-detalhe-obra',
  templateUrl: './detalhe-obra.component.html',
  styleUrls: ['./detalhe-obra.component.scss']
})
export class DetalheObraComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }
  public product: any;

  ngOnInit(): void {
    this.product = environment.product as any;
  }

}
