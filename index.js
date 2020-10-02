/**
 * @type {function} Restrain
 * @instance Contains methods for restrict rapid function execution
 * @example 
 * const { debounce, throttle } = new Restrain()
 * debounce(func, delay, cancel)
 * throttle(func, delay, cancel)
 */
export default function Restrain() {

	/**
	 * Holds debouncers Timeout
	 * @property {number} debounceTimer
	 */
	let debounceTimer
	/**
	 * Delay execution of **func** until _idle_ for duration of **delay**
	 * @param {function} func - callback function
	 * @param {number} delay - ms
	 * @param {bool} cancel - cancels execution of debouncing function
	 * @returns {Promise} - resolve on execution and cancelation, with a corresponding message
	 */
	this.debounce = (func, delay, cancel) => {
		return new Promise((resolve, reject) => {

			// prevents ticking func execution
			clearTimeout(debounceTimer)

			// on cancel: resolve after clearTimeout, resulting in no ticking func in debounceTimer
			if(cancel) resolve('function canceled')

			// sets execution of func after delay
			debounceTimer = setTimeout(() => {
				func()
				resolve('function executed')
			}, delay )
		})
	}

	/**
	 * Holds throttle Timeout
	 * @property {number} throttleTimer
	 */
	let throttleTimer
	/**
	 * Restrain execution of **func** too one every duration of **delay**
	 * @param {function} func - callback function
	 * @param {number} delay - ms
	 * @param {bool} cancel - cancels current timeout, allowing a new timeout to replace it
	 * @returns {Promise} - resolve on execution
	 */
	this.throttle = (func, delay, cancel) => {
		return new Promise((resolve, reject) => {

			// cancels current timeout, allowing a new timeout to replace it
			if(cancel) {
				clearTimeout(throttleTimer)
				throttleTimer = undefined
			}

			// returns if throttleTimer contains a ticking func execution
			if(throttleTimer) return

			// starts a timeout to execute func after delay
			throttleTimer = setTimeout(() => {
				func()
				throttleTimer = undefined
				resolve('function executed')
			}, delay)
		})
	}
}