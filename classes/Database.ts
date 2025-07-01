import SettingsPanel from "../app/panels/SettingsPanel";

export const welcomeCardsData = [
    { title: 'Host games', description: "You've got only deck of cards? Simulate game's board by playing with virtual money.", photoPath: require("../assets/ss1.png") },
    { title: 'Learn basics and more', description: "We've got tutorials for everything: from game rules to card flourishes.", photoPath: require("../assets/ss2.png") },
    { title: 'Check your poker hand', description: "Not sure if your cards line up into something? Use our tool to find out.", photoPath: require("../assets/logo.png") }
  ];

export const morePanelsData = [
  { title: 'Check hand', imagePath: require('../assets/pokerHand.jpg'), panel: SettingsPanel },
  { title: 'Glossary', imagePath:  require('../assets/dictionary.jpg'), panel: SettingsPanel },
  { title: 'Report a bug', imagePath: require('../assets/reportBug.jpg'), panel: SettingsPanel },
  { title: 'Patch notes', imagePath: require('../assets/patchNotes.jpg'), panel: SettingsPanel },
  { title: 'Credits', imagePath:  require('../assets/credits.jpg'), panel: SettingsPanel },
  { title: 'Settings', imagePath: require('../assets/settings.jpg'), panel: SettingsPanel },
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

export const articlesData = [
  {
    id: 0,
    bannerPath: require('../assets/poker.png'),
    title: 'Poker (Texas Hold\'em) - the essentials',
    content: "Poker is one of the most popular card games in the world. There are many variations, but the most widely played is *Texas Hold'em*.\n\n1. Objective of the game\n\nWin the pot — the collection of all bets made during a hand. You can do this by having the best hand or getting all other players to fold.\n\n2. Dealing the cards\n\nEach player receives 2 hidden cards (called hole cards). Then 5 community cards are dealt face-up:\n– 3 cards (the flop)\n– 1 card (the turn)\n– 1 card (the river)\nThese are shared by everyone at the table.\n\n3. Betting rounds\n\nAfter each phase (deal, flop, turn, river), players can:\n– Call – match the current bet\n– Raise – increase the bet\n– Fold – give up the hand\n\n4. Hand rankings (from strongest to weakest)\n– Royal Flush\n– Straight Flush\n– Four of a Kind\n– Full House\n– Flush\n– Straight\n– Three of a Kind\n– Two Pair\n– One Pair\n– High Card\n\n5. Showdown and winning\n\nIf more than one player remains after the final round, they reveal their cards (showdown). The player with the best five-card hand wins.\n\nQuick tip\n\nPoker isn't just about the cards — it's also about strategy and psychology. Bluffing and reading your opponents are key parts of the game.",
    category: "Basic rules",
    categoryTabColor: "lightgreen",
    date: "2025-06-26",
    // if empty, type: "null"
    videoLink: "null",
    videoAuthor: "null",
    isLiked: false,
  },
  {
    id: 1,
    bannerPath: require('../assets/blackjack.jpg'),
    title: 'Blackjack - the essentials',
    content: "Blackjack (also known as 21) is a fast-paced card game where the goal is simple — beat the dealer without going over 21.\n\n1. Objective of the game\n\nYour job is to get a hand value as close to 21 as possible, without exceeding it, and higher than the dealer's hand.\n\n2. Card values\n\n– Number cards (2–10): face value\n– Face cards (J, Q, K): 10 points\n– Ace: 1 or 11 points, whichever helps more\n\n3. Starting the hand\n\n– Each player gets 2 face-up cards\n– The dealer gets 1 face-up and 1 face-down card\n\n4. Player options\n\nOn your turn, you can:\n– Hit – take another card\n– Stand – keep your current hand\n– Double down – double your bet and take one final card\n– Split – if you have two of the same card, split into two hands (extra bet required)\n\n5. Dealer's turn\n\nOnce all players finish, the dealer reveals their hidden card. The dealer:\n– Must hit until they reach at least 17\n– Must stand on 17 or higher\n\n6. Winning the game\n\n– If your hand is higher than the dealer's (without going over 21), you win\n– If you hit exactly 21 with your first two cards (Ace + 10-point card), it's called Blackjack — the best hand\n– If your hand exceeds 21, it's a bust — automatic loss\n– If the dealer busts and you don’t, you win\n\nQuick tip\n\nNever blindly hit on a high hand (17 or more). And always keep an eye on the dealer’s upcard — it reveals a lot about your odds.",
    category: "Basic rules",
    categoryTabColor: "lightgreen",
    date: "2025-06-26",
    videoLink: "null",
    videoAuthor: "null",
    isLiked: false,
  },
  {
    id: 2,
    bannerPath: require('../assets/roulette.png'),
    title: 'Roulette - the essentials',
    content: "Roulette is a casino game where players bet on where a ball will land on a spinning wheel. It's all about chance, but understanding the bets can help you play smarter.\n\n1. Objective of the game\n\nPredict where the ball will land on the roulette wheel and place your bets accordingly. You win if your bet matches the outcome.\n\n2. The wheel and the table\n\n– European roulette has 37 pockets (1–36 + single 0)\n– American roulette has 38 pockets (1–36 + single 0 and double 00)\n– The numbers are alternately colored red and black, with zero(s) in green\n\n3. Types of bets\n\n– *Inside bets* – placed on specific numbers or small groups:\n • Straight up – bet on one number\n • Split – two adjacent numbers\n • Street – row of three numbers\n • Corner – block of four numbers\n • Six line – two adjacent rows\n\n– *Outside bets* – broader categories:\n • Red or Black\n • Odd or Even\n • 1–18 (Low) or 19–36 (High)\n • Dozens (1–12, 13–24, 25–36)\n • Columns\n\n4. The spin\n\nThe dealer spins the wheel in one direction and the ball in the other. Once the ball lands in a pocket, bets are settled.\n\n5. Payouts\n\n– The more specific your bet, the higher the payout (e.g., 35:1 for a single number)\n– Broader bets offer lower payouts but higher chances of winning\n\nQuick tip\n\nStick to European roulette if possible — that single zero gives you slightly better odds than the American double-zero version.",
    category: "Basic rules",
    categoryTabColor: "lightgreen",
    date: "2025-06-26",
    videoLink: "null",
    videoAuthor: "null",
    isLiked: false,
  },
  {
    id: 3,
    bannerPath: require('../assets/riffleShuffle.gif'),
    title: 'The Riffle Shuffle - classic shuffle technique',
    content: "The riffle shuffle is the most recognizable and satisfying way to mix cards — used by magicians, casino dealers, and card players alike.\n\n1. Objective\n\nEvenly interlace two halves of a deck to randomize the card order and impress with clean technique.\n\n2. Setup\n\nHold half the deck in each hand:\n– Thumbs on top edge\n– Fingers supporting the bottom\n– Backs of the cards facing each other\n\n3. The shuffle\n\n– Tilt both halves slightly downward\n– Let the corners drop card by card, interleaving them\n– Push the two halves together into one deck\n\n4. Optional: Bridge Finish\n\n– Bend the deck upward slightly\n– Release the tension and let the cards cascade together neatly\n\nQuick tip\n\nPractice the release with both thumbs at the same rhythm — the smoother the fall, the cleaner the shuffle.",
    category: "Shuffles and cuts",
    categoryTabColor: "yellow",
    date: "2025-06-26",
    videoLink: "https://www.youtube.com/watch?v=-7BYtk1rLpY&",
    videoAuthor: "Josep Vidal",
    isLiked: false,
  },
  {
    id: 4,
    bannerPath: require('../assets/faroShuffle.gif'),
    title: 'The Faro Shuffle - Perfect Interlace Shuffle',
    content: "The faro shuffle is a precision technique where the deck is split exactly in half and then perfectly interwoven, one card at a time, from each half.\n\n1. Objective\n\nInterlace the two halves of a deck perfectly — card by card — creating a nearly flawless shuffle often used in magic and gambling demonstrations.\n\n2. Setup\n\n– Split the deck into two equal halves (26 cards each)\n– Hold one half in each hand, short sides facing each other\n– Slightly bevel the inner corners for alignment\n\n3. The shuffle\n\n– Gently press the corners of both halves together\n– Cards should alternate exactly (one from each half)\n– Push the halves fully into one another, completing the interlace\n\n4. Optional: In-Faro vs. Out-Faro\n\n– *In-Faro*: top card stays on top\n– *Out-Faro*: second card becomes the new top — used for specific card placement effects\n\nQuick tip\n\nUse a newer or slightly worn deck for best results — perfect alignment is nearly impossible with warped or sticky cards.",
    category: "Shuffles and cuts",
    categoryTabColor: "yellow",
    date: "2025-06-26",
    videoLink: "https://www.youtube.com/watch?v=RXhNA0xLRgY&",
    videoAuthor: "Hester23BearsCH",
    isLiked: false,
  },
  {
    id: 5,
    bannerPath: require('../assets/charlierCut.gif'),
    title: 'Charlier Cut - the classic one-handed cut',
    content: "The Charlier Cut is a fundamental one-handed flourish where the deck is cleanly cut into two halves and reassembled — all using just one hand.\n\n1. Objective\n\nSplit the deck in one hand and close it again without dropping cards, creating a seamless and elegant cut motion.\n\n2. Setup\n\n– Hold the deck in straddle grip (thumb on one edge, pinky on opposite edge, other fingers on the sides)\n– Tilt your hand slightly to use gravity in your favor\n\n3. The motion\n\n– Use your thumb to release the bottom half of the deck downward\n– Lift the top packet with your index finger\n– Let the bottom packet fall into your palm space\n– Lower the top packet back down to complete the cut\n\n4. Key tips\n\n– Keep your grip relaxed but controlled\n– Use subtle finger tension to guide and contain the packets\n– Start slow — clean movement matters more than speed\n\nQuick tip\n\nThis move is a springboard to more complex one-handed cuts — once it’s in your muscle memory, the possibilities open up.",
    category: "Shuffles and cuts",
    categoryTabColor: "yellow",
    date: "2025-06-26",
    videoLink: "https://www.youtube.com/watch?v=dNAkNsbxMcI&",
    videoAuthor: "Josep Vidal",
    isLiked: false,
  },
  {
    id: 6,
    bannerPath: require('../assets/cardSpring.gif'),
    title: 'Card Spring - the flashy crowd-pleaser',
    content: "The Card Spring is a dramatic flourish where cards arc through the air in a controlled cascade from one hand to the other. It’s bold, visual, and instantly gets attention.\n\n1. Objective\n\nShoot a stream of cards from one hand to the other in a smooth, even arc — showing control, confidence, and flair.\n\n2. Setup\n\n– Hold the full deck vertically in your dominant hand\n– Apply pressure with your thumb at the top and fingers at the bottom (like compressing a spring)\n– Position your receiving hand about 30 cm away, open and ready to catch\n\n3. The spring\n\n– Gradually release pressure with your thumb\n– Cards should fly out one by one, landing in your other hand\n– Aim for a consistent rhythm and arc — don’t rush the release\n\n4. Key tips\n\n– Use a flexible, slightly broken-in deck (new ones are too stiff)\n– Start low to avoid big messes\n– Keep your receiving hand relaxed — let the cards fall into it like a cradle\n\nQuick tip\n\nDon’t worry if cards scatter at first — control comes with repetition. The more confidently you spring, the better it looks.",
    category: "Flourishes",
    categoryTabColor: "red",
    date: "2025-06-26",
    videoLink: "https://www.youtube.com/watch?v=m01QDhoPhlY&",
    videoAuthor: "Hester23BearsCH",
    isLiked: false,
  },
  {
    id: 7,
    bannerPath: require('../assets/cardFan.gif'),
    title: 'Card Fan – the elegant flourish that spreads the deck',
    content: "The Card Fan is a visual staple in cardistry and magic, creating a smooth arc of overlapping cards in your hand. It shows control, flair, and presentation skills.\n\n1. Objective\n\nSpread the cards in a clean, even arc using one or two hands — showcasing the faces or backs in a stylish fan shape.\n\n2. Setup\n\n– Hold the deck in your dominant hand with thumb on top edge and fingers on the bottom\n– Angle the deck slightly downward and outward from your palm\n\n3. The fan\n\n– With your opposite thumb, press firmly into the top-left corner of the deck\n– Apply steady pressure and slide across the top edge in a fanning motion\n– Cards should cascade smoothly into an arc, evenly spaced\n\n4. Adjustments\n\n– Use fingers underneath to support and shape the curve\n– Spread farther for a larger fan, or tighter for a compact look\n– One-handed fans are possible with practice using thumb and middle finger pinch plus index pivot\n\nQuick tip\n\nUse a smooth, slightly broken-in deck with clean edges. If cards are clumped or sticky, try fanning powder or gently breaking them in by hand.",
    category: "Flourishes",
    categoryTabColor: "red",
    date: "2025-06-26",
    videoLink: "https://www.youtube.com/watch?v=O-mo1ErJF60&",
    videoAuthor: "Josep Vidal",
    isLiked: false,
  },
  {
    id: 8,
    bannerPath: require('../assets/ribbonSpread.gif'),
    title: 'Ribbon Spread – the smooth table spread',
    content: "The Ribbon Spread is a classic flourish performed on a table where the deck is fanned out in a long, even arc, showcasing the cards and setting up for magical reveals or clean pickups.\n\n1. Objective\n\nSpread all cards across the table in one fluid motion, creating a visual ribbon — great for style and structure in routines.\n\n2. Setup\n\n– Use a smooth surface (like a close-up mat or polished table)\n– Hold the deck face-down at one short edge\n– Apply light downward pressure with your index and middle fingers\n\n3. The spread\n\n– Pull the deck sideways in a sweeping arc\n– Keep even pressure so cards flow one after another\n– Aim for a smooth curve with equal spacing\n\n4. The flip (optional)\n\n– Press on either end of the ribbon and flick gently to flip the whole spread over\n– This move adds flair and is a favorite in magic acts\n\n5. Collecting the deck\n\n– Use two hands to scoop up from both ends\n– Or push the cards together in reverse motion with one hand for style points\n\nQuick tip\n\nDeck too sticky? Lightly bend and break in the cards beforehand. Smooth hands and surface make all the difference.",
    category: "Flourishes",
    categoryTabColor: "red",
    date: "2025-06-26",
    videoLink: "https://www.youtube.com/watch?v=GhXxtp27Qhc&",
    videoAuthor: "Josep Vidal",
    isLiked: false,
  },
];