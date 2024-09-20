export interface Cell {
    value: number,
    empty: boolean,
    candidates: number[],
    marked: number[],
    rejected: number[]
}