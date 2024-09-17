import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {
  @Input() parentgrid!: string[];
  @Input() cellIndex!: number;

  @Output() parentgridChange = new EventEmitter<string[]>();

  updateParentGrid(evt: any): void {
    this.parentgrid[this.cellIndex] = evt.target.value;
    console.log("Changing "+this.cellIndex);
    this.parentgridChange.emit(this.parentgrid);
  }

}
