import bindings from 'pkg-prebuilds';
import { Stream } from 'stream';
import bindingOptions from './binding-options';

interface ParquetReader
{
  readParquet: (path: string, stream: Stream) => void;
}

export const { readParquet } = bindings<ParquetReader>(__dirname, bindingOptions);
