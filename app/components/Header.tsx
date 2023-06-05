import React from 'react';
import './Header.css';

function Header() {
	return (
		<header>
			<nav className="text-center ">
				<div className="relative z-10 flex items-center justify-between w-full max-w-5xl font-mono text-sm shadow-lg mt:2 2xl:w-full 2xl:flex">
					<p className="fixed top-0 left-0 flex justify-center w-full pt-8 pb-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit 2xl:static 2xl:w-auto 2xl:rounded-xl 2xl:border 2xl:bg-gray-200 2xl:p-4 2xl:dark:bg-zinc-800/30">
						Memory&nbsp;
						<code className="font-mono font-bold">Card&nbsp;</code>
						Game
					</p>
				</div>
			</nav>
		</header>
	);
}

export default Header;
