import { Injectable } from '@angular/core';

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
  getGrid(): string[]
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

  grid: string[] = [];

  constructor() {
    for (let c of this.partial) { this.grid.push(c); }
  }

  validate_set(set: Array<string>) : ValidationResult
  {
    let working_set = new Set();
    let result = new ValidationResult(true, true);

    for(const i of set) {
        if (i === '.') {
            result.complete = false;
            continue;
        }
        if (working_set.has(i)) {
            result.valid = false;
        }
        working_set.add(i)
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
        let row_array: Array<string> = new Array();
        let col_array: Array<string> = new Array();
        let house_array: Array<string> = new Array();
        for(let i = 0; i < 9; i ++) {
            row_array.push(this.grid[this.index(i, rch)]);
            col_array.push(this.grid[this.index(rch, i)]);

            let house_row = 3 * Math.floor(rch / 3);
            let house_col = 3 * (rch % 3);
            house_array.push(this.grid[this.index(house_col + i % 3, house_row + Math.floor(i / 3))]);
        }
        result.and(this.validate_set(row_array));
        result.and(this.validate_set(col_array));
        result.and(this.validate_set(house_array));
    }

    return result;
  }
}
