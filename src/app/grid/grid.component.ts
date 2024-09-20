import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from "../cell/cell.component";
import { SudokuService } from '../sudoku.service';
import { Grid } from '../grid';
import { FormsModule } from '@angular/forms';
import { ControlsComponent } from '../controls/controls.component';

@Component({
  host: {
    '(window:keydown)': 'keyDown($event)',
    '(window:keyup)': 'keyPressed($event)'
  },
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, CellComponent, ControlsComponent, FormsModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  sudokuService: SudokuService = inject(SudokuService);
  sudokuGrid: Grid;
  highlightedCell: number = 0;
  complete: boolean = false;
  valid: boolean = false;
  mode: string = "annotate";

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
    console.log(`Mode: ${this.mode}`);
  }

  onGridClick(cell: number): void {
    console.log(`Cell ${cell} clicked`);
    this.highlightedCell = cell;
  }

  onAutoNoteClick():void {
    console.log("Auto-note");
    this.sudokuService.generateCandidates();
  }

  onClearAllClick():void {
    for(let i = 0; i < 81; i++) {
      this.sudokuService.clearCell(i);
      this.sudokuGrid.cells[i].candidates = [];
    }
    this.update();
  }

  keyDown(evt:KeyboardEvent): void {
    const swallow = [ 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Backspace', 'Space']
    if (swallow.includes(evt.key)) {
      evt.preventDefault();
    }
  }

  keyPressed(evt: KeyboardEvent): void {
    console.log(`Key ${evt.key} pressed`);
    let num = parseInt(evt.key);
    if (this.mode === "mark") {
      if (!Number.isNaN(num)) {
        this.sudokuService.setCellValue(this.highlightedCell, num);
      }
      if (evt.key == 'Delete' || evt.key == 'Backspace') {
        this.sudokuGrid.cells[this.highlightedCell].empty = true;
      }
    } else { // Annotate
      if (!Number.isNaN(num)) {
        this.sudokuService.toggleInCellCandidates(this.highlightedCell, num);
      }
    }
    if (evt.key === 'M' || evt.key === 'm') {
      this.mode = "mark";
    }
    if (evt.key === 'AM' || evt.key === 'a') {
      this.mode = "annotate";
    }
    if (evt.key === 'ArrowLeft' && this.highlightedCell % 9 > 0) {
      this.highlightedCell -= 1;
      evt.preventDefault();
    }
    if (evt.key === 'ArrowRight' && this.highlightedCell % 9 < 8) {
      this.highlightedCell += 1;
      evt.preventDefault();
    }
    if (evt.key === 'ArrowUp' && this.highlightedCell > 8) {
      this.highlightedCell -= 9;
      evt.preventDefault();
    }
    if (evt.key === 'ArrowDown' && this.highlightedCell < 72) {
      this.highlightedCell += 9;
      evt.preventDefault();
    }
    this.update();
  }
}
