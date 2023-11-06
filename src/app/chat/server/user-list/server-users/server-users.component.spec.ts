import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerUsersComponent } from './server-users.component';

describe('ServerUsersComponent', () => {
  let component: ServerUsersComponent;
  let fixture: ComponentFixture<ServerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
