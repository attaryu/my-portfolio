'use client';

import _ from 'lodash';
import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import useEvent from '@/hooks/useEvent';
import { forwardRef } from 'react';

interface Props
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: string | React.ReactNode;
  disabled?: boolean;
  cursorHoverScale?: number;
}

const AnimatedLink = forwardRef<HTMLAnchorElement, Props>(
  (
    { href, children, disabled, onClick, cursorHoverScale, ...otherAttributes },
    ref,
  ) => {
    const router = useRouter();
    const pathname = usePathname();

    const loadingOut = useEvent('loading@out');
    const loadingAnimationEnd = useEvent('loadingAnimation@end');

    const navigateTo = _.debounce(() => {
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
        ref={ref}
        data-hover
        data-hover-scale={cursorHoverScale ?? 3.2}
        {...otherAttributes}
      >
        {children}
      </Link>
    );
  },
);

export default AnimatedLink;
