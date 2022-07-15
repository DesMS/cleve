class Vec4 {
	#x = 0;
	#y = 0;
	#z = 0;
	#w = 0;
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
	set z(z = 0) {
		z = parseFloat(z);
		if (isNaN(z)) {
			console.warn(`X is not a <valid> number`);
			return;
		}
		this.#z = z;
		return;
	};
	set w(w = 0) {
		w = parseFloat(w);
		if (isNaN(w)) {
			console.warn(`W is not a <valid> number`);
			return;
		}
		this.#w = w;
		return;
	};
	set pos(pos = [
		0,
		0,
		0,
		0
	]) {
		x = parseFloat(x);
		y = parseFloat(y);
		z = parseFloat(z);
		w = parseFloat(w);
		if (isNaN(x)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			x = 0;
		}
		if (isNaN(y)) {
			console.warn(`Y is not a <valid> number, setting to default.`);
			y = 0;
		}
		if (isNaN(z)) {
			console.warn(`Z is not a <valid> number, setting to default.`);
			z = 0;
		}
		if (isNaN(w)) {
			console.warn(`Z is not a <valid> number, setting to default.`);
			w = 0;
		}
		this.#x = x;
		this.#y = y;
		this.#z = z;
		this.#w = w;
		return;
	};
	get x(){return this.#x;};
	get y(){return this.#y;};
	get z(){return this.#z;};
	get w(){return this.#w;};
	get pos(){return [this.#x,this.#y,this.#z,this.#w];};
	translate(x = 0, y = 0, z = 0, w = 0) {
		var ex;
		var ey;
		var ez;
		var ew;
		if (typeof x == `object`) {
			ex = parseFloat(x[0]);
			ey = parseFloat(x[1]);
			ez = parseFloat(x[2]);
			ew = parseFloat(x[3]);
		} else {
			ex = parseFloat(x);
			ey = parseFloat(y);
			ez = parseFloat(z);
			ew = parseFloat(w);
		}
		if (isNaN(ex)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			ex = 0;
		}
		if (isNaN(ey)) {
			console.warn(`Y is not a <valid> number, setting to default.`);
			ey = 0;
		}
		if (isNaN(ez)) {
			console.warn(`Z is not a <valid> number, setting to default.`);
			ez = 0;
		}
		if (isNaN(ew)) {
			console.warn(`W is not a <valid> number, setting to default.`);
			ew = 0;
		}
		this.#x += ex;
		this.#y += ey;
		this.#z += ez;
		this.#w += ew;
		return;
	}
	add(vec = new Vec4(0, 0, 0, 0)) {
		this.#x += vec.x;
		this.#y += vec.y;
		this.#z += vec.z;
		this.#w += vec.w;
		return;
	}
	constructor(x = 0, y = 0, z = 0, w = 0) {
		var ex = 0;
		var ey = 0;
		var ez = 0;
		var ew = 0;
		if (typeof x == `object`) {
			ex = parseFloat(x[0]);
			ey = parseFloat(x[1]);
			ez = parseFloat(x[2]);
			ew = parseFloat(x[3]);
		} else {
			ex = parseFloat(x);
			ey = parseFloat(y);
			ez = parseFloat(z);
			ew = parseFloat(w);
		}
		if (isNaN(ex)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			ex = 0;
		}
		if (isNaN(ey)) {
			console.warn(`Y is not a <valid> number, setting to default.`);
			ey = 0;
		}
		if (isNaN(ez)) {
			console.warn(`Z is not a <valid> number, setting to default.`);
			ez = 0;
		}
		if (isNaN(ew)) {
			console.warn(`W is not a <valid> number, setting to default.`);
			ew = 0;
		}
		this.#x = ex;
		this.#y = ey;
		this.#z = ez;
		this.#w = ew;
		return;
	}
}