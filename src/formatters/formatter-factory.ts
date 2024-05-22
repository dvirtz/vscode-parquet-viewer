import { format } from "../settings";
import { CsvFormatter } from "./csv-formatter";
import { Formatter } from "./formatter";
import { JsonFormatter } from "./json-formatter";

export function createFormatter(): Formatter {
  switch (format()) {
    case 'json':
      return new JsonFormatter;
    case 'csv':
      return new CsvFormatter;
  }
}
