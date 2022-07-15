class Minecraft {
	static vs = [
`attribute vec3 position;`,
`attribute vec2 texcoord;`,
`uniform mat4 model;`,
`varying highp vec2 vtexcoord;`,
`void main() {`,
	`gl_Position = model * vec4(position, 1.0);`,
	`vtexcoord = texcoord;`,
`}`
	].join(`\n`);
	static fs = [
`precision highp float;`,
`varying highp vec2 vtexcoord;`,
`uniform sampler2D sampler;`,
`void main(void) {`,
	`gl_FragColor = texture2D(sampler, vtexcoord);`,
`}`
	].join(`\n`);

	static vertexShader;
	static fragmentShader;

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
		antialias: false,
		depth: true,
		alpha: true,
		premultipliedAlpha: true
	};

	static ram = 1024;
	static cores = 1;

	static #testcube;
	static #textures;

	static #deltaTime = 0;

	static #sensitivity = 100;
	static #chunks = [];

	static #renderdistance = 2;

	static #seed = 0;

	static running = false;
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
					this.camera = new Camera(new Vec3(0, 0, -2.3), 70.0, 0.0, 100.0);
					this.#chunks = Chunk.calculate(this.#renderdistance, `generate`);
					var k = false;
					Key.init();
					// this.camera.camRotateY(90);
					var delaymove = false;
					Mouse.move((e) => {
						if (delaymove == false) {
							var movey = e.movementX * (this.#sensitivity / 100);
							var movex = e.movementY * (this.#sensitivity / 100);
							this.camera.camRotateX(movex);
							this.camera.camRotateY(movey);
						}
					});
					Mouse.click((e) => {
						document.body.requestPointerLock();
					});
					Key.addKey(87, () => {
						delaymove = true;
						this.camera.camResetX(0);
						this.camera.camTranslate(new Vec3(this.camera.camMatrix[8] * this.#deltaTime * parseFloat(`5`) * -1, 0, this.camera.camMatrix[10] * this.#deltaTime * parseFloat(`5`) * -1));
						this.camera.camRestoreX();
						delaymove = false;
					});
					Key.addKey(65, () => {
						delaymove = true;
						this.camera.camSaveY();
						this.camera.camRotateY(90);
						this.camera.camTranslate(new Vec3(this.camera.camMatrix[8] * this.#deltaTime * parseFloat(`5`), 0, this.camera.camMatrix[10] * this.#deltaTime * parseFloat(`5`)));
						this.camera.camRestoreY();
						delaymove = false;
					});
					Key.addKey(83, () => {
						delaymove = true;
						this.camera.camResetX(0);
						this.camera.camTranslate(new Vec3(this.camera.camMatrix[8] * this.#deltaTime * parseFloat(`5`), 0, this.camera.camMatrix[10] * this.#deltaTime * parseFloat(`5`)));
						this.camera.camRestoreX();
						delaymove = false;
					});
					Key.addKey(68, () => {
						delaymove = true;
						this.camera.camSaveY();
						this.camera.camRotateY(90);
						this.camera.camTranslate(new Vec3(this.camera.camMatrix[8] * this.#deltaTime * parseFloat(`5`) * -1, 0, this.camera.camMatrix[10] * this.#deltaTime * parseFloat(`5`) * -1));
						this.camera.camRestoreY();
						delaymove = false;
					});
					// this.#testcube = new Cube(new Vec3(0, 0, 0));
					// this.#testcube.texture = BlockStone.texture;
					var timer;
					window.addEventListener(`resize`, (e) => {
						if (timer) clearTimeout(timer);
						timer = setTimeout(() => {
							GL.reload();
							GL2D.reload();
						}, 100, e);
					});
					setTimeout(cb);
					return;
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
	static #lastinfo = [
		new Vec3(0, 0, 0),
		0,
		0,
		[]
	]
	static loop() {
		if (this.running == false) {
			return;
		}
		requestAnimationFrame(this.loop.bind(this));
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
		this.camera.calculate();
		GL.frame();
		GL2D.frame();
		// GL.add(this.#testcube);
		if ([
			this.camera.pos,
			this.camera.cx,
			this.camera.cy,
			this.#chunks
		] != this.#lastinfo) {
			this.#chunks = Chunk.calculate(this.#renderdistance, `update`, this.#chunks);
			GL.addChunks(this.#chunks);
			this.#lastinfo = [
				this.camera.pos,
				this.camera.cx,
				this.camera.cy,
				this.#chunks
			];
		} else {
			GL.reuse();
		}
		FontRenderer.drawString(`FPS: ${this.fps}`, 10, new Vec2(0, 0), new Vec3(255, 255, 255));
		return;
	}
}