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
    C('Batman', 650, 950, 500, IMG + 'batman.jpg', 'rare'),
    C('Thor', 1000, 500, 700, IMG + 'thor.jpg', 'legendary'),
    C('Hulk', 950, 100, 700, IMG + 'hulk.jpg', 'epic'),
    C('The Flash', 850, 350, 500, IMG + 'flash.jpg', 'common'),
    C('Wolverine', 750, 400, 500, IMG + 'wolverine.jpg', 'rare'),
    C('Robin', 250, 200, 150, IMG + 'robin.jpg', 'common'),
    C('Green Lantern', 850, 750, 550, IMG + 'green-lantern.jpg', 'rare'),
    C('Deadpool', 300, 400, 350, IMG + 'deadpool.jpg', 'rare'),
    C('Aquaman', 700, 200, 450, IMG + 'aquaman.jpg', 'rare'),
    C('Captain America', 550, 700, 400, IMG + 'captain-america.jpg', 'rare'),
    C('Black Panther', 650, 900, 500, IMG + 'black-panther.jpg', 'rare'),
    C('Green Arrow', 450, 400, 300, IMG + 'green-arrow.jpg', 'common'),
    C('Iron Man', 700, 950, 550, IMG + 'iron-man.jpg', 'epic'),
    C('Doctor Strange', 800, 850, 650, IMG + 'doctor-strange.jpg', 'epic'),
    C('Dr. Fate', 750, 900, 400, IMG + 'dr-fate.jpg', 'epic'),
    C('Spider-Man', 650, 800, 450, IMG + 'spider-man.jpg', 'common'),
    C('Daredevil', 400, 600, 300, IMG + 'daredevil.jpg', 'common'),
    C('The Punisher', 350, 400, 250, IMG + 'punisher.jpg', 'common'),
    C('The Thing', 750, 700, 400, IMG + 'the-thing.jpg', 'epic'),
    C('Raven', 750, 700, 600, IMG + 'raven.jpg', 'rare'),
    C('Cyborg', 700, 800, 550, IMG + 'cyborg.jpg', 'rare'),
    C('Scarlet Witch', 900, 500, 650, IMG + 'scarlet-witch.jpg', 'epic'),
    C('Superman', 1000, 450, 800, IMG + 'superman.jpg', 'legendary'),
    C('Shazam', 950, 100, 700, IMG + 'shazam.jpg', 'epic'),
    C('Vision', 800, 850, 600, IMG + 'vision.jpg', 'epic'),
    C('Wonder Woman', 900, 500, 650, IMG + 'wonder-woman.jpg', 'legendary'),
    C('Catwoman', 450, 400, 350, IMG + 'catwoman.jpg', 'common'),
    C('Magneto', 850, 600, 550, IMG + 'magneto.jpg', 'epic'),
    C('Martian Manhunter', 800, 600, 650, IMG + 'martian-manhunter.jpg', 'epic'),
    C('Mr. Fantastic', 450, 1000, 200, IMG + 'mr-fantastic.jpg', 'epic'),
    C('Moon Knight', 650, 500, 350, IMG + 'moon-knight.jpg', 'rare'),
    C('Nightwing', 550, 500, 300, IMG + 'nightwing.jpg', 'rare'),
    C('Hawkman', 400, 300, 250, IMG + 'hawkman.jpg', 'common'),
    C('Homelander', 1000, 150, 700, IMG + 'homelander.jpg', 'legendary'),
    C('Human Torch', 750, 300, 300, IMG + 'human-torch.jpg', 'rare'),
    C('Butcher', 400, 500, 300, IMG + 'butcher.jpg', 'common'),
    C('Captain Marvel', 900, 650, 700, IMG + 'captain-marvel.jpg', 'legendary'),
    C('Booster Gold', 350, 250, 300, IMG + 'booster-gold.jpg', 'common'),
    C('A-Train', 700, 200, 400, IMG + 'a-train.jpg', 'rare'),
    C('Soldier Boy', 800, 250, 600, IMG + 'soldier-boy.jpg', 'epic'),
    C('Constantine', 300, 850, 200, IMG + 'constantine.jpg', 'rare'),
    C('Kimiko', 600, 150, 500, IMG + 'kimiko.jpg', 'common'),
    C('Blue Beetle', 500, 650, 400, IMG + 'blue-beetle.jpg', 'rare'),
    C('Black Adam', 950, 300, 700, IMG + 'black-adam.jpg', 'legendary'),
    C('Invisible Woman', 450, 500, 350, IMG + 'invisible-woman.jpg', 'common'),
    C('Loki', 350, 400, 300, IMG + 'punisher.jpg', 'legendary', 'steal'),
    C('Reverse Flash', 600, 300, 400, IMG + 'flash.jpg', 'legendary', 'swap'),
    C('Two-Face', 550, 500, 600, IMG + 'batman.jpg', 'epic', 'twoface'),
    C('Hela', 950, 400, 800, IMG + 'superman.jpg', 'legendary', 'hela'),
    C('Kilgrave', 300, 600, 300, IMG + 'daredevil.jpg', 'legendary', 'kilgrave'),
    C('Riddler', 350, 900, 350, IMG + 'batman.jpg', 'legendary', 'riddler'),
    C('Mr. Freeze', 750, 500, 600, IMG + 'cyborg.jpg', 'legendary', 'mrfreeze'),
    C('Black Noir', 400, 500, 300, IMG + 'punisher.jpg', 'legendary', 'blacknoir'),
    C('Translucent', 500, 500, 500, IMG + 'spider-man.jpg', 'legendary', 'translucent'),
    C('+100', 100, 100, 100, IMG + 'batman.jpg', 'rare', null, 100),
    C('+200', 100, 100, 100, IMG + 'thor.jpg', 'rare', null, 200),
    C('+300', 100, 100, 100, IMG + 'hulk.jpg', 'epic', null, 300),
    C('+400', 100, 100, 100, IMG + 'iron-man.jpg', 'epic', null, 400),
    C('+500', 100, 100, 100, IMG + 'superman.jpg', 'legendary', null, 500)
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
