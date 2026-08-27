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
    C('Batman', 650, 950, 500, IMG + 'باتمان.png', 'rare'),
    C('Thor', 1000, 500, 700, IMG + 'ثور.png', 'legendary'),
    C('Hulk', 950, 100, 700, IMG + 'هالك.png', 'epic'),
    C('The Flash', 850, 350, 500, IMG + 'فلاش.png', 'common'),
    C('Wolverine', 750, 400, 500, IMG + 'وولفرين.png', 'rare'),
    C('Robin', 250, 200, 150, IMG + 'روبين.png', 'common'),
    C('Green Lantern', 850, 750, 550, IMG + 'جرين لانترن.png', 'rare'),
    C('Deadpool', 300, 400, 350, IMG + 'ديدبول.png', 'rare'),
    C('Aquaman', 700, 200, 450, IMG + 'اكوا مان.png', 'rare'),
    C('Captain America', 550, 700, 400, IMG + 'كابتن اميريكا.png', 'rare'),
    C('Black Panther', 650, 900, 500, IMG + 'بلاك بانثر.png', 'rare'),
    C('Green Arrow', 450, 400, 300, IMG + 'جرين ارو.png', 'common'),
    C('Iron Man', 700, 950, 550, IMG + 'ايرون مان.png', 'epic'),
    C('Doctor Strange', 800, 850, 650, IMG + 'دكتور سترينج.png', 'epic'),
    C('Dr. Fate', 750, 900, 400, IMG + 'دكتور فيث.png', 'epic'),
    C('Spider-Man', 650, 800, 450, IMG + 'سبايدر مان.png', 'common'),
    C('Daredevil', 400, 600, 300, IMG + 'ديرديفل.png', 'common'),
    C('The Punisher', 350, 400, 250, IMG + 'ذا بانيشر.png', 'common'),
    C('The Thing', 750, 700, 400, IMG + 'ذا ثينج.png', 'epic'),
    C('Raven', 750, 700, 600, IMG + 'ريفن.png', 'rare'),
    C('Cyborg', 700, 800, 550, IMG + 'سايبورج.png', 'rare'),
    C('Scarlet Witch', 900, 500, 650, IMG + 'سكارليت ويتش.png', 'epic'),
    C('Superman', 1000, 450, 800, IMG + 'سوبر مان.png', 'legendary'),
    C('Shazam', 950, 100, 700, IMG + 'شزام.png', 'epic'),
    C('Vision', 800, 850, 600, IMG + 'فيجن.png', 'epic'),
    C('Wonder Woman', 900, 500, 650, IMG + 'ووندر ومان.png', 'legendary'),
    C('Catwoman', 450, 400, 350, IMG + 'كات ومان.png', 'common'),
    C('Magneto', 850, 600, 550, IMG + 'ماجنيتو.png', 'epic'),
    C('Martian Manhunter', 800, 600, 650, IMG + 'مارتن مان هانتر.png', 'epic'),
    C('Mr. Fantastic', 450, 1000, 200, IMG + 'مستر فانتاستيك.png', 'epic'),
    C('Moon Knight', 650, 500, 350, IMG + 'مون نايت.png', 'rare'),
    C('Nightwing', 550, 500, 300, IMG + 'نايتوينج.png', 'rare'),
    C('Hawkman', 400, 300, 250, IMG + 'هوك مان.png', 'common'),
    C('Homelander', 1000, 150, 700, IMG + 'هوملاندر.png', 'legendary'),
    C('Human Torch', 750, 300, 300, IMG + 'هيومن تورتش.png', 'rare'),
    C('Butcher', 400, 500, 300, IMG + 'بوتشر.png', 'common'),
    C('Captain Marvel', 900, 650, 700, IMG + 'كابتن مارفل.png', 'legendary'),
    C('Booster Gold', 350, 250, 300, IMG + 'بوسترجولد.png', 'common'),
    C('A-Train', 700, 200, 400, IMG + 'ترين.png', 'rare'),
    C('Soldier Boy', 800, 250, 600, IMG + 'سولدجر بوي.png', 'epic'),
    C('Constantine', 300, 850, 200, IMG + 'قسطنطين.png', 'rare'),
    C('Kimiko', 600, 150, 500, IMG + 'كيميكو.png', 'common'),
    C('Blue Beetle', 500, 650, 400, IMG + 'بلو بيتل.png', 'rare'),
    C('Black Adam', 950, 300, 700, IMG + 'بلاك أدم.png', 'legendary'),
    C('Invisible Woman', 450, 500, 350, IMG + 'انفيزبل وومان.png', 'common'),
    C('Loki', 350, 400, 300, IMG + 'ذا بانيشر.png', 'legendary', 'steal'),
    C('Reverse Flash', 600, 300, 400, IMG + 'فلاش.png', 'legendary', 'swap'),
    C('Two-Face', 550, 500, 600, IMG + 'باتمان.png', 'epic', 'twoface'),
    C('Hela', 950, 400, 800, IMG + 'سوبر مان.png', 'legendary', 'hela'),
    C('Kilgrave', 300, 600, 300, IMG + 'ديرديفل.png', 'legendary', 'kilgrave'),
    C('Riddler', 350, 900, 350, IMG + 'باتمان.png', 'legendary', 'riddler'),
    C('Mr. Freeze', 750, 500, 600, IMG + 'سايبورج.png', 'legendary', 'mrfreeze'),
    C('Black Noir', 400, 500, 300, IMG + 'ذا بانيشر.png', 'legendary', 'blacknoir'),
    C('Translucent', 500, 500, 500, IMG + 'سبايدر مان.png', 'legendary', 'translucent'),
    C('+100', 100, 100, 100, IMG + 'باتمان.png', 'rare', null, 100),
    C('+200', 100, 100, 100, IMG + 'ثور.png', 'rare', null, 200),
    C('+300', 100, 100, 100, IMG + 'هالك.png', 'epic', null, 300),
    C('+400', 100, 100, 100, IMG + 'ايرون مان.png', 'epic', null, 400),
    C('+500', 100, 100, 100, IMG + 'سوبر مان.png', 'legendary', null, 500)
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
