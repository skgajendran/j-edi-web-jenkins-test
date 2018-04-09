import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VnfCreateComponent } from './vnf-create.component';

describe('VnfCreateComponent', () => {
  let component: VnfCreateComponent;
  let fixture: ComponentFixture<VnfCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VnfCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VnfCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
