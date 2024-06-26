import bindings from 'pkg-prebuilds';
import { Stream } from 'stream';
import bindingOptions from './binding-options';
import * as path from 'path';

interface ParquetReader
{
  readParquet: (path: string, stream: Stream) => void;
}

const rootPath = path.basename(__dirname) == 'dist' ? path.join(__dirname, '..') : __dirname;

export const { readParquet } = bindings<ParquetReader>(rootPath, bindingOptions);
