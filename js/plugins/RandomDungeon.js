dng = [
	// flors
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],	
	]
];

console.log(dng);

function ChoosePoint(room, char) {
	y = Math.floor((Math.random() * dng[0].length));
	x = Math.floor((Math.random() * dng[0][y].length));	

	if( dng[0][y][x] == ' ' ) {
		dng[0][y][x] = char;
		
		room.x = x;
		room.y = y;
		room.char = char;

	} else {
		//console.log('chosen the same point');
		return ChoosePoint(room, char);
	}
	
	return room;
}

entry = new Object();
ChoosePoint(entry, 1); // wejscie
//console.log('Entrance: ');
//console.log(entry);

//losowanie miejsca i typu wejscia

exit = new Object();
ChoosePoint(exit, 2); // wyjscie
//console.log('Exit: ');
//console.log(exit);

//console.log(dng);
//console.log(entry);
//console.log(exit);
//console.log(' ')

console.log('trace: ');
function ExitPath(activeSquare) {
	this.next = new Object();
	this.next.x = activeSquare.x;
	this.next.y = activeSquare.y;
	this.next.char = dng[0][this.next.y][this.next.x];	

	if ( Math.round(Math.random()) ) {
		if ( activeSquare.x > exit.x ) {
			this.next.x--;
		} else if ( activeSquare.x < exit.x ) {
			this.next.x++;
		} else if ( activeSquare.x == exit.x ) {
			// none
		}
	} else {
		if ( activeSquare.y > exit.y ) {
			this.next.y--;
		} else if ( activeSquare.y < exit.y ) {
			this.next.y++;
		} else if ( activeSquare.y == exit.y ) {
			// none
		}
	}			

	if ( dng[0][this.next.y][this.next.x] != 1 )
	{
		if( dng[0][this.next.y][this.next.x] != 2 ) {
			
			dng[0][this.next.y][this.next.x] = 3;
			console.log(this.next);
			ExitPath(this.next);
		}
	} else {
		ExitPath(this.next);
	}	
}

for (y = 0; y < dng[0].length; y++) {
	for (x = 0; x < dng[0][y].length; x++) {
		room = dng[0][y][x];
		if ( room == 0 ) {
			if ( ! Math.floor((Math.random() * 3)) ) {
				dng[0][y][x] = 3;
			}
		}
	}
}


ExitPath(entry);

//console.log(dng);
//console.log(entry);
//console.log(exit);

for (y = 0; y < dng[0].length; y++) {
	for (x = 0; x < dng[0][y].length; x++) {
		room = dng[0][y][x];				
		
		if ( room ) {
			type = room*10000
			connections = 0;
			// góra
			if ( y != 0 && dng[0][y-1][x] != 0 ) {
				connections += 8;
			}

			// dół
			if ( y != dng[0].length-1 && dng[0][y+1][x] != 0 ) {
				connections += 4;
			}

			//prawo
			if ( x != 0 && dng[0][y][x-1] != 0 ) {
				connections += 2;
			}

			// lewo
			if ( x != dng[0][y].length-1 && dng[0][y][x+1] != 0 ) {
				connections += 1;
			}
			
			if ( connections ) {
				dng[0][y][x] = type + connections*100 + 1;
			} else {
				dng[0][y][x] = 0;
			}
		}	
		
	}
}

console.log(dng);