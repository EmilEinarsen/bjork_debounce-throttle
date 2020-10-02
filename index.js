/**
 * @type {function} Restrain
 * @instance Contains methods for restrict rapid function execution
 * @example 
 * const { debounce, throttle } = new Restrain()
 * debounce(func, delay, cancel)
 * throttle(func, delay, cancel)
 */
function Restrain() {

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
	let firstCall = true
	let counter = 0
	/**
	 * Optional params for additional configuration of throttling
	 * @typedef {Object} Options
	 * @property {boolean} [cancel]
	 * @property {boolean} [init]
	 * @property {number} [executeOnCount]
	 */
	/**
	 * Restrain execution of **func** too one every duration of **delay**
	 * @function throttle
	 * @param {function} func - callback function
	 * @param {number} delay - ms
	 * @param {Options} options
	 */
	this.throttle = (func, delay, options = {cancel = false, init = true, executeOnCount = 0} = {}) => {
		let {cancel, init, executeOnCount} = options
		return new Promise((resolve) => {
			
			if(firstCall && init) {
				func()
				firstCall = false
			}
			if(init) this.debounce(() => firstCall = true, delay*1.5)

			counter++
			if(executeOnCount === counter) {
				func()
				counter = 0
				resolve('function executed')
			}

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

throttleTest()
async function throttleTest() {
	let index = 0
	let interval
	const { throttle } = new Restrain()

	interval = setInterval(async() => {
		if(index === 20) clearInterval(interval)
		console.log(index++)

		/**
		 * After delayed-duration, execute given function
		 */
		throttle(() => console.log('execution'), 1000, {executeOnCount: 7})
	}, 200)

	setTimeout(() => throttleTest(), 10000)
}

module.exports = Restrain