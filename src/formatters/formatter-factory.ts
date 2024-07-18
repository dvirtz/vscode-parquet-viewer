import { Transform } from 'node:stream';
import { format } from "../settings";
import { CsvFormatter } from "./csv-formatter";
import { JsonFormatter } from "./json-formatter";

export function createFormatter(): Transform {
  switch (format()) {
    case 'json':
      return new JsonFormatter;
    case 'csv':
      return new CsvFormatter;
  }
}
