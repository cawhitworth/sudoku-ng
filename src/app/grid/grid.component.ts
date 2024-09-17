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

  constructor() {
    this.sudokuGrid = this.sudokuService.getGrid()
  }
}
