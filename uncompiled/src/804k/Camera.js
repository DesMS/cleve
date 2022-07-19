class Camera extends Mat4 {
	#x = 0.0;
	#y = 1.0;
	#z = 0.0;
	#cx = 0.0;
	#cy = 0.0;
	#cz = 0.0;
	#pcx = 0.0;
	#pcy = 0.0;
	#pcz = 0.0;
	#fov = 70.0;
	#near = 0.0;
	#far = 100.0;
	#vx = 0.0;
	#vy = 0.0;
	#vz = 0.0;
	get cx() {
		return this.#cx;
	}
	get cy() {
		return this.#cy;
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get z() {
		return this.#z;
	}
	setCamVariables(x, y, z, cx, cy, cz, pcx, pcy, pcz, fov, near, far) {
		this.#x = x;
		this.#y = y;
		this.#z = z;
		this.#cx = cx;
		this.#cy = cy;
		this.#cy = cz;
		this.#pcx = pcx;
		this.#pcy = pcy;
		this.#pcz = pcz;
		this.#fov = fov;
		this.#near = near;
		this.#far = far;
		return;
	}
	camRotateX(deg) {
		this.#cx += deg;
		if (this.#cx < -90) {
			this.#cx = -90;
		} else if (this.#cx > 90) {
			this.#cx = 90;
		}
	}
	camRotateY(deg) {
		this.#cy += deg;
	}
	camRotateZ(deg) {
		this.#cz += deg;
	}
	camResetX(deg) {
		this.#pcx = this.#cx;
		this.#cx = deg;
	}
	camResetY(deg) {
		this.#pcy = this.#cy;
		this.#cy = deg;
	}
	camResetZ(deg) {
		this.#pcz = this.#cz;
		this.#cz = deg;
	}
	camSaveX() {
		this.#pcx = this.#cx;
	}
	camSaveY() {
		this.#pcy = this.#cy;
	}
	camSaveZ() {
		this.#pcz = this.#cz;
	}
	camRestoreX() {
		this.#cx = this.#pcx;
	}
	camRestoreY() {
		this.#cy = this.#pcy;
	}
	camRestoreZ() {
		this.#cz = this.#pcz;
	}
	camTranslate(pos = new Vec3(0, 0, 0)) {
		this.#x += pos.x;
		this.#y += pos.y;
		this.#z += pos.z;
	}
	camCopy() {
		var cam = new Camera();
		cam.setMatrix(this.Matrix.slice());
		cam.setCamVariables(this.#x, this.#y, this.#z, this.#cx, this.#cy, this.#cz, this.#pcx, this.#pcy, this.#pcz, this.#fov, this.#near, this.#far);
		return cam;
	}
	get camMatrix() {
		this.calculate();
		return this.Matrix;
	}
	camReset() {
		var f = 1.0 / Math.tan(this.#fov / 2.0);
		var nf = 1.0 / (this.#near - this.#far);
		this.setMatrix([
			f / (Minecraft.width / Minecraft.height), 0.0, 0.0, 0.0,
			0.0, f, 0.0, 0.0,
			0.0, 0.0, (this.#far - this.#near) * nf, -1.0,
			0.0, 0.0, (this.#far + this.#near) * nf, 0.0
		]);
		return;
	}
	calculate() {
		this.update();
		var isat = Chunk.blockAt(new Vec3(Math.round(-(this.#x / 2)), Math.round((this.#y / 2) - 1), Math.round(-(this.#z / 2))));
		if (isat) {
			this.#vy = 0.0;
		} else {
			this.#vy -= 0.005;
		}
		return;
	}
	update() {
		this.camReset();
		this.#x += this.#vx;
		this.#y += this.#vy;
		this.#z += this.#vz;
		this.rotateX(this.#cx);
		this.rotateY(this.#cy);
		this.rotateZ(this.#cz);
		this.translate(new Vec3(this.#x, -(this.#y + 2.72), this.#z));
		return;
	}
	updatePosRot(pos = new Vec3(0, 0, 0), rot = new Vec3(0, 0, 0)) {
		this.camReset();
		this.rotateX(rot.x);
		this.rotateY(rot.y);
		this.rotateZ(rot.z);
		this.translate(pos);
		return;
	}
	constructor(pos = undefined, fov = 70.0, near = 0.0, far = 100.0) {
		super();
		fov = parseFloat(fov);
		near = parseFloat(near);
		far = parseFloat(far);
		if (isNaN(fov)) {
			console.warn(`Fov is NOT valid, setting to default.`);
			fov = 70.0;
		}
		if (isNaN(near)) {
			console.warn(`Near is NOT valid, setting to default.`);
			near = 0.0;
		}
		if (isNaN(far)) {
			console.warn(`Far is NOT valid, setting to default.`);
			far = 100.0;
		}
		if (pos instanceof Vec3) {
			this.#x = pos.x;
			this.#y = pos.y;
			this.#z = pos.z;
		}
		this.#far = far;
		this.#near = near;
		this.#fov = fov * (Math.PI / 180);
		this.camReset();
		return;
	}
}