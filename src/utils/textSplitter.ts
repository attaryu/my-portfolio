import type { SplitTypeOptions, TargetElement } from 'split-type';

import SplitType from 'split-type';

export default function textSplitter(
  target: string,
  container: HTMLElement,
  options?: Partial<SplitTypeOptions>,
) {
  return new SplitType(container.querySelector(target) as TargetElement, {
    tagName: 'span',
    ...options,
  });
}
