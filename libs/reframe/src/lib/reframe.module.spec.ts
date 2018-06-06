import { async, TestBed } from '@angular/core/testing';
import { ReframeModule } from './reframe.module';

describe('ReframeModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReframeModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(ReframeModule).toBeDefined();
  });
});
