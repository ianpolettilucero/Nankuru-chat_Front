import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsAddedComponent } from './friends-added.component';

describe('FriendsAddedComponent', () => {
  let component: FriendsAddedComponent;
  let fixture: ComponentFixture<FriendsAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsAddedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
