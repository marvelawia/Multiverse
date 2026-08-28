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
  var IMG = '';
  var pool = [
    C('Batman', 650, 950, 500, 'https://files.catbox.moe/v40smx.png', 'rare'),
    C('Thor', 1000, 500, 700, 'https://files.catbox.moe/ioceft.png', 'legendary'),
    C('Hulk', 950, 100, 700, 'https://files.catbox.moe/8plloh.png', 'epic'),
    C('The Flash', 850, 350, 500, 'https://files.catbox.moe/wl17bq.png', 'common'),
    C('Wolverine', 750, 400, 500, 'https://files.catbox.moe/3llsmz.png', 'rare'),
    C('Robin', 250, 200, 150, 'https://files.catbox.moe/9o9h7a.png', 'common'),
    C('Green Lantern', 850, 750, 550, 'https://files.catbox.moe/qha4x6.png', 'rare'),
    C('Deadpool', 300, 400, 350, 'https://files.catbox.moe/lmbz5l.png', 'rare'),
    C('Aquaman', 700, 200, 450, 'https://files.catbox.moe/62vla2.png', 'rare'),
    C('Captain America', 550, 700, 400, 'https://files.catbox.moe/vktohp.png', 'rare'),
    C('Black Panther', 650, 900, 500, 'https://files.catbox.moe/061lss.png', 'rare'),
    C('Green Arrow', 450, 400, 300, 'https://files.catbox.moe/ywbzti.png', 'common'),
    C('Iron Man', 700, 950, 550, 'https://files.catbox.moe/lquyc6.png', 'epic'),
    C('Doctor Strange', 800, 850, 650, 'https://files.catbox.moe/ixbc39.png', 'epic'),
    C('Dr. Fate', 750, 900, 400, 'https://files.catbox.moe/igrag4.png', 'epic'),
    C('Spider-Man', 650, 800, 450, 'https://files.catbox.moe/9z8alq.png', 'common'),
    C('Daredevil', 400, 600, 300, 'https://files.catbox.moe/be2x31.png', 'common'),
    C('The Punisher', 350, 400, 250, 'https://files.catbox.moe/xbq3v8.png', 'common'),
    C('The Thing', 750, 700, 400, 'https://files.catbox.moe/l11z4s.png', 'epic'),
    C('Raven', 750, 700, 600, 'https://files.catbox.moe/hjb1ox.png', 'rare'),
    C('Cyborg', 700, 800, 550, 'https://files.catbox.moe/vij08b.png', 'rare'),
    C('Scarlet Witch', 900, 500, 650, 'https://files.catbox.moe/5f94ik.png', 'epic'),
    C('Superman', 1000, 450, 800, 'https://files.catbox.moe/8x3y7z.png', 'legendary'),
    C('Shazam', 950, 100, 700, 'https://files.catbox.moe/r5bp8x.png', 'epic'),
    C('Vision', 800, 850, 600, 'https://files.catbox.moe/t85wx6.png', 'epic'),
    C('Wonder Woman', 900, 500, 650, 'https://files.catbox.moe/jcpxm7.png', 'legendary'),
    C('Catwoman', 450, 400, 350, 'https://files.catbox.moe/6v8cgj.png', 'common'),
    C('Magneto', 850, 600, 550, 'https://files.catbox.moe/lc6g7p.png', 'epic'),
    C('Martian Manhunter', 800, 600, 650, 'https://files.catbox.moe/268hln.png', 'epic'),
    C('Mr. Fantastic', 450, 1000, 200, 'https://files.catbox.moe/9vf541.png', 'epic'),
    C('Moon Knight', 650, 500, 350, 'https://files.catbox.moe/e4h8y3.png', 'rare'),
    C('Nightwing', 550, 500, 300, 'https://files.catbox.moe/95t9zf.png', 'rare'),
    C('Hawkman', 400, 300, 250, 'https://files.catbox.moe/5lvdxd.png', 'common'),
    C('Homelander', 1000, 150, 700, 'https://files.catbox.moe/efr8h5.png', 'legendary'),
    C('Human Torch', 750, 300, 300, 'https://files.catbox.moe/p3p65c.png', 'rare'),
    C('Butcher', 400, 500, 300, 'https://files.catbox.moe/18c1nl.png', 'common'),
    C('Captain Marvel', 900, 650, 700, 'https://files.catbox.moe/41fjp5.png', 'legendary'),
    C('Booster Gold', 350, 250, 300, 'https://files.catbox.moe/1pd747.png', 'common'),
    C('A-Train', 700, 200, 400, 'https://files.catbox.moe/fx2ok2.png', 'rare'),
    C('Soldier Boy', 800, 250, 600, 'https://files.catbox.moe/jshk11.png', 'epic'),
    C('Constantine', 300, 850, 200, 'https://files.catbox.moe/jlk53p.png', 'rare'),
    C('Kimiko', 600, 150, 500, 'https://files.catbox.moe/f4qjjb.png', 'common'),
    C('Blue Beetle', 500, 650, 400, 'https://files.catbox.moe/nsxpl2.png', 'rare'),
    C('Black Adam', 950, 300, 700, 'https://files.catbox.moe/nr1rck.png', 'legendary'),
    C('Invisible Woman', 450, 500, 350, 'https://files.catbox.moe/dukp2u.png', 'common'),
    C('Loki', 350, 400, 300, 'https://files.catbox.moe/xbq3v8.png', 'legendary', 'steal'),
    C('Reverse Flash', 600, 300, 400, 'https://files.catbox.moe/wl17bq.png', 'legendary', 'swap'),
    C('Two-Face', 550, 500, 600, 'https://files.catbox.moe/v40smx.png', 'epic', 'twoface'),
    C('Hela', 950, 400, 800, 'https://files.catbox.moe/8x3y7z.png', 'legendary', 'hela'),
    C('Kilgrave', 300, 600, 300, 'https://files.catbox.moe/be2x31.png', 'legendary', 'kilgrave'),
    C('Riddler', 350, 900, 350, 'https://files.catbox.moe/v40smx.png', 'legendary', 'riddler'),
    C('Mr. Freeze', 750, 500, 600, 'https://files.catbox.moe/vij08b.png', 'legendary', 'mrfreeze'),
    C('Black Noir', 400, 500, 300, 'https://files.catbox.moe/xbq3v8.png', 'legendary', 'blacknoir'),
    C('Translucent', 500, 500, 500, 'https://files.catbox.moe/9z8alq.png', 'legendary', 'translucent'),
    C('+100', 100, 100, 100, 'https://files.catbox.moe/v40smx.png', 'rare', null, 100),
    C('+200', 100, 100, 100, 'https://files.catbox.moe/ioceft.png', 'rare', null, 200),
    C('+300', 100, 100, 100, 'https://files.catbox.moe/8plloh.png', 'epic', null, 300),
    C('+400', 100, 100, 100, 'https://files.catbox.moe/lquyc6.png', 'epic', null, 400),
    C('+500', 100, 100, 100, 'https://files.catbox.moe/8x3y7z.png', 'legendary', null, 500)
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
