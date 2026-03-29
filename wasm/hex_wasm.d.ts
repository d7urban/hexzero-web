/* tslint:disable */
/* eslint-disable */

/**
 * Incremental MCTS session that yields leaf states for external evaluation.
 */
export class MctsSession {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Get the best move after all simulations.
     */
    bestMove(): any;
    /**
     * True when all simulations are complete.
     */
    done(): boolean;
    /**
     * Create a new MCTS session. Replay `moves_js` to build the root state.
     */
    constructor(size: number, pie_rule: boolean, moves_js: any, sims: number);
    /**
     * Select a leaf node for evaluation.
     *
     * Returns `{ features: Float32Array, sizeNorm: number, planes: number, boardSize: number }`
     * if the leaf needs NN evaluation, or `null` if the leaf was terminal
     * (backup is handled internally).
     *
     * After a non-null return, call `supplyEval()` with the NN output.
     */
    selectLeaf(): any;
    /**
     * Provide the NN evaluation for the last selected leaf.
     *
     * `policy`: `Float32Array` of length `boardSize*boardSize + 1`.
     * `value`: scalar in `[-1, 1]`.
     */
    supplyEval(policy: Float32Array, value: number): void;
}

/**
 * JS-facing wrapper around [`HexState`].
 *
 * Holds the authoritative game state on the main thread.
 * The move history is tracked so it can be sent to the worker for replay.
 */
export class WasmHexState {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Apply a move. Panics on illegal moves.
     */
    applyMove(mv: any): void;
    /**
     * Flat row-major board as `Int8Array`.
     */
    boardData(): Int8Array;
    currentPlayer(): number;
    /**
     * Cell value at (row, col): BLACK (1), WHITE (-1), EMPTY (0).
     */
    get(row: number, col: number): number;
    /**
     * Quick check: is this specific move legal?
     */
    isLegal(mv: any): boolean;
    isTerminal(): boolean;
    /**
     * Last move object, or `null`.
     */
    lastMove(): any;
    /**
     * Array of legal move objects.
     */
    legalMoves(): any;
    moveCount(): number;
    /**
     * The full move list, for sending to the worker for state replay.
     */
    moveHistory(): any;
    constructor(size: number, pie_rule: boolean);
    pieRule(): boolean;
    size(): number;
    /**
     * Undo the last N moves. Returns the number of moves actually undone.
     */
    undo(n: number): number;
    /**
     * BLACK (1), WHITE (-1), or 0 if no winner yet.
     */
    winner(): number;
    /**
     * Cells on the winning path as `[{row, col}, ...]`, or empty array.
     */
    winningPath(): any;
}

export function black(): number;

/**
 * Call once at startup for readable panic messages in the browser console.
 */
export function init(): void;

/**
 * Run an MCTS search with uniform (random) evaluation and return the best move.
 */
export function mctsSearch(size: number, pie_rule: boolean, moves_js: any, sims: number): any;

export function white(): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_mctssession_free: (a: number, b: number) => void;
    readonly __wbg_wasmhexstate_free: (a: number, b: number) => void;
    readonly black: () => number;
    readonly mctsSearch: (a: number, b: number, c: any, d: number) => any;
    readonly mctssession_bestMove: (a: number) => any;
    readonly mctssession_done: (a: number) => number;
    readonly mctssession_new: (a: number, b: number, c: any, d: number) => number;
    readonly mctssession_selectLeaf: (a: number) => any;
    readonly mctssession_supplyEval: (a: number, b: number, c: number, d: number) => void;
    readonly wasmhexstate_applyMove: (a: number, b: any) => void;
    readonly wasmhexstate_boardData: (a: number) => [number, number];
    readonly wasmhexstate_currentPlayer: (a: number) => number;
    readonly wasmhexstate_get: (a: number, b: number, c: number) => number;
    readonly wasmhexstate_isLegal: (a: number, b: any) => number;
    readonly wasmhexstate_isTerminal: (a: number) => number;
    readonly wasmhexstate_lastMove: (a: number) => any;
    readonly wasmhexstate_legalMoves: (a: number) => any;
    readonly wasmhexstate_moveCount: (a: number) => number;
    readonly wasmhexstate_moveHistory: (a: number) => any;
    readonly wasmhexstate_new: (a: number, b: number) => number;
    readonly wasmhexstate_pieRule: (a: number) => number;
    readonly wasmhexstate_size: (a: number) => number;
    readonly wasmhexstate_undo: (a: number, b: number) => number;
    readonly wasmhexstate_winner: (a: number) => number;
    readonly wasmhexstate_winningPath: (a: number) => any;
    readonly white: () => number;
    readonly init: () => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
