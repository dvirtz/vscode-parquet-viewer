import { Formatter } from "./formatter";
import { jsonSpace, jsonAsArray } from '../settings';

export class JsonFormatter extends Formatter {
  async* format(lines: AsyncGenerator<object>): AsyncGenerator<string> {
    if (jsonAsArray()) {
      yield* this.arrayLines(lines);
    } else {
      yield* this.generateRows(lines);
    }
  }

  private async *arrayLines(lines: AsyncGenerator<object>) {
    yield `[`;
    const rows = this.generateRows(lines);
    let current = await rows.next();
    if (!current.done) {
      let next = await rows.next();
      while (!next.done) {
        if (next.value) {
          yield `${current.value},`;
        }
        current = next;
        next = await rows.next();
      }
    }
    if (current.value) {
      yield current.value;
    }
    yield `]`;
  }

  format_error(message: string): string {
    return JSON.stringify({ error: message });
  }

  private async* generateRows(lines: AsyncGenerator<object>) {
    for await (const line of lines) {
      yield JSON.stringify(line, (key, value) => {
        return typeof value === 'bigint'
          ? this.bigIntToJson(value)
          : value; // return everything else unchanged
      }, jsonSpace());
    }
  }

  private bigIntToJson(value: bigint) {
    // serialize as a number if it's in bounds, otherwise as a string
    if (value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)) {
      return Number(value);
    }
    return value.toString();
  }

}
