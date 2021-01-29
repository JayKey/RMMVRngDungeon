const Game_Actor_setup = Game_Actor.prototype.setup;

Game_Actor.prototype.setup = function (actorId) {
	// Call the original function
	Game_Actor_setup.call(this, actorId);
	this.race = $dataActors[actorId].meta.race || null;
};

Window_Status.prototype.drawActorNickname = function (actor, x, y, width=270) {
	this.resetTextColor();
	if (actor.race) {
		this.drawText(actor.race, x, y, width);
	}
};
