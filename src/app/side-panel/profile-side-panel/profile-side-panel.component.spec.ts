import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSidePanelComponent } from './profile-side-panel.component';

describe('ProfileSidePanelComponent', () => {
  let component: ProfileSidePanelComponent;
  let fixture: ComponentFixture<ProfileSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSidePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
