# SudokuNg

This is an implementation of a Sudoku game using Angular/Typescript.

## Playing

With a development server running:

* Use the arrow keys or click to select a cell.
* Press 1-9 to fill/annonate/mark/reject a value in a cell (press again to toggle)
  * **Fill** means you're sure a value goes in a cell (press delete to undo)
  * **Annotate** means a value is a candidate for a cell
  * **Mark** highlights a value in a cell
  * **Reject** marks a value as rejected for a cell
* (Press F/A/M/R to select the current mode)
* **Auto-note** annotates candidate values for every cell based on currently-filled cells
* **Clear all** clears the whole grid

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
