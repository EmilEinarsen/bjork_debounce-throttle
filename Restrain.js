export default function Restrain() {

	let debounceTimer
	this.debounce = (func, delay, cancel) => {
		return new Promise((resolve, reject) => {
			
			clearTimeout(debounceTimer)
			if(cancel) reject('function canceled')
			
			debounceTimer = setTimeout(() => {
				func()
				resolve('function executed')
			}, delay )

		})
	}

	
	let throttleTimer
	this.throttle = (func, delay, cancel) => {
		return new Promise(resolve => {

			if(cancel) throttleTimer = undefined
			if(throttleTimer) return

			throttleTimer = setTimeout(() => {
				func()
				throttleTimer = undefined
				resolve('function executed')
			}, delay)
		})
	}
}