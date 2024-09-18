import { TestBed } from '@angular/core/testing';

import { SudokuService } from './sudoku.service';
import { Cell } from './cell';
import { isValidDate } from 'rxjs/internal/util/isDate';

describe('SudokuService', () => {
  let service: SudokuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail validation for an invalid grid', () => {
    let invalidCells = new Array<Cell>();
    for(let i = 0; i < 9; i++) {
      invalidCells.push({
        value: 1,
        empty: false,
        candidates: []
      });
    }
    expect(service.validate_set(invalidCells).valid).toBeFalse();
  });
});
