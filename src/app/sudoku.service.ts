import { Injectable } from '@angular/core';
import { Grid } from './grid';
import { Cell, CellMark } from './cell';

export class ValidationResult {
    constructor(valid: boolean, complete: boolean) {
        this.valid = valid;
        this.complete = complete;
    }

    and(other: ValidationResult) {
        this.valid &&= other.valid;
        this.complete &&= other.complete;
    }

    valid: boolean;
    complete: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SudokuService
{
  getGrid(): Grid
  {
    return this.grid;
  }

  getComplete(): boolean 
  {
    let result: ValidationResult = this.validate();
    return result.complete;
  }

  getValid(): boolean
  {
    let result: ValidationResult = this.validate();
    return result.valid;
  }

  partial       = ".842..7.." +
                  "...86.42." +
                  "3.51....9" +
                  ".59.26.7." +
                  "2.3...8.6" +
                  "...49...." +
                  ".9.7.236." +
                  ".1..5.24." +
                  "5.26.....";

  grid: Grid = {
    cells: new Array<Cell>(81)
  };

  constructor() {
    for (let i = 0; i < 81; i ++) {
      this.grid.cells[i] = {
        empty: false,
        value: 0,
        candidates: new Array<CellMark>(),
      }
      let c = this.partial[i];
      if (c === '.') {
        this.grid.cells[i].empty = true;
      } else {
        this.grid.cells[i].value = parseInt(c);
      }
    }
  }

  validate_set(set: Array<Cell>) : ValidationResult
  {
    let working_set = new Set();
    let result = new ValidationResult(true, true);

    for(const i of set) {
        if (i.empty) {
            result.complete = false;
            continue;
        }
        if (working_set.has(i.value)) {
            result.valid = false;
        }
        working_set.add(i.value);
    }

    return result;
  }

  row(index: number): number
  {
    return Math.floor(index / 9);
  }

  column(index: number): number
  {
    return index % 9;
  }

  house(index: number) : number
  {
    return (Math.floor(this.row(index)/3) * 3) + Math.floor(this.column(index)/3);
  }

  index(col: number, row:number) : number
  {
    return row * 9 + col;
  }

  indexInHouse(house: number, index: number): number {
    let rowBase = Math.floor(house / 3) * 3;
    let columnBase = (house % 3) * 3;

    let row = rowBase + Math.floor(index / 3);
    let column = columnBase + index % 3;

    return (row * 9) + column;
  }

  cellsInRow(row: number): number[] {
    let baseIndex = row * 9;
    let cells = [];
    for(let i = 0; i < 9; i++) { cells.push(baseIndex++); }
    return cells;
  }

  cellsInColumn(column: number): number[] {
    let baseIndex = column;
    let cells = [];
    for(let i =0; i<9; i++) { cells.push(baseIndex); baseIndex += 9; }

    return cells;
  }

  cellsInHouse(house: number): number[] {
    let baseIndex = this.indexInHouse(house, 0);
    let cells = [];
    for(let i =0; i < 9; i++) {
      let hr = Math.floor(i / 3);
      let hc = i % 3;
      cells.push(baseIndex + hr * 9 + hc);
    }
    return cells;
  }

  validate() : ValidationResult
  {
    let result = new ValidationResult(true, true);
    for(let rch = 0; rch < 9; rch++) {
        let row_array: Array<Cell> = new Array();
        let col_array: Array<Cell> = new Array();
        let house_array: Array<Cell> = new Array();
        for(let i = 0; i < 9; i ++) {
            row_array.push(this.grid.cells[this.index(i, rch)]);
            col_array.push(this.grid.cells[this.index(rch, i)]);

            let house_row = 3 * Math.floor(rch / 3);
            let house_col = 3 * (rch % 3);
            house_array.push(this.grid.cells[this.index(house_col + i % 3, house_row + Math.floor(i / 3))]);
        }
        result.and(this.validate_set(row_array));
        result.and(this.validate_set(col_array));
        result.and(this.validate_set(house_array));
    }

    return result;
  }

  setCellValue(cell: number, value: number): void {
    this.grid.cells[cell].value = value;
    this.grid.cells[cell].empty = false;
  }

  clearCell(cell: number) {
    this.grid.cells[cell].empty = true;
  }

  toggleInCellCandidates(cell: number, value: number, mark: CellMark): void {
    console.log(`Toggle ${value} in ${cell} to ${mark}`)
    if (this.getCandidate(cell, value) == mark) {
      this.setCandidate(cell, value, CellMark.None);
    } else {
      this.setCandidate(cell, value, mark);
    }
  }

  getCandidate(cell: number, value: number): CellMark {
    return this.grid.cells[cell].candidates[value-1];
  }
  setCandidate(cell: number, value: number, cellMark: CellMark) {
    this.grid.cells[cell].candidates[value-1] = cellMark;
    console.log(`Setting ${value} in ${cell} to ${cellMark}`);
  }

  generateCandidates(): void {
    for(let i = 0; i < 81; i ++) {

      for(let c = 1; c < 10; c++) {

        if (this.grid.cells[i].empty) {

          if (this.getCandidate(i, c) != CellMark.Marked && this.getCandidate(i,c) != CellMark.Rejected) {
            this.setCandidate(i,c,CellMark.Candidate);
          }

        } else {
            this.setCandidate(i,c,CellMark.None);
        }

      }
    }

    for(let i = 0; i < 81; i++) {
      if (!this.grid.cells[i].empty) {
        let value = this.grid.cells[i].value;
        console.log(`Removing ${value} at ${i}`);
        let row = this.row(i);
        let column = this.column(i);
        let house = this.house(i);

        for(let j = 0; j < 9; j++) {
          const cells = [ (row*9) + j, (j * 9) + column, this.indexInHouse(house, j) ];
          for (let c of cells) {
            if (this.getCandidate(c, value) == CellMark.Candidate) {
              this.setCandidate(c, value, CellMark.None);
            }
          }
        }
      }
    }
  }

  seenBy(cell: number): number[] {
    let allSeen = new Set<number>([]);
    for(const i of this.cellsInRow(this.row(cell))) {
      allSeen.add(i);
    }
    for(const i of this.cellsInColumn(this.column(cell))) {
      allSeen.add(i);
    }
    for(const i of this.cellsInHouse(this.house(cell))) {
      allSeen.add(i);
    }

    return Array.from(allSeen.values());
  }
}
