export default function clickOutside(node) {
	function clickhandler(event) {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent('outside'));
		}
	}
	window.addEventListener('click', clickhandler, { capture: true, passive: true });
	return {
		destroy: () => {
			window.removeEventListener('click', clickhandler);
		}
	};
}
