// https://stackoverflow.com/a/48293566
export async function* zip<T extends AsyncIterable<unknown>[]>(...iterables: T) {
  const iterators = iterables.map(i => i[Symbol.asyncIterator]())
  while (true) {
    const results = await Promise.all(iterators.map(async iter => await iter.next()));
    if (results.some(res => res.done)) break;
    yield results.map(res => res.value);
  }
}
