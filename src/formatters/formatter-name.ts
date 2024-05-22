// https://stackoverflow.com/a/64174790/621176
export const FormatterNames = ['json', 'csv'] as const;
export type FormatterName = typeof FormatterNames[number];
