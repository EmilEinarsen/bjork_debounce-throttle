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


StandBy(() => console.log((await fetch("https://wordpress.jakthalland.se/wp-json/wp/v2/events")).json()))