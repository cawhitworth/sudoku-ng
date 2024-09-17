import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from "../cell/cell.component";
import { SudokuService } from '../sudoku.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  sudokuService: SudokuService = inject(SudokuService);
  sudokuGrid: string[];
  complete: boolean = false;
  valid: boolean = false;
  constructor() {
    this.sudokuGrid = this.sudokuService.getGrid()
    this.complete = this.sudokuService.getComplete();
    this.valid = this.sudokuService.getValid();
  }

  update(): void {
    console.log("Grid updated");
    console.log(this.sudokuGrid);
  }
}
