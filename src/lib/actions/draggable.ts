export default function draggable(
	node: HTMLElement,
	options: { noscroll?: boolean } = { noscroll: false }
) {
	let x;
	let y;
	let initTop, initHeight;
	let initLeft, initWidth;
	function handleMousedown(event) {
		event.preventDefault();
		const { top, height, left, width } = node.getBoundingClientRect();

		initTop = top;
		initHeight = height;
		initWidth = width;
		initLeft = left;
		if (event.type == 'touchstart') {
			document.querySelector('html').classList.add('no-scroll');
			x = event.touches[0].pageX;
			y = event.touches[0].pageY;
		}
		x = event.pageX;
		y = event.pageY;
		node.dispatchEvent(
			new CustomEvent('dragstart', {
				detail: { x, y }
			})
		);

		window.addEventListener('touchmove', handleMousemove, { passive: true });
		window.addEventListener('touchend', handleMouseup, { passive: true });
		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup, { passive: true });
	}

	function handleMousemove(event) {
		if (event.type == 'touchmove') {
			(x = initWidth + event.touches[0].pageX - initLeft),
				(y = initHeight + event.touches[0].pageY - initTop);
			node.dispatchEvent(
				new CustomEvent('dragmove', {
					detail: {
						x,
						y
					}
				})
			);
		} else {
			x = initWidth + event.pageX - initLeft;
			(y = initHeight + event.pageY - initTop),
				// console.log(x, y, dx, dy)
				node.dispatchEvent(
					new CustomEvent('dragmove', {
						detail: { x, y }
					})
				);
		}
	}

	function handleMouseup(event) {
		if (event.type == 'touchend') {
			// console.log(JSON.stringify(event))
			document.querySelector('html').classList.remove('no-scroll');
			x = event.changedTouches[0].pageX;
			y = event.changedTouches[0].pageY;
		} else {
			x = event.pageX;
			y = event.pageY;
		}

		node.dispatchEvent(
			new CustomEvent('dragend', {
				detail: { x, y }
			})
		);

		window.removeEventListener('touchmove', handleMousemove);
		window.removeEventListener('touchend', handleMouseup);
		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}

	node.addEventListener('touchstart', handleMousedown, { passive: true });
	node.addEventListener('mousedown', handleMousedown, { passive: true });

	return {
		destroy: () => {
			node.removeEventListener('touchstart', handleMousedown);
			node.removeEventListener('mousedown', handleMousedown);
		}
	};
}
