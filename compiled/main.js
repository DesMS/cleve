var main = () => {};
(() => {
	main = () => {
		Minecraft.init(() => {
			Minecraft.loop();
		});
	}
})();