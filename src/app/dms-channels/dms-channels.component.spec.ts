import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsChannelsComponent } from './dms-channels.component';

describe('DmsChannelsComponent', () => {
  let component: DmsChannelsComponent;
  let fixture: ComponentFixture<DmsChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmsChannelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmsChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
