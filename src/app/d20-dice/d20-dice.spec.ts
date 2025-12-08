import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D20Dice } from './d20-dice';

describe('D20Dice', () => {
  let component: D20Dice;
  let fixture: ComponentFixture<D20Dice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D20Dice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D20Dice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
