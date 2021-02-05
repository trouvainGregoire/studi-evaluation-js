/**
 * L'objectif est d'obtenir 100 points
 */
const GOAL = 100

/**
 * Si la valeur du dé est égale à LOOOSE alors le joueur perd son round et c'est au tour du joueur suivant
 */
const LOOSE = 1

/*
 * Bouton pour lancer une partie
 */
const NEW_GAME_BUTTON = document.getElementById('new-game');

/*
 * Bouton pour lancer le dé
 */
const ROLL_DICE_BUTTON = document.getElementById('role-dice');

/*
 * Bouton pour transférer le score du tour du joueur vers son score globale
 */
const HOLD_BUTTON = document.getElementById('hold');

/**
 * Paragraphe contenant le score du joueur 1
 */

const HTML_ROUND_SCORE_PLAYER_ONE = document.getElementById('player-one-round-score');

/**
 * Paragraphe contenant le score du joueur 1
 */

const HTML_ROUND_SCORE_PLAYER_TWO = document.getElementById('player-two-round-score');

/**
 * Paragraphe contenant le score global du joueur 1
 */

const HTML_GLOBAL_SCORE_PLAYER_ONE = document.getElementById('player-one-global-score');

/**
 * Paragraphe contenant le score du joueur 1
 */

const HTML_GLOBAL_SCORE_PLAYER_TWO = document.getElementById('player-two-global-score');

/**
 * Icone qui permet de savoir si c'est au tour du joueur 1
 */

const HTML_PLAYER_ONE_DASH = document.getElementById('player-one__dash');

/**
 * Icone qui permet de savoir si c'est au tour du joueur 2
 */
const HTML_PLAYER_TWO_DASH = document.getElementById('player-two__dash');

/**
 * L'image du dé
 */
const HTML_DICE_IMG = document.getElementById('dice');

/*
 * Objet party
 */

const party = {
    current_player: null,
    players: []
}

/*
 * Objet Joueur
 */
const player = {
    round_score: 0,
    global_score: 0,
    position: 0
}
/*
* On déclare nos joueurs et la partie
 */
const currentParty = Object.create(party);
const playerOne = Object.create(player);
const playerTwo = Object.create(player);

/*
 * On initialise une première partie
 */
start_new_party();

/*
 * Fonction qui permet d'obtenir un chiffre entre 1 et 6 de façon aléatoire
 */
function random_dice_face() {
    return Math.floor(Math.random() * 6) + 1;
}

/*
 * Function qui permet de start une nouvelle partie
 */
function start_new_party() {
    playerOne.round_score = 0;
    playerOne.global_score = 0;
    playerTwo.round_score = 0;
    playerTwo.global_score = 0;
    playerOne.position = 1;
    playerTwo.position = 2;
    currentParty.current_player = playerOne;
    currentParty.players = [];
    currentParty.players.push(playerOne, playerTwo);
    update_ui('reset');
}

/*
 * Fonction qui met à jour l'UI
 */
function update_ui(action, number) {
    switch (action) {
        case 'dice':
            HTML_DICE_IMG.src = `images/dice-${number}.svg`;
            break;
        case 'reset':
            HTML_ROUND_SCORE_PLAYER_ONE.innerHTML = '0';
            HTML_ROUND_SCORE_PLAYER_TWO.innerHTML = '0';
            HTML_GLOBAL_SCORE_PLAYER_ONE.innerHTML = '0';
            HTML_GLOBAL_SCORE_PLAYER_TWO.innerHTML = '0';
            HTML_PLAYER_ONE_DASH.style.display = 'inline';
            HTML_PLAYER_TWO_DASH.style.display = 'none';
            HTML_DICE_IMG.src = 'images/dice-1.svg';
            break;
        default:
            return;
    }
}

/*
 * Action au click sur le boutton new game
 */

NEW_GAME_BUTTON.addEventListener('click', (e) => {
    e.preventDefault();
    start_new_party();
});

/*
 * Action au click sur le boutton roll dice
 */
ROLL_DICE_BUTTON.addEventListener('click', (e) => {
    e.preventDefault();
    let dice_face = random_dice_face();
    update_ui('dice', dice_face);
    let currentPlayer = currentParty.current_player;

    if (dice_face !== LOOSE) {
        // On acumule le score du joueur en cours avec le resultat du dé
        currentPlayer.round_score += dice_face;

        if (currentParty.current_player.position === 1) {
            HTML_ROUND_SCORE_PLAYER_ONE.innerHTML = currentPlayer.round_score;
        } else {
            HTML_ROUND_SCORE_PLAYER_TWO.innerHTML = currentPlayer.round_score;
        }
    } else {
        // C'est la fin du tour du joueur et son score de round est perdu
        currentPlayer.round_score = 0;
        currentParty.current_player.position === 1 ? HTML_ROUND_SCORE_PLAYER_ONE.innerHTML = '0' : HTML_ROUND_SCORE_PLAYER_TWO.innerHTML = '0';
        currentParty.current_player = currentParty.players.filter((player) => Object.entries(player).toString() !== Object.entries(currentPlayer).toString())[0];
        if (currentParty.current_player.position === 1) {
            HTML_PLAYER_ONE_DASH.style.display = 'inline';
            HTML_PLAYER_TWO_DASH.style.display = 'none';
        } else {
            HTML_PLAYER_TWO_DASH.style.display = 'inline';
            HTML_PLAYER_ONE_DASH.style.display = 'none';
        }
    }
});

/*
 * Action au click sur le boutton hold
 */
HOLD_BUTTON.addEventListener('click', (e) => {
    e.preventDefault();
    let currentPlayer = currentParty.current_player;
    currentPlayer.global_score += currentPlayer.round_score;
    currentPlayer.round_score = 0;
    currentParty.current_player.position === 1 ? HTML_ROUND_SCORE_PLAYER_ONE.innerHTML = '0' : HTML_ROUND_SCORE_PLAYER_TWO.innerHTML = '0';
    currentParty.current_player.position === 1 ? HTML_GLOBAL_SCORE_PLAYER_ONE.innerHTML = currentPlayer.global_score : HTML_GLOBAL_SCORE_PLAYER_TWO.innerHTML = currentPlayer.global_score;
    // Si le joueur actuel obtien
    if (currentPlayer.global_score >= GOAL) {
        alert(`Le joueur n° ${currentPlayer.position} à gagné !`);
        start_new_party();
    }
});
