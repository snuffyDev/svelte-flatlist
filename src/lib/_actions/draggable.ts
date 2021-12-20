export default function draggable(node: HTMLElement) {
	let y;
	let initTop, initHeight;
	let frame;
	let initOverflow;
	function preventScroll(event: UIEvent) {
		event.preventDefault();
	}
	function handleMousedown(event) {
		const { top, height } = node.getBoundingClientRect();

		initTop = top;
		initHeight = height;
		if (event.type == 'touchstart') {
			/* iOS Safari has issues with the body scrolling, even when not targeted,
			below is a hacky solution that (should) work on Android as well as Safari

			- event.preventDefault() on scroll
			- 'overflow: hidden;' on the HTML element

			*/

			document.body.addEventListener('scroll', preventScroll, { capture: true });
			initOverflow = getComputedStyle(document.querySelector('html')).overflow;

			document.querySelector('html').style.overflow = 'hidden';
			y = initHeight + event.touches[0].clientY - initTop;
		} else {
			y = event.clientY - initTop - 8;
		}

		node.dispatchEvent(
			new CustomEvent('dragstart', {
				detail: { y }
			})
		);

		window.addEventListener('touchmove', handleMousemove, { passive: true });
		window.addEventListener('touchend', handleMouseup, { passive: true });
		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup, { passive: true });
	}

	function handleMousemove(event) {
		if (event.type == 'touchmove') {
			/* Probably overkill, but this should hopefully
				 help performance on low-end touch devices
			*/
			y = event.touches[0].clientY - initTop;

			frame = () =>
				node.dispatchEvent(
					new CustomEvent('dragmove', {
						detail: {
							y
						}
					})
				);
			requestAnimationFrame(frame);
		} else {
			y = event.clientY - initTop - 8;
			node.dispatchEvent(
				new CustomEvent('dragmove', {
					detail: { y }
				})
			);
		}
	}

	function handleMouseup(event) {
		if (event.type == 'touchend') {
			y = event.changedTouches[0].clientY;
		} else {
			y = event.clientY - initTop - 8;
		}
		node.dispatchEvent(
			new CustomEvent('dragend', {
				detail: { y }
			})
		);
		if (event.type == 'touchend') {
			/* Removes the scroll block from the body element when finished dragging,
				 reverts to the initial overflow value set on the HTML node, along with
				 some (probably unneeded) cleanup with the RAF.
			*/

			document.body.removeEventListener('scroll', preventScroll, { capture: true });
			document.querySelector('html').style.overflow = initOverflow;
			cancelAnimationFrame(frame);
		}
		window.removeEventListener('touchmove', handleMousemove);
		window.removeEventListener('touchend', handleMouseup);
		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}

	node.addEventListener('touchstart', handleMousedown, { passive: true });
	node.addEventListener('mousedown', handleMousedown, { passive: true });

	return {
		destroy: () => {
			if (frame) {
				cancelAnimationFrame(frame);
			}
			node.removeEventListener('touchstart', handleMousedown);
			node.removeEventListener('mousedown', handleMousedown);
		}
	};
}
