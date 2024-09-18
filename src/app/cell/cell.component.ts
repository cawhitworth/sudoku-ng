import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grid } from '../grid';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {
  @Input() parentgrid!: Grid;
  @Input() cellIndex!: number;
  @Input() highlighted: boolean = false;

  @Output() parentgridChange = new EventEmitter<Grid>();
  @Output() gridClicked = new EventEmitter<number>();

  cellClick(): void {
    this.gridClicked.emit(this.cellIndex);
  }

  updateParentGrid(evt: any): void {
    let newValue: number = parseInt(evt.target.value);
    if (Number.isNaN(newValue)) {
      this.parentgrid.cells[this.cellIndex].empty = true;
    } else if (newValue >= 1 && newValue <= 9) {
      this.parentgrid.cells[this.cellIndex].empty = false;
      this.parentgrid.cells[this.cellIndex].value = newValue;
    }
    console.log("Changing: " + this.cellIndex+" to " + (this.parentgrid.cells[this.cellIndex].empty ? "Empty" : this.parentgrid.cells[this.cellIndex].value));
    this.parentgridChange.emit(this.parentgrid);
  }

}
