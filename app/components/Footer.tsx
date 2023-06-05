import React from 'react';

function Footer() {
	return (
		<div className="fixed bottom-0 left-0 flex items-end justify-center w-full h-48 bg-gradient-to-t from-white via-white dark:from-black dark:via-black 2xl:static 2xl:h-auto 2xl:w-auto 2xl:bg-none">
			<a
				className="flex gap-2 p-8 pointer-events-none place-items-center 2xl:pointer-events-auto 2xl:p-0"
				href="https://github.com/FACorreiaa"
				target="_blank"
				rel="noopener noreferrer">
				Author: https://github.com/FACorreiaa
			</a>
		</div>
	);
}

export default Footer;
