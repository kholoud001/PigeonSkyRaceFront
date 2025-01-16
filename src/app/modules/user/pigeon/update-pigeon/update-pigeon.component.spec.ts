import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePigeonComponent } from './update-pigeon.component';

describe('UpdatePigeonComponent', () => {
  let component: UpdatePigeonComponent;
  let fixture: ComponentFixture<UpdatePigeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePigeonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePigeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
