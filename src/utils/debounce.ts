export default function debounce(callback: (...args: any) => any, timeout: number) {
  let timer: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => { callback(...args) }, timeout);
  }
}
