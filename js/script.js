var BODYSHOT_XP = 50;
var HEADSHOT_XP = 75;
var KNIFE_XP = 100;

var player;

var songs;

$(function () {
	player = $('#player');

	songs = [
		new Song(1, 'Elena Siegman', 'Dead Again'),
		new Song(2, 'Elena Siegman', '115'),
		new Song(3, 'Elena Siegman', 'Beauty of Annihilation')
	];

	$('#form').on('submit', calculate);
});

function calculate() {
	var playerCount = $('#number-players').val();
	var round = $('#round').val();

	if (isNaN(playerCount) || isNaN(round)) {
		return false;
	}

	var zombiesThisRound = getZombieCount(playerCount, round);
	var totalZombies = getTotalZombies(playerCount, round);
	var zombieHealth = getZombieHealth(round);

	var roundXP = getXPForRound(round);

	var bodyshotXP = BODYSHOT_XP * zombiesThisRound;
	var totalRoundBodyshotXP = bodyshotXP + roundXP;

	var headshotXP = HEADSHOT_XP * zombiesThisRound;
	var totalRoundHeadshotXP = headshotXP + roundXP;

	var knifeXP = KNIFE_XP * zombiesThisRound;
	var totalRoundKnifeXP = knifeXP + roundXP;

	var totalRoundXP = getTotalRoundXP(round);
	var totalBodyshotXP = BODYSHOT_XP * totalZombies + totalRoundXP;
	var totalHeadshotXP = HEADSHOT_XP * totalZombies + totalRoundXP;
	var totalKnifeXP = KNIFE_XP * totalZombies + totalRoundXP;

	//Set all of the html
	$('#zombies-this-round').text(zombiesThisRound);
	$('#zombie-health').text(zombieHealth);
	$('#total-zombies').text(totalZombies);

	$('.round-xp').text(roundXP);

	$('#round-xp-body-shots').text(bodyshotXP);
	$('#total-round-xp-body-shots').text(totalRoundBodyshotXP);

	$('#round-xp-head-shots').text(headshotXP);
	$('#total-round-xp-head-shots').text(totalRoundHeadshotXP);

	$('#round-xp-knives').text(knifeXP);
	$('#total-round-xp-knives').text(totalRoundKnifeXP)

	$('#total-xp-body-shots').text(totalBodyshotXP);
	$('#total-xp-head-shots').text(totalHeadshotXP);
	$('#total-xp-knives').text(totalKnifeXP);

	$('#results').css('display', 'block');

	return false;
}

function getXPForRound(round) {
	var xp = 50 * round;
	if (xp > 1000) {
		xp = 1000;
	}
	return xp;
}

function getTotalRoundXP(round) {
	var totalXP = 0;
	for (var i1 = 1; i1 <= round; i1++) {
		totalXP += getXPForRound(i1);
	}
	return totalXP;
}

//Zombulator functions

function getZombieCount(players, round) {
	var zombies = 0;
    if (players == 1) {
        if (round < 20) {
            var lowrounds = [6, 8, 13, 18, 24, 27, 28, 28, 29, 33, 34, 36, 39, 41, 44, 47, 50, 53, 56];
            zombies = lowrounds[round - 1];
        } else {
            zombies = Math.round((0.09 * round * round - 0.0029 * round + 23.958));
        }
    } else if (players == 2) {
        if (round < 20) {
            var lowrounds = [7, 9, 15, 21, 27, 31, 32, 33, 34, 42, 45, 49, 54, 59, 64, 70, 76, 82, 89];
            zombies = lowrounds[round - 1];
        } else {
            zombies = Math.round((0.1882 * round * round - 0.4313 * round + 29.212));
        }
    } else if (players == 3) {
        if (round < 20) {
            var lowrounds = [11, 14, 23, 32, 41, 47, 48, 50, 51, 62, 68, 74, 81, 89, 97, 105, 114, 123, 133];
            zombies = lowrounds[round - 1];
        } else {
            zombies = Math.round((0.2637 * round * round + 0.1802 * round + 35.015));
        }
    } else if (players == 4) {
        if (round < 20) {
            var lowrounds = [14, 18, 30, 42, 54, 62, 64, 66, 68, 83, 91, 99, 108, 118, 129, 140, 152, 164, 178];
            zombies = lowrounds[round - 1];
        } else {
            zombies = Math.round((0.35714 * round * round - 0.0714 * round + 50.4286));
        }
    }

    return zombies;
}

function getTotalZombies(players, round) {
    var total = 0;
    for (var i = 0; i < round; i++) {
        total = total + getZombieCount(players, (i + 1));
    }
    return total;
}

function getZombieHealth(round) {
    var health = 0;
    if (round < 10) {
        var lowHealth = [150, 250, 350, 450, 550, 650, 750, 850, 950];
        health = lowHealth[round - 1];
    } else {
        health = 950 * (Math.pow(1.1, (round - 9)));
        health = Math.round(health);
    }
    return health;
}


//Song object
function Song(songId, songArtist, songName) {
	this.getSongId = function() {
		return songId;
	}

	this.getSongArtist = function() {
		return songArtist;
	}

	this.getSongName = function() {
		return songName;
	}
}