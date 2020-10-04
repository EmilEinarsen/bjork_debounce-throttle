
/**
 * Delay execution of function until _idle_ for duration of set delay
 * @function Debounce
 * @method process - Main process or logic
 */
function Debounce() {
	/**
	 * Tracks timeout
	 * @property {number} timeout
	 */
	let timeout

	/**
	 * Main process or logic
	 * @param {function} process - callback function
	 * @param {number} delay - ms
	 * @param {boolean} cancel - cancels execution of debouncing function
	 * @returns {Promise} - resolve on execution and cancelation, with a corresponding message
	 */
	this.process = (func, delay, cancel) => {
		return new Promise((resolve, reject) => {

			// clears queued execution
			clearTimeout(timeout)

			// results in no execution
			if(cancel) resolve('function canceled')

			// queues execution of func until after delay
			timeout = setTimeout(() => {
				func()
				resolve('function executed')
			}, delay )
		})
	}
}

module.exports = Debounce