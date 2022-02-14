import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheObraComponent } from './detalhe-obra.component';

describe('DetalheObraComponent', () => {
  let component: DetalheObraComponent;
  let fixture: ComponentFixture<DetalheObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
