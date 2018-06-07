import { async, TestBed } from '@angular/core/testing';
import { ElementalsModule } from './elementals.module';

describe('ElementalsModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ElementalsModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(ElementalsModule).toBeDefined();
  });
});
