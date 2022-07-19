class Minecraft {
	static canvas;
	static gl;

	static canvas2D;
	static gl2D;

	static program;

	static camera = Camera;

	static width = 1920;
	static height = 1080;

	static webgloptions = {
		powerPreference: `high-performance`,
		antialias: true,
		depth: true,
		alpha: true,
		premultipliedAlpha: true,
		desynchronized: false,
		preserveDrawingBuffer: true,
		xrCompatible: false,
		stencil: true
	};

	static ram = 1024;
	static cores = 1;
	static #deltaTime = 0;
	static #sensitivity = 100;
	static #renderdistance = 2;
	static seed = 0;
	static running = false;
	static splashText = `Cleve is now online!`;

	static init(cb = () => {}) {
		if (this.running == false) {
			this.ram = navigator.deviceMemory == undefined ? 1024 : Math.round(parseInt(navigator.deviceMemory) * 1024); // Used in F3 Screen
			this.cores = navigator.hardwareConcurrency == undefined ? 1 : parseInt(navigator.hardwareConcurrency);
			this.running = true;
			Storage.load();
			GL.init();
			GL2D.init();
			if (this.running == true) {
				Texture.init(() => {
					Translation.initLang(`en_us`, () => {
						Mouse.init();
						Chunk.calculate(this.#renderdistance);
						this.camera = new Camera(new Vec3(0, 3.0, 0.0), 70.0, 0.0, 100.0);
						var k = false;
						Key.init();
						var delaymove = false;
						var shift = false;
						var walks = parseFloat(`4.317`);
						Mouse.move(e => {
							if (delaymove == false) {
								var movey = e.movementX * (this.#sensitivity / 100);
								var movex = e.movementY * (this.#sensitivity / 100);
								this.camera.camRotateX(movex);
								this.camera.camRotateY(movey);
							}
						});
						Mouse.click(e => {
							if (this.renderid == InGame.id) {
								document.body.requestPointerLock();
							}
						});
						Key.addKey(87, () => {
							delaymove = true;
							this.camera.camResetX(0);
							this.camera.camTranslate(new Vec3(this.camera.camMatrix[8] * this.#deltaTime * (walks * (shift ? 1.3 : 1)) * -1, 0, this.camera.camMatrix[11] * this.#deltaTime * (walks * (shift ? 1.3 : 1)) * -1));
							this.camera.camRestoreX();
							delaymove = false;
						});
						Key.addKey(65, () => {
							delaymove = true;
							this.camera.camSaveY();
							this.camera.camRotateY(90);
							this.camera.camTranslate(new Vec3(this.camera.camMatrix[8] * this.#deltaTime * (walks * (shift ? 1.3 : 1)), 0, this.camera.camMatrix[11] * this.#deltaTime * (walks * (shift ? 1.3 : 1))));
							this.camera.camRestoreY();
							delaymove = false;
						});
						Key.addKey(83, () => {
							delaymove = true;
							this.camera.camResetX(0);
							this.camera.camTranslate(new Vec3(this.camera.camMatrix[8] * this.#deltaTime * (walks * (shift ? 1.3 : 1)), 0, this.camera.camMatrix[11] * this.#deltaTime * (walks * (shift ? 1.3 : 1))));
							this.camera.camRestoreX();
							delaymove = false;
						});
						Key.addKey(68, () => {
							delaymove = true;
							this.camera.camSaveY();
							this.camera.camRotateY(90);
							this.camera.camTranslate(new Vec3(this.camera.camMatrix[8] * this.#deltaTime * (walks * (shift ? 1.3 : 1)) * -1, 0, this.camera.camMatrix[11] * this.#deltaTime * (walks * (shift ? 1.3 : 1)) * -1));
							this.camera.camRestoreY();
							delaymove = false;
						});
						var time;
						Key.addKey(16, () => {
							shift = true;
							clearTimeout(time);
							time = setTimeout(() => {
								shift = false;
							});
						});
						var timer;
						window.addEventListener(`resize`, (e) => {
							if (timer) clearTimeout(timer);
							timer = setTimeout(() => {
								GL.reload();
								GL2D.reload();
							}, 10, e);
						});
						MainMenu.init();
						MainOptionsMenu.init();
						setTimeout(cb);
						return;
					});
				});
				return;
			} else {
				setTimeout(cb);
				return;
			}
		} else {
			console.warn(`Already init.`);
			setTimeout(cb);
			return;
		}
	}
	static fps = 60;
	static #then = Date.now();
	static #lasttime = Date.now();
	static #updates = 0;
	static renderid = MainMenu;
	static loop() {
		if (this.running == false) {
			return;
		} else {
			requestAnimationFrame(this.loop.bind(this));
		}
		if (Date.now() - this.#lasttime > 1000) {
			this.#lasttime = Date.now();
			this.fps = this.#updates;
			this.#updates = 0;
		} else {
			this.#updates += 1;
		}
		var now = Date.now() * 0.001;
		this.#deltaTime = now - this.#then;
		this.#then = now;
		GL.frame();
		GL2D.frame();
		this.renderid.frame();
		return;
	}
}