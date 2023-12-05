import { Formatter } from "./formatter";
import { JsonFormatter } from "./json-formatter";

export function createFormatter(): Formatter {
  return new JsonFormatter;
}
