import { AsyncRecordBatchStreamReader } from "apache-arrow";
import { readParquet } from "parquet-wasm/node/arrow1";
import { promises } from "fs";
import { ArrowBackend } from "./arrow-backend";

export class ParquetWasmBackend extends ArrowBackend {
  async readParquet(path: string) {
    const data = new Uint8Array(await promises.readFile(path));
    const stream = readParquet(data);
    return AsyncRecordBatchStreamReader.from(stream.intoIPCStream());
  }
}
