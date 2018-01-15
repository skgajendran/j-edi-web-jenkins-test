import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerAutomationComponent } from './trigger-automation.component';

describe('TriggerAutomationComponent', () => {
  let component: TriggerAutomationComponent;
  let fixture: ComponentFixture<TriggerAutomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerAutomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
