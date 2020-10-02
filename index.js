/**
 * @type {function}
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
	 * Stores timeout
	 * @property {number} throttleTimer
	 */
	let throttleTimer
	/**
	 * Has throttle been idle?
	 * @property {boolean} idle 
	 * @default true
	 */
	let isIdle = true
	/**
	 * Tracks function iterations
	 * @property {number} counter
	 * @default 0
	 */
	let counter = 0
	/**
	 * Restrain execution of **func** too one every duration of **delay**
	 * @function throttle
	 * @param {function} func - callback function
	 * @param {number} delay - ms
	 * @param {Object} [options] - optional params for additional configuration
	 * @param {boolean} [options.cancel = false] - cancels current throttle
	 * @param {boolean} [options.init = true] - toggles initial execute
	 * @param {number} [options.idleResetDelay = delay*1.5] - configure delay of state reset to idle
	 * @param {number} [options.executeEvery = 0] - additonally execute **func** every **executeEvery**
	 */
	this.throttle = (func, delay, options = {}) => {
		const {
			cancel = false, 
			init = true, 
			idleResetDelay = delay*1.5,
			executeEvery = 0
		} = options
		return new Promise((resolve) => {
			
			// initial execution
			if(init) {
				if(isIdle) {
					func()
					isIdle = false
				}
				// reset **isIdle** when idle
				this.debounce(() => isIdle = true, idleResetDelay)
			}

			// additionally execute function 
			// every **executeEvery**:nth iteration
			counter++
			if(executeEvery === counter) {
				func()
				counter = 0
				resolve('function executed')
			}

			// allows param exchange during throttle
			if(cancel) {
				clearTimeout(throttleTimer)
				throttleTimer = undefined
			}

			// stops additional func executions during a timeout
			if(throttleTimer) return

			// saving timeout, which allows throttle behaviour  
			throttleTimer = setTimeout(() => {
				func()
				throttleTimer = undefined
				resolve('function executed')
			}, delay)
		})
	}
}

module.exports = Restrain