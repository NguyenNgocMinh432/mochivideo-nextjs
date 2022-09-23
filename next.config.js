/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['i.scdn.co', 'mosaic.scdn.co', 'mochien3.1-api.mochidemy.com', 'https://cdn.dribbble.com/'],
	},
};

module.exports = nextConfig;

