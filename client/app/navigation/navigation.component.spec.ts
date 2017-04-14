import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../testing';
import { FakeRouterLinkDirective } from '../../testing/router-stubs';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {

  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  let linkDes: DebugElement[];
  let links: FakeRouterLinkDirective[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FakeRouterLinkDirective,
        NavigationComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // TODO refactor this part
    linkDes = fixture.debugElement
      .queryAll(By.directive(FakeRouterLinkDirective));

    links = linkDes.map((de) => {
      return de.injector.get(FakeRouterLinkDirective);
    });
  });

  it('has navigation links', () => {
    expect(links.length).toEqual(4);

    expect(links[0].linkParams).toEqual('/');
    expect(links[1].linkParams).toEqual('/');
    expect(links[2].linkParams).toEqual('/contacts');
    expect(links[3].linkParams).toEqual('/sandbox');
  });

  it('can navigate to contacts', () => {
    // Given
    const de = linkDes[2];

    // When
    click(de);

    // Then
    expect(links[2].navigatedTo).toEqual('/contacts');
  });

});
