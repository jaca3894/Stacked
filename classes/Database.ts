export const welcomeCardsData = [
    { title: 'Host games', description: "You've got only deck of cards? Simulate game's board by playing with virtual money.", photoPath: require("../assets/logo.png") },
    { title: 'Learn basics and more', description: "We've got tutorials for everything: from game rules to card flourishes.", photoPath: require("../assets/logo.png") },
    { title: 'Check your poker hand', description: "Not sure if your cards line up into something? Use our tool to find out.", photoPath: require("../assets/logo.png") }
  ];

export const morePanelsData = [
  { title: 'Check hand', imagePath: require('../assets/pokerHand.jpg') },
  { title: 'Glossary', imagePath:  require('../assets/dictionary.jpg') },
  { title: 'Report a bug', imagePath: require('../assets/reportBug.jpg') },
  { title: 'Patch notes', imagePath: require('../assets/patchNotes.jpg') },
  { title: 'Credits', imagePath:  require('../assets/credits.jpg') },
  { title: 'Settings', imagePath: require('../assets/settings.jpg') },
];

export const skillsData = [
  {
    category: 'Basic rules',
    description: 'Get to know the essentials.',
    items: [
      { name: 'Poker', imagePath: require('../assets/poker.png') },
      { name: 'Blackjack', imagePath: require('../assets/blackjack.jpg') },
      { name: 'Roulette', imagePath: require('../assets/roulette.png') }
    ]
  },
  {
    category: 'Shuffles and cuts',
    description: 'Easy, effective and useful.',
    items: [
      { name: 'Riffle shuffle', imagePath: require('../assets/riffleShuffle.gif') },
      { name: 'Faro shuffle', imagePath: require('../assets/faroShuffle.gif') },
      { name: 'Charlier Cut', imagePath: require('../assets/charlierCut.gif') },
    ]
  },
  {
    category: 'Flourishes',
    description: 'Step up your game with style.',
    items: [
      { name: 'Card spring', imagePath: require('../assets/cardSpring.gif') },
      { name: 'Card fan', imagePath: require('../assets/cardFan.gif') },
      { name: 'Ribbon spread', imagePath: require('../assets/ribbonSpread.gif') }
    ]
  }
];
