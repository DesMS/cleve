class Mouse {
	static click(callback) {
		if (typeof callback != `function`) {
			console.warn(`Callback must be a function.`);
			return;
		}
		var timer = undefined;
		document.addEventListener(`mousedown`, () => {
			if (timer == undefined) {
				timer = setInterval(callback, 1);
			}
		});
		document.addEventListener(`mouseup`, () => {
			if (timer != undefined) {
				clearInterval(timer);
				timer = undefined;
			}
		});
	}
	static move(callback) {
		if (typeof callback != `function`) {
			console.warn(`Callback must be a function.`);
			return;
		}
		document.addEventListener(`mousemove`, callback);
		return;
	}
}