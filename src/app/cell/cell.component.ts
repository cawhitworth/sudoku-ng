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
  @Input() parentgrid: Grid;
  @Input() cellIndex: number;
  @Input() highlighted: boolean = false;

  @Output() parentgridChange = new EventEmitter<Grid>();
  @Output() gridClicked = new EventEmitter<number>();

  constructor() {
    this.parentgrid = {
      cells: [ {
        value: 0,
        empty: true,
        candidates: []
      }]
    };
    this.cellIndex = 0;
  }

  cellClick(): void {
    this.gridClicked.emit(this.cellIndex);
  }
}
