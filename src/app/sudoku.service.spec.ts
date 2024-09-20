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

  it('should return the correct house index', () => {
    expect(service.indexInHouse(0, 0)).toBe(0);
    expect(service.indexInHouse(1, 0)).toBe(3);
    expect(service.indexInHouse(3, 0)).toBe(27);
    expect(service.indexInHouse(3, 4)).toBe(37);
  });

  describe('when generating candidates', () => {
    it('should generate candidates correctly', () => {
      for(let i = 0; i < 81; i++) {
        service.clearCell(i);
      }
      service.generateCandidates();
      for(let i = 0; i < 81; i++) {
        expect(service.grid.cells[i].candidates).toEqual([ 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
    });

    for (const {index, expected} of 
    [ { index: 30, expected: [] },
      { index: 31, expected: [ 2,3,4,5,6,7,8,9 ]},
      { index: 39, expected: [ 2,3,4,5,6,7,8,9 ]},
      { index: 40, expected: [ 2,3,4,5,6,7,8,9 ]},
    ]) {
    it(`should remove the candidate correctly [${index}]`, () => {
      for(let i = 0; i < 81; i++) {
        service.clearCell(i);
      }
      service.setCellValue(30, 1);
      service.generateCandidates();
      expect(service.grid.cells[index].candidates).toEqual(expected);
    });
  };

});
});
