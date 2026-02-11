import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export function useMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = debounce(
			() => setIsMobile(window.innerWidth < 768),
			200,
		);

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isMobile;
}
