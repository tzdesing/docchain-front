import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasObrasComponent } from './minhas-obras.component';

describe('MinhasObrasComponent', () => {
  let component: MinhasObrasComponent;
  let fixture: ComponentFixture<MinhasObrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasObrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
