import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {
  @Input() mode: string = "mark";

  @Output() modeChange = new EventEmitter<string>();
  @Output() autoNoteClick = new EventEmitter();
  @Output() clearAllClick = new EventEmitter();
  @Output() numberClick = new EventEmitter<number>();

  onModeChange(mode:string) {
    console.log(`Mode change: ${mode}`);
    this.modeChange.emit(mode);
  }

  onAutoNoteClick(): void {
    this.autoNoteClick.emit();
  }

  onClearAllClick(): void {
    this.clearAllClick.emit();
  }

  onNumberClick(n: number): void {
    this.numberClick.emit(n);
  }
}
