class Vec2 {
	#x = 0;
	#y = 0;
	set x(x = 0) {
		x = parseFloat(x);
		if (isNaN(x)) {
			console.warn(`X is not a <valid> number`);
			return;
		}
		this.#x = x;
		return;
	};
	set y(y = 0) {
		y = parseFloat(y);
		if (isNaN(y)) {
			console.warn(`X is not a <valid> number`);
			return;
		}
		this.#y = y;
		return;
	};
	set pos(pos = [
		0,
		0
	]) {
		x = parseFloat(x);
		y = parseFloat(y);
		if (isNaN(x)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			x = 0;
		}
		if (isNaN(y)) {
			console.warn(`Y is not a <valid> number, setting to default.`);
			y = 0;
		}
		this.#x = x;
		this.#y = y;
		return;
	};
	get x(){return this.#x;};
	get y(){return this.#y;};
	get pos(){return [this.#x,this.#y];};
	translate(x = 0, y = 0) {
		var ex;
		var ey;
		if (typeof x == `object`) {
			ex = parseFloat(x[0]);
			ey = parseFloat(x[1]);
		} else {
			ex = parseFloat(x);
			ey = parseFloat(y);
		}
		if (isNaN(ex)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			ex = 0;
		}
		if (isNaN(ey)) {
			console.warn(`Y is not a <valid> number, setting to default.`);
			ey = 0;
		}
		this.#x += ex;
		this.#y += ey;
		return;
	}
	add(vec = new Vec2(0, 0)) {
		this.#x += vec.x;
		this.#y += vec.y;
		return;
	}
	constructor(x = 0, y = 0) {
		var ex = 0;
		var ey = 0;
		if (typeof x == `object`) {
			ex = parseFloat(x[0]);
			ey = parseFloat(x[1]);
		} else {
			ex = parseFloat(x);
			ey = parseFloat(y);
		}
		if (isNaN(ex)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			ex = 0;
		}
		if (isNaN(ey)) {
			console.warn(`Y is not a <valid> number, setting to default.`);
			ey = 0;
		}
		this.#x = ex;
		this.#y = ey;
		return;
	}
}