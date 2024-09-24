export enum CellMark {
    None,
    Candidate,
    Marked,
    Rejected
}

export interface Cell {
    value: number,
    empty: boolean,
    candidates: CellMark[],
}