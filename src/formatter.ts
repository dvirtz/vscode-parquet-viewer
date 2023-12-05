export abstract class Formatter
{
  abstract format(lines: AsyncGenerator<object>): AsyncGenerator<string>;

  abstract format_error(message: string): string;
}
