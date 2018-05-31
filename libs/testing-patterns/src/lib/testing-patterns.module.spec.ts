import { async, TestBed } from '@angular/core/testing';
import { TestingPatternsModule } from './testing-patterns.module';

describe('TestingPatternsModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TestingPatternsModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(TestingPatternsModule).toBeDefined();
  });
});
