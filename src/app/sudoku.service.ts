import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  getGrid(): string[] {
    return this.grid;
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
}
