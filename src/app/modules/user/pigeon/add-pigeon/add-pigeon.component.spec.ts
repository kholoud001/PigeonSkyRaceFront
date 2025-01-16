import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPigeonComponent } from './add-pigeon.component';

describe('AddPigeonComponent', () => {
  let component: AddPigeonComponent;
  let fixture: ComponentFixture<AddPigeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPigeonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPigeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
