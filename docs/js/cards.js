/* Multiverse card pool — superhero cards with images & rarity.
   Runs in the browser AND on the Node server. */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.CARD_POOL = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  function C(name, attack, intelligence, defense, img, rarity, special, bonus) {
    return { name: name, attack: attack, intelligence: intelligence, defense: defense, img: img, rarity: rarity, special: special, bonus: bonus };
  }
  var IMG = 'assets/cards/';
  var pool = [
    C('Batman', 650, 950, 500, IMG + 'batman.png', 'rare'),
    C('Thor', 1000, 500, 700, IMG + 'thor.png', 'legendary'),
    C('Hulk', 950, 100, 700, IMG + 'hulk.png', 'epic'),
    C('The Flash', 850, 350, 500, IMG + 'flash.png', 'common'),
    C('Wolverine', 750, 400, 500, IMG + 'wolverine.png', 'rare'),
    C('Robin', 250, 200, 150, IMG + 'robin.png', 'common'),
    C('Green Lantern', 850, 750, 550, IMG + 'green-lantern.png', 'rare'),
    C('Deadpool', 300, 400, 350, IMG + 'deadpool.png', 'rare'),
    C('Aquaman', 700, 200, 450, IMG + 'aquaman.png', 'rare'),
    C('Captain America', 550, 700, 400, IMG + 'captain-america.png', 'rare'),
    C('Black Panther', 650, 900, 500, IMG + 'black-panther.png', 'rare'),
    C('Green Arrow', 450, 400, 300, IMG + 'green-arrow.png', 'common'),
    C('Iron Man', 700, 950, 550, IMG + 'iron-man.png', 'epic'),
    C('Doctor Strange', 800, 850, 650, IMG + 'doctor-strange.png', 'epic'),
    C('Dr. Fate', 750, 900, 400, IMG + 'dr-fate.png', 'epic'),
    C('Spider-Man', 650, 800, 450, IMG + 'spider-man.png', 'common'),
    C('Daredevil', 400, 600, 300, IMG + 'daredevil.png', 'common'),
    C('The Punisher', 350, 400, 250, IMG + 'punisher.png', 'common'),
    C('The Thing', 750, 700, 400, IMG + 'the-thing.png', 'epic'),
    C('Raven', 750, 700, 600, IMG + 'raven.png', 'rare'),
    C('Cyborg', 700, 800, 550, IMG + 'cyborg.png', 'rare'),
    C('Scarlet Witch', 900, 500, 650, IMG + 'scarlet-witch.png', 'epic'),
    C('Superman', 1000, 450, 800, IMG + 'superman.png', 'legendary'),
    C('Shazam', 950, 100, 700, IMG + 'shazam.png', 'epic'),
    C('Vision', 800, 850, 600, IMG + 'vision.png', 'epic'),
    C('Wonder Woman', 900, 500, 650, IMG + 'wonder-woman.png', 'legendary'),
    C('Catwoman', 450, 400, 350, IMG + 'catwoman.png', 'common'),
    C('Magneto', 850, 600, 550, IMG + 'magneto.png', 'epic'),
    C('Martian Manhunter', 800, 600, 650, IMG + 'martian-manhunter.png', 'epic'),
    C('Mr. Fantastic', 450, 1000, 200, IMG + 'mr-fantastic.png', 'epic'),
    C('Moon Knight', 650, 500, 350, IMG + 'moon-knight.png', 'rare'),
    C('Nightwing', 550, 500, 300, IMG + 'nightwing.png', 'rare'),
    C('Hawkman', 400, 300, 250, IMG + 'hawkman.png', 'common'),
    C('Homelander', 1000, 150, 700, IMG + 'homelander.png', 'legendary'),
    C('Human Torch', 750, 300, 300, IMG + 'human-torch.png', 'rare'),
    C('Butcher', 400, 500, 300, IMG + 'butcher.png', 'common'),
    C('Captain Marvel', 900, 650, 700, IMG + 'captain-marvel.png', 'legendary'),
    C('Booster Gold', 350, 250, 300, IMG + 'booster-gold.png', 'common'),
    C('A-Train', 700, 200, 400, IMG + 'a-train.png', 'rare'),
    C('Soldier Boy', 800, 250, 600, IMG + 'soldier-boy.png', 'epic'),
    C('Constantine', 300, 850, 200, IMG + 'constantine.png', 'rare'),
    C('Kimiko', 600, 150, 500, IMG + 'kimiko.png', 'common'),
    C('Blue Beetle', 500, 650, 400, IMG + 'blue-beetle.png', 'rare'),
    C('Black Adam', 950, 300, 700, IMG + 'black-adam.png', 'legendary'),
    C('Invisible Woman', 450, 500, 350, IMG + 'invisible-woman.png', 'common'),
    C('Loki', 350, 400, 300, IMG + 'punisher.png', 'legendary', 'steal'),
    C('Reverse Flash', 600, 300, 400, IMG + 'flash.png', 'legendary', 'swap'),
    C('Two-Face', 550, 500, 600, IMG + 'batman.png', 'epic', 'twoface'),
    C('Hela', 950, 400, 800, IMG + 'superman.png', 'legendary', 'hela'),
    C('Kilgrave', 300, 600, 300, IMG + 'daredevil.png', 'legendary', 'kilgrave'),
    C('Riddler', 350, 900, 350, IMG + 'batman.png', 'legendary', 'riddler'),
    C('Mr. Freeze', 750, 500, 600, IMG + 'cyborg.png', 'legendary', 'mrfreeze'),
    C('Black Noir', 400, 500, 300, IMG + 'punisher.png', 'legendary', 'blacknoir'),
    C('Translucent', 500, 500, 500, IMG + 'spider-man.png', 'legendary', 'translucent'),
    C('+100', 100, 100, 100, IMG + 'batman.png', 'rare', null, 100),
    C('+200', 100, 100, 100, IMG + 'thor.png', 'rare', null, 200),
    C('+300', 100, 100, 100, IMG + 'hulk.png', 'epic', null, 300),
    C('+400', 100, 100, 100, IMG + 'iron-man.png', 'epic', null, 400),
    C('+500', 100, 100, 100, IMG + 'superman.png', 'legendary', null, 500)
  ];
  pool.forEach(function (c, i) {
    c.id = 'c' + i;
    var best = 'attack';
    if (c.intelligence > c.attack && c.intelligence >= c.defense) best = 'intelligence';
    else if (c.defense > c.attack && c.defense > c.intelligence) best = 'defense';
    c.specialty = best;
  });
  var doubled = [];
  pool.forEach(function (c, i) {
    doubled.push(c);
    if (c.special) {
      var copy = {};
      for (var k in c) copy[k] = c[k];
      copy.id = 'd' + i;
      doubled.push(copy);
    }
  });
  return doubled;
});
