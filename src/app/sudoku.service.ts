import { Injectable } from '@angular/core';
import { Grid } from './grid';
import { Cell } from './cell';

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
        candidates: new Array<number>()
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

  index(col: number, row:number) : number
  {
    return row * 9 + col;
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

  toggleInCellCandidates(cell: number, value: number): void {
    console.log(`Toggle ${value} in ${cell}`)
    const index = this.grid.cells[cell].candidates.indexOf(value);
    if (index < 0) {
      this.grid.cells[cell].candidates.push(value);
    } else {
      this.grid.cells[cell].candidates.splice(index, 1);
    }
    console.log(`Candidates for ${cell}: ${this.grid.cells[cell].candidates}`)
  }

  removeCandidate(cell: number, value: number) {
    const index = this.grid.cells[cell].candidates.indexOf(value);
    if (index >= 0) {
      this.grid.cells[cell].candidates.splice(index, 1);
      console.log(`Removing ${value} from ${cell}`);
    }
  }

  indexInHouse(house: number, index: number): number {
    let rowBase = Math.floor(house / 3) * 3;
    let columnBase = (house % 3) * 3;

    let row = rowBase + Math.floor(index / 3);
    let column = columnBase + index % 3;

    return (row * 9) + column;
  }

  generateCandidates(): void {
    for(let i = 0; i < 81; i ++) {
      if (this.grid.cells[i].empty) {
        this.grid.cells[i].candidates = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
      } else {
        this.grid.cells[i].candidates = [];
      }
    }

    for(let i = 0; i < 81; i++) {
      if (!this.grid.cells[i].empty) {
        let value = this.grid.cells[i].value;
        console.log(`Removing ${value} at ${i}`);
        let row = Math.floor(i/9);
        let column = i % 9;
        let house = (Math.floor(row/3) * 3) + Math.floor(column/3);

        for(let j = 0; j < 9; j++) {
          // row
          this.removeCandidate((row * 9) + j, value);
          // column
          this.removeCandidate((j * 9) + column, value);
          // house
          this.removeCandidate(this.indexInHouse(house, j), value);
      }
      }
    }
  }
}
