// https://stackoverflow.com/a/64174790/621176
export const BackendNames = ['parquet-tools', 'parquets', 'arrow'] as const;
export type BackendName = typeof BackendNames[number];
