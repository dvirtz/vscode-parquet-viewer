import bindings from 'pkg-prebuilds';
import { Stream } from 'stream';
import bindingOptions from './binding-options';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

interface ParquetReader
{
  readParquet: (path: string, stream: Stream) => void;
}

const rootPath = path.basename(__dirname) == 'dist' ? path.join(__dirname, '..') : __dirname;

export const { readParquet } = bindings<ParquetReader>(rootPath, bindingOptions);
