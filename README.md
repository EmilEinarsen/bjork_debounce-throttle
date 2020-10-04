# What is this?

A object [restrain](https://github.com/EmilEinarsen/bjork_restrain/blob/3c088b1caeabb2b16a86a689973d350c19cc3ede/index.js#L14) containing three restrictive Promise-based functions: [debounce](https://github.com/EmilEinarsen/bjork_restrain/blob/3c088b1caeabb2b16a86a689973d350c19cc3ede/modules/Debounce.js#L7), [throttle](https://github.com/EmilEinarsen/bjork_restrain/blob/3c088b1caeabb2b16a86a689973d350c19cc3ede/modules/Throttle.js#L8) and [iteration](https://github.com/EmilEinarsen/bjork_restrain/blob/3c088b1caeabb2b16a86a689973d350c19cc3ede/modules/Iteration.js#L8). Debounce and Throttle utilize [__setTimeout__](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) and [__clearTimeout__](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout) too restrict rapid function execution.


## Install
Use npm to install restrain.

```bash
> npm i bjork_restrain
```


## Usage
In essence, throttle creates ripples of function executions, contrasting debounce which cancels them until left idle.
Additionally, Iteration count and executes on every given number.
```js
import restrain from 'bjork_restrain'
const { debounce, throttle, iteration } = restrain

debounce(func, delay, cancel)
throttle(func, delay, options?)
iteration(func, delay, options?)
```
<br>

### Debounce
Delay execution of __func__ [function] until _idle_ for the duration of __delay__ [number] (ms).

>**Cancel** <br>
In addition to __func__ and __delay__ a third param, __cancel__ [boolean], can be passed. Resulting in the debouncing function __func__ never being executed.

>**Promise** <br>
After a successful execution or cancelation, debounce resolves with a corresponding message.<br>

#### Test
The testEnvironment simulates a static spamming situation. Here is the test [intact](https://github.com/EmilEinarsen/bjork_restrain/blob/3c088b1caeabb2b16a86a689973d350c19cc3ede/test/Debounce.test.js#L3).
```js
// In testEnvironment: debounce(() => arr.push('execution'), 15)
test('unconfigured', async() => {
	expect(
		await testEnvironment()
	).toBe(
		'1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 execution'
	)
})
```


### Throttle
Restrain execution of __func__ [function] to one every __delay__ [number] (ms).

>**Promise**<br>
After successfully executing __func__, throttle resolves with a message.<br>

> **Options**<br>
> In addition to __func__ and __delay__ a third param, __options__ [object], can be passed. <br><br>
	options?: { cancel?: boolean; init?: boolean; idleResetDelay?: number; }<br>
> * cancel [boolean]: <br>
Cancels current timeout, allowing param exchange of throttle.
> * init [boolean]: <br>
Toggles initial execution (@default true).
> * idleResetDelay [number] (ms): <br>
Configure delay of state reset to idle (@defualt **delay***1.5)

#### Test
The testEnvironment simulates a static spamming situation. Here is the test [intact](https://github.com/EmilEinarsen/bjork_restrain/blob/3c088b1caeabb2b16a86a689973d350c19cc3ede/test/Throttle.test.js#L3).
```js
test('unconfigured', async() => {
	expect(
		await testEnvironment()
	).toBe(
		'1 execution 2 3 4 5 6 7 8 9 10 11 12 13 14 execution 15 16 17 18 19 20 21 22 23 24 25 26 27 28 execution 29 30'
	)
})
```


### Iteration
Restrain execution of __func__ [function] to every __delay__:nth [number] iteration.

>**Promise**<br>
After successfully executing __func__, iteration resolves with a message.<br>

> **Options**<br>
> In addition to __func__ and __delay__ a third param, __options__ [object], can be passed. <br><br>
	options?: { cancel?: boolean; init?: boolean; startFrom?: number; idleResetDelay?: number; }<br>
> * cancel [boolean]: <br>
Cancels current iteration count, effectivly reseting iteration.
> * init [boolean]: <br>
Toggles initial execution (@default true).
> * startFrom [number]: <br>
Configure initial starting iteration (@defualt 0)
> * idleResetDelay [number] (ms): <br>
Configure delay of state reset to idle (@defualt 500ms)

#### Test
The testEnvironment simulates a static spamming situation. Here is the test [intact](https://github.com/EmilEinarsen/bjork_restrain/blob/3c088b1caeabb2b16a86a689973d350c19cc3ede/test/Iteration.test.js#L3).
```js
test('unconfigured', async() => {
	expect(
		await testEnvironment()
	).toBe(
		'1 execution 2 3 4 5 execution 6 7 8 9 10 execution 11 12 13 14 15 execution 16 17 18 19 20 execution'
	)
})
```

## Contribution
Pull requests are welcome. For any considerable changes, please open an issue first to discuss what you would like to change.<br>
<br>
Please make sure to update the tests as appropriate.

## Licence
[MIT](https://github.com/EmilEinarsen/bjork_restrain/blob/master/LICENSE)
