/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.html.am',
				port: '',
				pathname: '/images/html-codes/links/**',
			},
		],
	},
};

module.exports = nextConfig;
