export const welcomeCardsData = [
    { title: 'Host games', description: "You've got only deck of cards? Simulate game's board by playing with virtual money.", photoPath: require("../assets/logo.png") },
    { title: 'Learn basics and more', description: "We've got tutorials for everything: from game rules to card flourishes.", photoPath: require("../assets/logo.png") },
    { title: 'Check your poker hand', description: "Not sure if your cards line up into something? Use our tool to find out.", photoPath: require("../assets/logo.png") }
  ];

export const morePanelsData = [
  { title: 'Check hand', iconName: 'layers-outline' },
  { title: 'Glossary', iconName: 'help-outline' },
  { title: 'Report a bug', iconName: 'bug-outline' },
  { title: 'Patch notes', iconName: 'document-text-outline' },
  { title: 'Credits', iconName: 'people-outline' },
  { title: 'Settings', iconName: 'settings-outline' },
];

export const skillsData = [
  {
    category: 'Basic rules',
    description: 'Get to know the essentials.',
    items: [
      { name: 'Poker', imagePath: require('../assets/logo.png') },
      { name: 'Blackjack', imagePath: require('../assets/logo.png') },
      { name: 'Roulette', imagePath: require('../assets/logo.png') }
    ]
  },
  {
    category: 'Shuffles and cuts',
    description: 'Easy, effective and useful.',
    items: [
      { name: 'Riffle shuffle', imagePath: require('../assets/riffleShuffle.gif') },
      { name: 'Faro shuffle', imagePath: require('../assets/faroShuffle.gif') },
      { name: 'Chartier Cut', imagePath: require('../assets/logo.png') },
    ]
  },
  {
    category: 'Flourishes',
    description: 'Step up your game with style.',
    items: [
      { name: 'Card spring', imagePath: require('../assets/logo.png') },
      { name: 'Card pirouette', imagePath: require('../assets/logo.png') },
      { name: 'Deck spread', imagePath: require('../assets/logo.png') }
    ]
  }
];
