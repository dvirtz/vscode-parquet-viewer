// https://stackoverflow.com/a/64174790/621176
export const BackendNames = ['parquets', 'arrow', 'parquet-wasm'] as const;
export type BackendName = typeof BackendNames[number];
