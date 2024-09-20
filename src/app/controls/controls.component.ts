import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {
  @Input() mode: string = "mark";

  @Output() modeChange = new EventEmitter<string>();

  onModeChange(mode:string) {
    console.log(`Mode change: ${mode}`);
    this.modeChange.emit(mode);
  }
}
