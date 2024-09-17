import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
		'./src/components/**/*.{tsx,ts}',
		'./src/app/**/*.{tsx,ts}',
		'./src/utils/**/*.{tsx,ts}',
	],
	theme: {
    	extend: {
    		fontFamily: {
    			'neue-montreal-normal': ['var(--neue-montreal-normal)'],
    			'neue-montreal-medium': ['var(--neue-montreal-medium)'],
    			'tusker-grotesk-medium': ['var(--tusker-grotesk-medium)'],
    			'tusker-grotesk-semibold': ['var(--tusker-grotesk-semibold)']
    		},
    		maxWidth: {
    			widhest: '1600px'
    		},
    		maxHeight: {
    			highest: '1400px'
    		},
    		borderRadius: {
    			'4xl': '3rem',
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};

export default config;
