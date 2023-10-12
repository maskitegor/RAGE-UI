function trigger(eventName, args) {
	try {
		var handlers = window.EventManager.events[eventName];
		handlers.forEach(handler => handler(JSON.parse(args)));
	} catch (e) {
		console.log(e, 'error message')
	}
}
