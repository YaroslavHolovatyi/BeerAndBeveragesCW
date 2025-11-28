import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarMap } from './bar-map';

describe('BarMap', () => {
  let component: BarMap;
  let fixture: ComponentFixture<BarMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
