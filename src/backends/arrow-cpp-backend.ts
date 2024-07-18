import { AsyncRecordBatchStreamReader } from 'apache-arrow';
import { PassThrough, Readable } from "node:stream";
import { recordBatchTransform } from './record-batch-transform';


export async function arrowCppBackend(path: string, signal?: AbortSignal): Promise<Readable> {
  const readParquet = await (async () => {
    try {
      const module = await import("parquet-reader");
      return module.readParquet;
    } catch (error) {
      throw new Error(`cannot find prebuilt arrow module, either build the module or use another backend: ${error}`);
    }
  })();
  const stream = new PassThrough;
  readParquet(path, stream);
  return recordBatchTransform((await AsyncRecordBatchStreamReader.from(stream)).toNodeStream(), signal);
}
