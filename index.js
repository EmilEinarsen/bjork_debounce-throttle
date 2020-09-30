export function Debounce() {
	let timer
	this.run = ({func, delay, cancel}) => {
		clearTimeout(timer)
		if(cancel) return
		timer = setTimeout(() => func(), delay)
	}
}
export function Throttle() {
	let timer
	this.run = ({func, delay, cancel}) => {
		if(cancel) timer = undefined
		if(timer) return
		timer = setTimeout(() => {
			func()
			timer = undefined
		}, delay)
	}
}