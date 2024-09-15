'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import useEvent from '@/hooks/useEvent';
import debounce from '@/utils/debounce';

interface Props extends LinkProps, Omit<React.ComponentProps<'a'>, 'href'> {
  children: string | React.ReactNode;
  disabled?: boolean;
  'data-hover-scale'?: number;
}

export default function AnimatedLink({
  href,
  children,
  disabled,
  onClick,
  ...otherAttributes
}: Readonly<Props>) {
  const router = useRouter();
  const pathname = usePathname();

  const loadingOut = useEvent('loading@out');
  const loadingAnimationEnd = useEvent('loadingAnimation@end');

  const navigateTo = debounce(() => {
    loadingOut.publish();

    const unsubscribe = loadingAnimationEnd.subscribe(() => {
      router.push(href as string);
      unsubscribe();
    });
  }, 200);

  function onClickHandler(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    if (!disabled) {
      if (typeof onClick === 'function') {
        onClick(e);
      }

      if (pathname !== href) {
        navigateTo();
      }
    }
  }

  return (
    <Link
      href={href}
      onClick={onClickHandler}
      data-hover
      data-hover-scale={otherAttributes['data-hover-scale'] ?? 3.2}
      {...otherAttributes}
    >
      {children}
    </Link>
  );
}
