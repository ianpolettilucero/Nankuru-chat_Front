import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemiesAddedComponent } from './enemies-added.component';

describe('EnemiesAddedComponent', () => {
  let component: EnemiesAddedComponent;
  let fixture: ComponentFixture<EnemiesAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnemiesAddedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemiesAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
