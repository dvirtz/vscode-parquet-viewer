import { csvSeparator } from '../settings';
import { Formatter } from "./formatter";

export class CsvFormatter implements Formatter {
  async* format(lines: AsyncGenerator<object>): AsyncGenerator<string> {
    const first = await lines.next();
    if (first.value) {
      yield this.generateHeader(first.value);
      yield this.generateRow(first.value);
    }
    for await (const line of lines) {
      yield this.generateRow(line);
    }
  }

  format_error(message: string): string {
    return message;
  }

  private generateHeader(line: object) {
    return Object.keys(line).join(csvSeparator());
  }

  private generateRow(line: object) {
    return Object.values(line).join(csvSeparator());
  }
}
