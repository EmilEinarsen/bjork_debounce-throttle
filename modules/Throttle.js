const Debounce = require('./Debounce')

/**
 * Restrain execution of given function to one every set delay
 * @function Throttle
 * @method process - Main process or logic
 */
function Throttle() {
	
	/**
	 * Tracks timeout
	 * @property {number} timeout
	 */
	let timeout

	/**
	 * Has throttle been idle?
	 * @property {boolean} idle = true
	 */
	let isIdle = true

	/** Holds debounce instance - Used for reseting of **isIdle** */
	let debounce

	/**
	 * Main process or logic
	 * @function process
	 * @param {function} func - callback function
	 * @param {number} delay - ms
	 * @param {Object} [options] - optional params for additional configuration
	 * @param {boolean} [options.cancel = false] - cancels current throttle
	 * @param {boolean} [options.init = true] - toggles initial execute
	 * @param {number} [options.idleResetDelay = delay*1.5] - delay between last execution and being considerd _idle_
	 */
	this.process = (func, delay, options = {}) => {
		const {
			cancel = false, 
			init = true, 
			idleResetDelay = delay*1.5,
		} = options

		if(init && debounce === undefined) debounce = (new Debounce()).process

		return new Promise((resolve) => {

			// initial execution
			if(init) {
				if(isIdle) {
					executeFunc()
					console.log('isIdle')
				}

				// resets throttle and **isIdle** opon being idle
				debounce(() => {
					isIdle = true
					resetThrottle()
				}, idleResetDelay)
			}

			// allows param exchange during throttle
			if(cancel) resetThrottle()

			// stops additional func executions during a timeout
			if(timeout) return

			// queues execution of func until after delay
			// additonaly, saves timeout to block additonal calls during timout
			timeout = setTimeout(() => {
				resetThrottle()
				executeFunc()
			}, delay)


			function executeFunc() {
				func()
				isIdle = false
				resolve('executed')
			}

			function resetThrottle() {
				clearTimeout(timeout)
				timeout = undefined
			}
		})
	}
}

module.exports = Throttle