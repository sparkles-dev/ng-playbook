import { async, TestBed } from '@angular/core/testing';
import { CssGridModule } from './css-grid.module';

describe('CssGridModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CssGridModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(CssGridModule).toBeDefined();
  });
});
