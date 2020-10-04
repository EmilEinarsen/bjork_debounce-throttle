const Debounce = require('./Debounce')

/**
 * Restrain execution of given function to every set iteration
 * @function Iteration
 * @method process - Main process or logic
 */
function Iteration() {

	/**
	 * Tracks iterations
	 * @property {number} iteration
	 */
	let iteration

	/**
	 * Has iteration been idle?
	 * @property {boolean} idle = true
	 */
	let isIdle = true
	
	/** Holds debounce instance - Used for reseting of **isIdle** */
	let debounce

	/**
	 * Main process or logic
	 * @function process
	 * @param {function} func - callback function
	 * @param {number} delay - execute every **delay**:nth iteration
	 * @param {Object} [options] - optional params for additional configuration
	 * @param {boolean} [options.cancel = false] - cancels and resets iteration
	 * @param {boolean} [options.init = true] - toggles initial execute
	 * @param {number} [options.startFrom = 0] - configuring of initial starting iteration
	 * @param {number} [options.idleResetDelay = delay*1.5] - delay between last execution and being considerd _idle_
	 */
	this.process = (func, delay, options = {}) => {
		const {
			cancel = false,
			init = true,
			startFrom = 0,
			idleResetDelay = 500,
		} = options
		
		// allows configuring of initial starting iteration (default 0)
		if(iteration === undefined) iteration = startFrom

		return new Promise(resolve => {
			iteration++
			
			// cancels and resets iteration
			if(cancel) {
				cancelIteration()
				return
			}

			// initial execution
			if(init) {
				if(isIdle) executeFunc()
				
				// cancels iteration opon being idle
				if(debounce === undefined) debounce = (new Debounce()).process
				debounce(() => cancelIteration(), idleResetDelay)
			}

			// resets counter **iteration** opon execution
			if(iteration === delay) {
				iteration = 0
				executeFunc()
			}

			function executeFunc() {
				func()
				isIdle = false
				resolve('function executed')
			}

			function cancelIteration() {
				isIdle = true
				debounce = iteration = undefined
			}
		})
	}
}

module.exports = Iteration