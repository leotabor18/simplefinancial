import type { Config } from 'tailwindcss';

export default {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        ssm: { min: '640px', max: '767px' },
      },
      fontSize: {
        xs: '0.75rem',
      },
      spacing: {
        xs: '4px',
      },
      colors: {
        primary: '#084D78',
        secondary: '#099891',
        background: '#F5F5F5',
        success: '#34A853',
        textLight: '#706C6D',
        foreground: 'var(--foreground)',
        gray: '#E1E1E1',
        grayLight: '#F5F5F5',
        'text-default': '#4285F4',
        'text-success': '#A9E0B8',
      },
    },
  },
  plugins: [],
} satisfies Config;
