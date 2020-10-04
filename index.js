const Debounce = require('./modules/Debounce')
const Throttle = require('./modules/Throttle')
const Iteration = require('./modules/Iteration')

/**
 * @type {function}
 * @instance Contains methods for restrict rapid function execution
 * @example 
 * const { debounce, throttle, Iteration } = new Restrain()
 * debounce(func, delay, cancel)
 * throttle(func, delay, options)
 * Iteration(func, delay, options)
 */
const restrain = {

	debounce: (new Debounce()).process,
	throttle: (new Throttle()).process,
	iteration: (new Iteration()).process,

}

module.exports = restrain