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
  @Input() autoremove!: boolean;

  @Output() modeChange = new EventEmitter<string>();
  @Output() autoremoveChange = new EventEmitter<boolean>();
  @Output() autoNoteClick = new EventEmitter();
  @Output() clearAllClick = new EventEmitter();
  @Output() numberClick = new EventEmitter<number>();

  onModeChange(mode:string) {
    console.log(`Mode change: ${mode}`);
    this.modeChange.emit(mode);
  }

  onAutoremoveChange() {
    console.log(`Autoremove: ${this.autoremove}`)
    this.autoremoveChange.emit(this.autoremove);
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
