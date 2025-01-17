import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompetitionsComponent } from './list-competitions.component';

describe('ListCompetitionsComponent', () => {
  let component: ListCompetitionsComponent;
  let fixture: ComponentFixture<ListCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCompetitionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
