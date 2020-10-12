index = 0
const delay = () => new Promise(resolve => {
	setTimeout(()=> {
		resolve()
		console.log(index++)
	}, Math.floor(Math.random()*1000))
})


/* let standBy = new StandBy()

setInterval(() => {
	standBy(delay)
}, 100) */

StandBy(delay)


function StandBy(func) {
	let gen

	if(func) (async () => {for await (let response of block(func)) ''})()

	else return func => {
		if(!gen) gen = block(func)
		return gen.next().value
	}

	function* block(func) {
		while(true) {
			yield new Promise(async resolve => {
				await func()
				resolve('executed')
			})
		}
	}
}
