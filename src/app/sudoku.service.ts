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

  partial       = "8842..7.." +
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
        this.grid.cells[i].candidates = [ 1, 3, 5, 7, 9 ];
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
}
