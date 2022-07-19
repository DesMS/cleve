class Storage {
	static cleve;
	static load() {
		try {
			this.cleve = JSON.parse(window.atob(window.localStorage.getItem(`cleve_save`)));
			if (this.cleve == null || this.cleve == undefined) {
				window.localStorage.setItem(`cleve_save`, window.btoa(`{}`));
				this.cleve = {};
			}
		} catch (err) {
			window.localStorage.setItem(`cleve_save`, window.btoa(`{}`));
			this.cleve = {};
		}
		var antialias = true;
		if (this.cleve[`antialias`] == undefined || this.cleve[`antialias`] == null) {
			this.cleve[`antialias`] = true;
			antialias = true;
			this.save();
		} else {
			antialias = this.cleve[`antialias`];
		}
		var scale = 2;
		if (this.cleve[`scale`] == undefined || this.cleve[`scale`] == null) {
			this.cleve[`scale`] = 2;
			scale = 2;
			this.save();
		} else {
			scale = this.cleve[`scale`];
		}
		Minecraft.webgloptions[`antialias`] = antialias;
		FontRenderer.fontHeight = 9 * scale;
	}
	static save() {
		window.localStorage.setItem(`cleve_save`, window.btoa(JSON.stringify(this.cleve)));
		return;
	}
}