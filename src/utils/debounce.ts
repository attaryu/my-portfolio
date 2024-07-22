export default function debounce(fn: (...args: any) => any, timeout: number) {
  let timer: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => { fn.apply(args) }, timeout);
  }
}
