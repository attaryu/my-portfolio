import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/components/**/*.tsx',
		'./src/app/**/*.tsx',
	],
	theme: {
		extend: {
      fontFamily: {
        'neue-montreal-normal': ['var(--neue-montreal-normal)'],
        'neue-montreal-medium': ['var(--neue-montreal-medium)'],
        'tusker-grotesk-medium': ['var(--tusker-grotesk-medium)'],
        'tusker-grotesk-semibold': ['var(--tusker-grotesk-semibold)'],
      },
			maxWidth: {
				'widhest': '1600px',
			},
			maxHeight: {
				'highest': '1400px',
			},
			borderRadius: {
				'4xl': '3rem',
			},
    },
	},
	plugins: [],
};

export default config;
