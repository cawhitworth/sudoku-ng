import { TestBed } from '@angular/core/testing';

import { SudokuService } from './sudoku.service';
import { Cell, CellMark } from './cell';

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
        candidates: [],
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

  it('should return the right seen cells', () => {
    let seenBy = service.seenBy(30).sort();
    let expected = [ 27, 28, 29, 30, 31, 32, 33, 34, 35, 3, 12, 21, 39, 48, 57, 66, 75, 40, 41, 49, 50 ].sort();
    expect(seenBy).toEqual(expected);
  });

  describe('when generating candidates', () => {
    it('should generate candidates correctly', () => {
      for(let i = 0; i < 81; i++) {
        service.clearCell(i);
      }
      service.generateCandidates();
      for(let i = 0; i < 81; i++) {
        for (let c = 0; c < 9; c++) {
          expect(service.grid.cells[i].candidates[c]).toEqual(CellMark.Candidate);
        }
      }
    });

    for (const {index, expected} of 
    [ { index: 30, expected: [ CellMark.None,CellMark.None,CellMark.None,CellMark.None,CellMark.None,CellMark.None,CellMark.None,CellMark.None,CellMark.None ] },
      { index: 31, expected: [ CellMark.None,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate ] },
      { index: 39, expected: [ CellMark.None,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate ] },
      { index: 40, expected: [ CellMark.None,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate,CellMark.Candidate ] },
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
