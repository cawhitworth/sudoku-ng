import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from "../cell/cell.component";
import { SudokuService } from '../sudoku.service';
import { Grid } from '../grid';

@Component({
  host: {
    '(document:keyup)': 'keyPressed($event)'
  },
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  sudokuService: SudokuService = inject(SudokuService);
  sudokuGrid: Grid;
  highlightedCell: number = -1;
  complete: boolean = false;
  valid: boolean = false;
  constructor() {
    this.sudokuGrid = this.sudokuService.getGrid()
    this.complete = this.sudokuService.getComplete();
    this.valid = this.sudokuService.getValid();
  }

  update(): void {
    console.log("Grid updated");
    this.complete = this.sudokuService.getComplete();
    this.valid = this.sudokuService.getValid();
    console.log(`Complete: ${this.complete}`);
    console.log(`Valid: ${this.valid}`);
  }

  gridClicked(cell: number): void {
    console.log(`Cell ${cell} clicked`);
    this.highlightedCell = cell;
  }

  keyPressed(evt: KeyboardEvent): void {
    console.log(`Key ${evt.key} pressed`);
    let num = parseInt(evt.key);
    if (this.highlightedCell >=0 && this.highlightedCell <= 81) {
      if (!Number.isNaN(num)) {
        this.sudokuGrid.cells[this.highlightedCell].value = num;
        this.sudokuGrid.cells[this.highlightedCell].empty = false;
      }
      if (evt.key == 'Delete' || evt.key == 'Backspace') {
        this.sudokuGrid.cells[this.highlightedCell].empty = true;
      }
    }
    this.update();
  }
}
