class GL2D {
	static #loaded = false;

	static #load = () => {
		Minecraft.width = document.documentElement.clientWidth;
		Minecraft.height = document.documentElement.clientHeight;
		Minecraft.canvas2D = document.createElement(`canvas`);
		Minecraft.canvas2D.id = `root2D`;
		Minecraft.canvas2D.width = Minecraft.width;
		Minecraft.canvas2D.height = Minecraft.height;
		Minecraft.canvas2D.style.width = Minecraft.width;
		Minecraft.canvas2D.style.height = Minecraft.height;
		document.body.appendChild(Minecraft.canvas2D);
		Minecraft.canvas2D = document.getElementById(`root2D`);
		Minecraft.gl2D = Minecraft.canvas2D.getContext(`2d`, Minecraft.webgloptions);
		if (Minecraft.gl2D == null || Minecraft.gl2D == undefined || !Minecraft.gl2D) {
			var msg = `GL2D is not supported, exiting`;
			alert(msg);
			console.error(msg)
			Minecraft.running = false;
			return;
		}
		return;
	}
	static init() {
		if (this.#loaded == false) {
			this.#loaded = true;
			this.#load();
			return;
		} else {
			console.warn(`Already init`);
			return;
		}
	}
	static reload() {
		if (this.#loaded == true) {
			if (Minecraft.canvas2D.remove) {
				Minecraft.canvas2D.remove();
			}
			Minecraft.canvas2D = undefined;
			Minecraft.gl2D = undefined;
			this.#load();
			return;
		} else {
			console.warn(`Not loaded, unable to reload.`);
			return;
		}
	}
	static frame() {
		Minecraft.gl2D.clearRect(0, 0, Minecraft.width, Minecraft.height);
		return;
	}
}