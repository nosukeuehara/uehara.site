/* tslint:disable */
/* eslint-disable */

export class BitPetWasm {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    feed(now: bigint): string;
    feed_with_local_day_offset(now: bigint, local_day_offset_seconds: number): string;
    static from_save_json(save_json: string, now: bigint): BitPetWasm;
    static from_save_json_with_local_day_offset(save_json: string, now: bigint, local_day_offset_seconds: number): BitPetWasm;
    go(now: bigint): string;
    go_with_local_day_offset(now: bigint, local_day_offset_seconds: number): string;
    static new_game(now: bigint): BitPetWasm;
    static new_game_with_local_day_offset(now: bigint, local_day_offset_seconds: number): BitPetWasm;
    play(now: bigint): string;
    play_with_local_day_offset(now: bigint, local_day_offset_seconds: number): string;
    report(now: bigint): string;
    save_json(): string;
    status(now: bigint): string;
    status_with_local_day_offset(now: bigint, local_day_offset_seconds: number): string;
    streak(now: bigint): string;
    streak_with_local_day_offset(now: bigint, local_day_offset_seconds: number): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_bitpetwasm_free: (a: number, b: number) => void;
    readonly bitpetwasm_feed: (a: number, b: bigint) => [number, number, number, number];
    readonly bitpetwasm_feed_with_local_day_offset: (a: number, b: bigint, c: number) => [number, number, number, number];
    readonly bitpetwasm_from_save_json: (a: number, b: number, c: bigint) => [number, number, number];
    readonly bitpetwasm_from_save_json_with_local_day_offset: (a: number, b: number, c: bigint, d: number) => [number, number, number];
    readonly bitpetwasm_go: (a: number, b: bigint) => [number, number, number, number];
    readonly bitpetwasm_go_with_local_day_offset: (a: number, b: bigint, c: number) => [number, number, number, number];
    readonly bitpetwasm_new_game: (a: bigint) => [number, number, number];
    readonly bitpetwasm_new_game_with_local_day_offset: (a: bigint, b: number) => [number, number, number];
    readonly bitpetwasm_play: (a: number, b: bigint) => [number, number, number, number];
    readonly bitpetwasm_play_with_local_day_offset: (a: number, b: bigint, c: number) => [number, number, number, number];
    readonly bitpetwasm_report: (a: number, b: bigint) => [number, number, number, number];
    readonly bitpetwasm_save_json: (a: number) => [number, number, number, number];
    readonly bitpetwasm_status: (a: number, b: bigint) => [number, number, number, number];
    readonly bitpetwasm_status_with_local_day_offset: (a: number, b: bigint, c: number) => [number, number, number, number];
    readonly bitpetwasm_streak: (a: number, b: bigint) => [number, number, number, number];
    readonly bitpetwasm_streak_with_local_day_offset: (a: number, b: bigint, c: number) => [number, number, number, number];
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
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
