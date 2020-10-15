/**
 * 
 * @function ThrottleAwait 
 * ThrottleAwait delays execution of a promise-based function, to it's internal runtime
 * Inessence, throttleing based on awaiting pending.
 * Can either be used as a throttle by making an instance or as an inifinte function by not.
 */

function ThrottleAwait(func) {
	/**
	 * Before creating an instance, starts the secondary process if _func_ was provided
	 */
	if(func) secondaryProcess(makeFuncPromiseBased(func))

	/**
	 * Holds an instant of the generator
	 */
	let gen

	/**
	 * Used to throttle additional executions if promise is pending
	 */
	let idle = true

	/**
	 * Opon creating an instance without providing  _func_
	 * returns the methid _process_
	 */
	if(!func) return process

	/**
	 * @function process
	 * Takes a promise based function and restricts execution based of await
	 */
	function process(func) {
		if(!idle) return
		if(!gen) gen = block(makeFuncPromiseBased(func))
		idle = false
		return gen.next().value
	}

	/**
	 * Starts a recursive function that uses await to restrict execution
	 */
	async function secondaryProcess(func) {
		for await (let response of block(func)) ''
	}
	
	/**
	 * async generator, holds an infinite loop that awaits param _func_ before yielding
	 * @generator
	 * @param {function} func
	 */
	async function* block(func) {
		while(true) {
			await func()
			idle = true
			yield
		}
	}
}

module.exports = ThrottleAwait