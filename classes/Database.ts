import AsyncStorage from "@react-native-async-storage/async-storage";

const getLanguage = async (): Promise<"pl" | "eng"> => {
  const lang = await AsyncStorage.getItem("@language");
  return lang === "pl" || lang === "eng" ? lang : "eng";
};

export const getMorePanelsData = async () => {
  const lang = await getLanguage();

  return [
    {
      title: lang === "pl" ? "Słowniczek" : "Glossary",
      subtitle:
        lang === "pl"
          ? "Poznaj definicje kluczowych pojęć"
          : "Explore definitions of key terms",
      iconName: "book-outline",
      panel: "Glossary",
    },
    {
      title: lang === "pl" ? "Wyślij opinię" : "Send feedback",
      subtitle:
        lang === "pl"
          ? "Powiedz nam co myślisz o aplikacji"
          : "Tell us what you think about the app",
      iconName: "chatbubble-ellipses-outline",
      panel: "Feedback",
    },
    {
      title: lang === "pl" ? "Zgłoś błąd" : "Report a bug",
      subtitle:
        lang === "pl"
          ? "Coś nie działa? Daj nam znać"
          : "Notice something off? Let us know",
      iconName: "bug-outline",
      panel: "ReportBug",
    },
    {
      title: lang === "pl" ? "Twórcy" : "Credits",
      subtitle:
        lang === "pl"
          ? "Narzędzia i zasoby użyte w tym projekcie"
          : "Tools and assets used in this project",
      iconName: "people-outline",
      panel: "Credits",
    },
    {
      title: lang === "pl" ? "Lista zmian" : "Patch notes",
      subtitle:
        lang === "pl"
          ? "Zobacz co nowego, poprawiono lub dodano"
          : "See what's new, fixed or improved",
      iconName: "document-text-outline",
      panel: "PatchNotes",
    },
    {
      title: lang === "pl" ? "Ustawienia" : "Settings",
      subtitle:
        lang === "pl"
          ? "Spersonalizuj swoją aplikację"
          : "Customize your experience",
      iconName: "settings-outline",
      panel: "Settings",
    },
  ];
};

export const getSkillsData = async () => {
  const lang = await getLanguage();

  return [
    {
      category: lang === "pl" ? "Podstawowe zasady" : "Basic rules",
      description:
        lang === "pl"
          ? "Poznaj najważniejsze zasady."
          : "Get to know the essentials.",
      items: [
        {
          id: "0-0",
          name: "Poker",
          imagePath: require("../assets/skills/poker.png"),
        },
        {
          id: "0-1",
          name: "Blackjack",
          imagePath: require("../assets/skills/blackjack.jpg"),
        },
        {
          id: "0-2",
          name: lang === "pl" ? "Ruletka" : "Roulette",
          imagePath: require("../assets/skills/roulette.png"),
        },
        {
          id: "0-3",
          name:
            lang === "pl"
              ? "Ubezpieczenie i podwojenie"
              : "Insurance & Double Down",
          imagePath: require("../assets/skills/insurance.jpeg"),
        },
      ],
    },
    {
      category: lang === "pl" ? "Tasowania i cięcia" : "Shuffles and cuts",
      description:
        lang === "pl"
          ? "Proste i skuteczne techniki."
          : "Easy, effective and useful.",
      items: [
        {
          id: "1-0",
          name: lang === "pl" ? "Tasowanie typu Riffle" : "Riffle shuffle",
          imagePath: require("../assets/skills/riffleShuffle.gif"),
        },
        {
          id: "1-1",
          name: lang === "pl" ? "Tasowanie typu Faro" : "Faro shuffle",
          imagePath: require("../assets/skills/faroShuffle.gif"),
        },
        {
          id: "1-2",
          name: lang === "pl" ? "Cięcie typu Charlier" : "Charlier Cut",
          imagePath: require("../assets/skills/charlierCut.gif"),
        },
      ],
    },
    {
      category: lang === "pl" ? "Sztuczki" : "Flourishes",
      description:
        lang === "pl"
          ? "Dodaj styl do swojej gry."
          : "Step up your game with style.",
      items: [
        {
          id: "2-0",
          name: lang === "pl" ? "Card spring" : "Card spring",
          imagePath: require("../assets/skills/cardSpring.gif"),
        },
        {
          id: "2-1",
          name: lang === "pl" ? "Wachlarz talii" : "Card fan",
          imagePath: require("../assets/skills/cardFan.gif"),
        },
        {
          id: "2-2",
          name: lang === "pl" ? "Wstęgowe rozłożenie" : "Ribbon spread",
          imagePath: require("../assets/skills/ribbonSpread.gif"),
        },
      ],
    },
    {
      category: lang === "pl" ? "Strategia i decyzje" : "Strategy & decisions",
      description:
        lang === "pl" ? "Optymalizuj swoją grę." : "Optimize your play.",
      items: [
        {
          id: "3-0",
          name: lang === "pl" ? "Karta dealera" : "Dealer's Upcard",
          imagePath: require("../assets/skills/upcard.jpg"),
        },
        {
          id: "3-1",
          name: lang === "pl" ? "Tolerancja ryzyka" : "Risk Tolerance",
          imagePath: require("../assets/skills/tolerance.jpg"),
        },
        {
          id: "3-2",
          name: lang === "pl" ? "Strategia pokera" : "Poker Strategy",
          imagePath: require("../assets/skills/strategy.jpg"),
        },
      ],
    },
    {
      category: lang === "pl" ? "Karty w kulturze" : "Cards in Culture",
      description:
        lang === "pl"
          ? "Jak karty kształtowały historie."
          : "How games shaped stories.",
      items: [
        {
          id: "4-0",
          name: lang === "pl" ? "Filmy i popkultura" : "Movies & Pop culture",
          imagePath: require("../assets/skills/movies.jpg"),
        },
        {
          id: "4-1",
          name: lang === "pl" ? "Znani gracze" : "Famous players",
          imagePath: require("../assets/skills/wins.jpg"),
        },
      ],
    },
  ];
};

export const getArticlesData = async () => {
  const lang = await getLanguage();

  return [
    {
      id: "0-0",
      bannerPath: require("../assets/skills/poker.png"),
      title:
        lang === "pl"
          ? "Poker (Texas Hold'em) – najważniejsze zasady"
          : "Poker (Texas Hold'em) - the essentials",
      content:
        lang === "pl"
          ? "Poker to jedna z najpopularniejszych gier karcianych na świecie. Istnieje wiele odmian, ale najchętniej grane to *Texas Hold'em*.\n\n1. Cel gry\n\nWygraj pulę — wszystkie zakłady w jednej ręce. Możesz to zrobić, mając najlepszy układ lub skłaniając rywali do spasowania.\n\n2. Rozdanie kart\n\nKażdy gracz otrzymuje 2 karty zakryte (hole cards). Następnie rozdaje się 5 kart wspólnych (community cards):\n- 3 karty (flop)\n- 1 karta (turn)\n- 1 karta (river)\nKarty te są wspólne dla wszystkich.\n\n3. Rundy licytacji\n\nPo każdym etapie (deal, flop, turn, river) gracze mogą:\n- Call – wyrównać zakład\n- Raise – podbić zakład\n- Fold – spasować\n\n4. Ranking układów (od najsilniejszego):\n- Royal Flush\n- Straight Flush\n- Four of a Kind\n- Full House\n- Flush\n- Straight\n- Three of a Kind\n- Two Pair\n- One Pair\n- High Card\n\n5. Showdown i wygrana\n\nJeśli po ostatniej rundzie pozostaje więcej graczy, odkrywają karty. Wygrywa najlepszy pięciokartowy układ.\n\n**Szybka porada**\nPoker to nie tylko karty – to strategia i psychologia. Blef jest kluczem."
          : "Poker is one of the most popular card games in the world. There are many variations, but the most widely played is *Texas Hold'em*.\n\n1. Objective of the game\n\nWin the pot — the collection of all bets made during a hand. You can do this by having the best hand or getting all other players to fold.\n\n2. Dealing the cards\n\nEach player receives 2 hidden cards (called hole cards). Then 5 community cards are dealt face-up:\n- 3 cards (the flop)\n- 1 card (the turn)\n- 1 card (the river)\nThese are shared by everyone at the table.\n\n3. Betting rounds\n\nAfter each phase (deal, flop, turn, river), players can:\n- Call - match the current bet\n- Raise - increase the bet\n- Fold - give up the hand\n\n4. Hand rankings (from strongest to weakest)\n- Royal Flush\n- Straight Flush\n- Four of a Kind\n- Full House\n- Flush\n- Straight\n- Three of a Kind\n- Two Pair\n- One Pair\n- High Card\n\n5. Showdown and winning\n\nIf more than one player remains after the final round, they reveal their cards (showdown). The player with the best five-card hand wins.\n\n**Quick tip**\nPoker isn't just about the cards — it's also about strategy and psychology. Bluffing and reading your opponents are key parts of the game.",
      category: lang === "pl" ? "Podstawowe zasady" : "Basic rules",
      categoryTabColor: "lightgreen",
      date: "2025-06-26",
      videoLink: "null",
      videoAuthor: "null",
    },
    {
      id: "0-1",
      bannerPath: require("../assets/skills/blackjack.jpg"),
      title:
        lang === "pl"
          ? "Blackjack – najważniejsze zasady"
          : "Blackjack - the essentials",
      content:
        lang === "pl"
          ? "Blackjack (zwany też 21) to szybka gra karciana. Celem jest pokonanie krupiera nie przekraczając 21 punktów.\n\n1. Cel gry\n\nSpróbuj zbliżyć wartość swojej ręki do 21, ale nie przekroczyć tej liczby, i mieć więcej punktów niż krupier.\n\n2. Wartości kart\n\n- 2–10: wartość nominalna\n- Figury (J, Q, K): 10 punktów\n- As: 1 lub 11, w zależności co bardziej pomaga\n\n3. Rozdanie\n\n- Gracze otrzymują 2 karty odkryte\n- Krupier otrzymuje 1 odkrytą i 1 zakrytą\n\n4. Opcje gracza\n\n- Hit – dobrać kartę\n- Stand – spasować\n- Double down – podwoić zakład i dobrać dokładnie 1 kartę\n- Split – podzielić parę na dwie ręce (wymaga dodatkowego zakładu)\n\n5. Rozdanie krupiera\n\n- Krupier dobiera do co najmniej 17\n- Staje na 17 lub więcej\n\n6. Wygrana\n\n- Twoja ręka wyżej niż krupiera → wygrywasz\n- Blackjack (As + karta 10-punktowa) → najlepszy układ\n- Przekroczenie 21 → bust, przegrywasz\n- Jeśli krupier bustuje, a Ty nie → wygrywasz\n\n**Porada**\nNigdy nie dobieraj przy 17 lub więcej. Obserwuj kartę krupiera – daje wiele wskazówek."
          : "Blackjack (also known as 21) is a fast-paced card game where the goal is simple — beat the dealer without going over 21.\n\n1. Objective of the game\n\nYour job is to get a hand value as close to 21 as possible, without exceeding it, and higher than the dealer's hand.\n\n2. Card values\n\n- Number cards (2-10): face value\n- Face cards (J, Q, K): 10 points\n- Ace: 1 or 11 points, whichever helps more\n\n3. Starting the hand\n\n- Each player gets 2 face-up cards\n- The dealer gets 1 face-up and 1 face-down card\n\n4. Player options\n\nOn your turn, you can:\n- Hit - take another card\n- Stand - keep your current hand\n- Double down - double your bet and take one final card\n- Split - if you have two of the same card, split into two hands (extra bet required)\n\n5. Dealer's turn\n\nOnce all players finish, the dealer reveals their hidden card. The dealer:\n- Must hit until they reach at least 17\n- Must stand on 17 or higher\n\n6. Winning the game\n\n- If your hand is higher than the dealer's (without going over 21), you win\n- If you hit exactly 21 with your first two cards (Ace + 10-point card), it's called Blackjack — the best hand\n- If your hand exceeds 21, it's a bust — automatic loss\n- If the dealer busts and you don’t, you win\n\n**Quick tip**\nNever blindly hit on a high hand (17 or more). And always keep an eye on the dealer’s upcard — it reveals a lot about your odds.",
      category: lang === "pl" ? "Podstawowe zasady" : "Basic rules",
      categoryTabColor: "lightgreen",
      date: "2025-06-26",
      videoLink: "null",
      videoAuthor: "null",
    },
    {
      id: "0-2",
      bannerPath: require("../assets/skills/roulette.png"),
      title:
        lang === "pl"
          ? "Ruletka – najważniejsze zasady"
          : "Roulette - the essentials",
      content:
        lang === "pl"
          ? "Ruletka to gra losowa, w której zakładasz się, gdzie wyląduje kulka na kole. Zrozumienie rodzajów zakładów pomaga grać mądrzej.\n\n1. Cel gry\n\nPrzewidź numer na kole i postaw zakład.\n\n2. Koło i stół\n\n- Europejska: 37 przegródek (1–36 + 0)\n- Amerykańska: 38 (1–36 + 0 + 00)\n- Kolory naprzemiennie: czerwony, czarny; zero na zielono\n\n3. Zakłady wewnętrzne:\n- Straight up – jeden numer\n- Split – dwa sąsiadujące numery\n- Street – trzy w rzędzie\n- Corner – cztery w kwadracie\n- Six line – dwie linie po trzy numery\n\n4. Zakłady zewnętrzne:\n- Czerwone/Czarne\n- Parzyste/Nieparzyste\n- Niskie (1–18)/Wysokie (19–36)\n- Tuzy (1–12, 13–24, 25–36)\n- Kolumny\n\n5. Rozstrzygnięcie\n\nKrupier kręci kołem i umieszcza kulkę. Zakłady są rozliczane po zatrzymaniu kulki.\n\n6. Wypłaty\n\n- Precyzyjne zakłady → wysokie kursy (35:1)\n- Szersze zakłady → niższe kursy, ale większe szanse\n\n**Porada**\nWybieraj europejską ruletkę – pojedyncze zero daje lepsze szanse."
          : "Roulette is a casino game where players bet on where a ball will land on a spinning wheel. It's all about chance, but understanding the bets can help you play smarter.\n\n1. Objective of the game\n\nPredict where the ball will land on the roulette wheel and place your bets accordingly. You win if your bet matches the outcome.\n\n2. The wheel and the table\n\n- European roulette has 37 pockets (1-36 + single 0)\n- American roulette has 38 pockets (1-36 + single 0 and double 00)\n- The numbers are alternately colored red and black, with zero(s) in green\n\n3. Types of bets\n\n- *Inside bets* - placed on specific numbers or small groups:\n • Straight up - bet on one number\n • Split - two adjacent numbers\n • Street - row of three numbers\n • Corner - block of four numbers\n • Six line - two adjacent rows\n\n- *Outside bets* - broader categories:\n • Red or Black\n • Odd or Even\n • 1-18 (Low) or 19-36 (High)\n • Dozens (1-12, 13-24, 25-36)\n • Columns\n\n4. The spin\n\nThe dealer spins the wheel in one direction and the ball in the other. Once the ball lands in a pocket, bets are settled.\n\n5. Payouts\n\n- The more specific your bet, the higher the payout (e.g., 35:1 for a single number)\n- Broader bets offer lower payouts but higher chances of winning\n\nQuick tip\n\nStick to European roulette if possible — that single zero gives you slightly better odds than the American double-zero version.",
      category: lang === "pl" ? "Podstawowe zasady" : "Basic rules",
      categoryTabColor: "lightgreen",
      date: "2025-06-26",
      videoLink: "null",
      videoAuthor: "null",
    },
    {
      id: "0-3",
      bannerPath: require("../assets/skills/insurance.jpeg"),
      title:
        lang === "pl"
          ? "Ubezpieczenie i podwojenie — kiedy warto zwiększyć zakład, a kiedy się zabezpieczyć"
          : "Insurance & Double Down - when to double your bet, and when to protect it",
      content:
        lang === "pl"
          ? "W blackjacku możesz wziąć ubezpieczenie lub podwoić zakład. Oba ruchy służą różnym celom:\n\n1. Ubezpieczenie\n- Gdy krupier ma odkrytego Asa, możesz postawić ubezpieczenie (połowa Twojego zakładu).\n- Jeśli krupier ma blackjacka, ubezpieczenie płaci 2:1 – chroni przed przegraną głównego zakładu.\n- Jeśli nie ma blackjacka, tracisz ubezpieczenie i grasz dalej.\n\n2. Podwojenie zakładu (Double Down)\n- Po otrzymaniu pierwszych dwóch kart możesz podwoić zakład i dobrać dokładnie jedną kartę.\n- Najlepiej, gdy masz 10 lub 11, a krupier pokazuje słabą kartę (2–6).\n\n**Porada**\nUbezpieczenie jest opłacalne tylko przy liczeniu kart. Podwajaj zakład przy 10–11, gdy krupier słaby."
          : "In blackjack, understanding advanced actions like Insurance and Double Down can improve your strategy and help you make smarter decisions at the table.\n\n1. What is Insurance?\n\n- Insurance is a side bet offered when the dealer shows an Ace.\n- It's a bet that the dealer's hidden card is worth 10 — meaning they have Blackjack.\n- The insurance bet costs half your original wager.\n\nIf the dealer has Blackjack:\n- Your insurance bet pays 2:1, softening the loss of your main bet.\n\nIf the dealer doesn't:\n- You lose the insurance bet and continue with the round.\n\n2. What is Double Down?\n\n- Double Down lets you double your original bet in exchange for committing to receive only one more card.\n- It's usually allowed only after your initial two cards.\n\nBest situations to Double Down:\n- You have a total of 10 or 11, and the dealer shows a weak card (2–6).\n- The odds favor you drawing a strong card and beating the dealer.\n\nExample:\n- You’re dealt 6 + 5, and the dealer shows a 4.\n- You double your bet, receive one more card — a King.\n- Your final total is 21.\n\n**Quick tip**\nDouble Down is high risk but high reward. Learn when it’s statistically smart — and never forget: you only get one card!",
      category: lang === "pl" ? "Podstawowe zasady" : "Basic rules",
      categoryTabColor: "lightgreen",
      date: "2025-07-14",
      videoLink: "null",
      videoAuthor: "null",
    },
    // kolejne artykuły można kontynuować analogicznie...
    {
      id: "1-0",
      bannerPath: require("../assets/skills/riffleShuffle.gif"),
      title:
        lang === "pl"
          ? "Tasowanie typu Riffle – klasyczna technika tasowania"
          : "The Riffle Shuffle - classic shuffle technique",
      content:
        lang === "pl"
          ? "Riffle shuffle to najbardziej rozpoznawalny sposób tasowania — używany przez magików, krupierów i graczy.\n\n1. Cel\n\nRównomierne przeplatanie dwóch połówek talii w celu losowej zmiany kolejności kart.\n\n2. Ustawienie\n\nTrzymaj połówkę talii w każdej ręce:\n- Kciuki na górnej krawędzi\n- Palce pod spodem\n- Karty skierowane grzbietami do siebie\n\n3. Tasowanie\n\n- Nachyl obie połówki lekko w dół\n- Pozwól rogom opadać kartę po karcie, przeplatając je\n- Połącz dwie połówki w jedną talię\n\n4. Opcjonalnie: Bridge Finish\n\n- Wygnij talię lekko w górę\n- Zwolnij napięcie i pozwól kartom efektownie się połączyć\n\n**Porada**\nRówny rytm obu kciuków = czysty efekt wizualny."
          : "The riffle shuffle is the most recognizable and satisfying way to mix cards — used by magicians, casino dealers, and card players alike.\n\n1. Objective\n\nEvenly interlace two halves of a deck to randomize the card order and impress with clean technique.\n\n2. Setup\n\nHold half the deck in each hand:\n- Thumbs on top edge\n- Fingers supporting the bottom\n- Backs of the cards facing each other\n\n3. The shuffle\n\n- Tilt both halves slightly downward\n- Let the corners drop card by card, interleaving them\n- Push the two halves together into one deck\n\n4. Optional: Bridge Finish\n\n- Bend the deck upward slightly\n- Release the tension and let the cards cascade together neatly\n\n**Quick tip**\nPractice the release with both thumbs at the same rhythm — the smoother the fall, the cleaner the shuffle.",
      category: lang === "pl" ? "Tasowania i cięcia" : "Shuffles and cuts",
      categoryTabColor: "yellow",
      date: "2025-06-26",
      videoLink: "https://www.youtube.com/watch?v=-7BYtk1rLpY&",
      videoAuthor: "Josep Vidal",
    },
    {
      id: "1-1",
      bannerPath: require("../assets/skills/faroShuffle.gif"),
      title:
        lang === "pl"
          ? "Tasowanie typu Faro – idealne przeplatanie"
          : "The Faro Shuffle - Perfect Interlace Shuffle",
      content:
        lang === "pl"
          ? "Tasowanie Faro to precyzyjna technika polegająca na perfekcyjnym przeplocie dwóch połówek talii — karta po karcie.\n\n1. Cel\n\nPrzepleć dwie połowy talii — idealnie naprzemiennie — tworząc niemal doskonałe tasowanie.\n\n2. Ustawienie\n\n- Podziel talię na dwie równe części (po 26 kart)\n- Trzymaj każdą połówkę w ręku, krótkimi bokami zwróconymi do siebie\n- Delikatnie zbiegnij wewnętrzne rogi, by ułatwić połączenie\n\n3. Tasowanie\n\n- Powoli i równomiernie wciskaj rogi obu połówek\n- Karty powinny się przeplatać na przemian (po jednej z każdej części)\n\n4. Opcjonalnie: In-Faro vs. Out-Faro\n\n- *In-Faro*: górna karta pozostaje na górze\n- *Out-Faro*: druga karta staje się nową górną — używane w magii i kontrolowaniu układu\n\n**Porada**\nNajlepiej działa ze świeżą lub lekko zużytą talią. Krzywe lub klejące się karty utrudniają perfekcyjny przeplot."
          : "The faro shuffle is a precision technique where the deck is split exactly in half and then perfectly interwoven, one card at a time, from each half.\n\n1. Objective\n\nInterlace the two halves of a deck perfectly — card by card — creating a nearly flawless shuffle often used in magic and gambling demonstrations.\n\n2. Setup\n\n- Split the deck into two equal halves (26 cards each)\n- Hold one half in each hand, short sides facing each other\n- Slightly bevel the inner corners for alignment\n\n3. The shuffle\n\n- Gently press the corners of both halves together\n- Cards should alternate exactly (one from each half)\n- Push the halves fully into one another, completing the interlace\n\n4. Optional: In-Faro vs. Out-Faro\n\n- *In-Faro*: top card stays on top\n- *Out-Faro*: second card becomes the new top — used for specific card placement effects\n\n**Quick tip**\nUse a newer or slightly worn deck for best results — perfect alignment is nearly impossible with warped or sticky cards.",
      category: lang === "pl" ? "Tasowania i cięcia" : "Shuffles and cuts",
      categoryTabColor: "yellow",
      date: "2025-06-26",
      videoLink: "https://www.youtube.com/watch?v=RXhNA0xLRgY&",
      videoAuthor: "Hester23BearsCH",
    },
    {
      id: "1-2",
      bannerPath: require("../assets/skills/charlierCut.gif"),
      title:
        lang === "pl"
          ? "Cięcie typu Charlier – klasyczne cięcie jedną ręką"
          : "Charlier Cut - the classic one-handed cut",
      content:
        lang === "pl"
          ? "Cięcie Charlier to podstawowa sztuczka jednoręczna, w której talia jest dzielona i składana przy użyciu jednej ręki.\n\n1. Cel\n\nRozdzielenie talii w jednej ręce i ponowne złożenie jej bez gubienia kart — efekt płynności i elegancji.\n\n2. Uchwyt\n\n- Trzymaj talię w straddle grip (kciuk na jednej krawędzi, mały palec na przeciwnej, pozostałe palce po bokach)\n- Delikatnie przechyl rękę, by grawitacja pomagała w ruchu\n\n3. Ruch\n\n- Zwolnij dolną część talii za pomocą kciuka\n- Unieś górną część wskazującym palcem\n- Dolna część opada w przestrzeń dłoni\n- Opuszczasz górną część, by zamknąć cięcie\n\n4. Porady\n\n- Chwyt musi być luźny, ale kontrolowany\n- Naprężenie palców kieruje ruchem kart\n- Zacznij powoli — jakość ruchu ważniejsza niż tempo\n\n**Porada**\nCharlier to punkt wyjścia do bardziej zaawansowanych cięć — jak już wejdzie w pamięć mięśniową, otwiera wiele drzwi."
          : "The Charlier Cut is a fundamental one-handed flourish where the deck is cleanly cut into two halves and reassembled — all using just one hand.\n\n1. Objective\n\nSplit the deck in one hand and close it again without dropping cards, creating a seamless and elegant cut motion.\n\n2. Setup\n\n- Hold the deck in straddle grip (thumb on one edge, pinky on opposite edge, other fingers on the sides)\n- Tilt your hand slightly to use gravity in your favor\n\n3. The motion\n\n- Use your thumb to release the bottom half of the deck downward\n- Lift the top packet with your index finger\n- Let the bottom packet fall into your palm space\n- Lower the top packet back down to complete the cut\n\n4. Key tips\n\n- Keep your grip relaxed but controlled\n- Use subtle finger tension to guide and contain the packets\n- Start slow — clean movement matters more than speed\n\n**Quick tip**\nThis move is a springboard to more complex one-handed cuts — once it’s in your muscle memory, the possibilities open up.",
      category: lang === "pl" ? "Tasowania i cięcia" : "Shuffles and cuts",
      categoryTabColor: "yellow",
      date: "2025-06-26",
      videoLink: "https://www.youtube.com/watch?v=dNAkNsbxMcI&",
      videoAuthor: "Josep Vidal",
    },
    {
      id: "2-0",
      bannerPath: require("../assets/skills/cardSpring.gif"),
      title:
        lang === "pl"
          ? "Rozpylenie kart – efektowna prezentacja"
          : "Card Spring - the flashy crowd-pleaser",
      content:
        lang === "pl"
          ? "Rozpylenie kart to widowiskowa sztuczka, w której karty przeskakują z jednej dłoni do drugiej tworząc łuk.\n\n1. Cel\n\nWypuść strumień kart z jednej ręki do drugiej w płynnym łuku, pokazując kontrolę i styl.\n\n2. Ustawienie\n\n- Trzymaj talię pionowo w dominującej ręce\n- Kciuk na górze, palce na dole — lekko ściśnięte\n- Druga ręka otwarta około 30 cm dalej\n\n3. Rozpylenie\n\n- Zwalniaj napięcie kciuka stopniowo\n- Karty powinny wyskakiwać pojedynczo, wpadając do drugiej dłoni\n\n4. Porady\n\n- Używaj lekko zużytej talii — nowe są zbyt sztywne\n- Zacznij blisko, aby uniknąć bałaganu\n\n**Porada**\nNa początku karty będą lecieć gdzie popadnie — powtarzanie to klucz do kontroli."
          : "The Card Spring is a dramatic flourish where cards arc through the air in a controlled cascade from one hand to the other. It’s bold, visual, and instantly gets attention.\n\n1. Objective\n\nShoot a stream of cards from one hand to the other in a smooth, even arc — showing control, confidence, and flair.\n\n2. Setup\n\n- Hold the full deck vertically in your dominant hand\n- Apply pressure with your thumb at the top and fingers at the bottom (like compressing a spring)\n- Position your receiving hand about 30 cm away, open and ready to catch\n\n3. The spring\n\n- Gradually release pressure with your thumb\n- Cards should fly out one by one, landing in your other hand\n\n**Quick tip**\nDon’t worry if cards scatter at first — control comes with repetition.",
      category: lang === "pl" ? "Sztuczki" : "Flourishes",
      categoryTabColor: "red",
      date: "2025-06-26",
      videoLink: "https://www.youtube.com/watch?v=m01QDhoPhlY&",
      videoAuthor: "Hester23BearsCH",
    },
    {
      id: "2-1",
      bannerPath: require("../assets/skills/cardFan.gif"),
      title:
        lang === "pl"
          ? "Wachlarz kart – elegancki ruch prezentacyjny"
          : "Card Fan - the elegant flourish that spreads the deck",
      content:
        lang === "pl"
          ? "Wachlarz kart to klasyczna prezentacja talii — rozłożona w równym łuku w dłoni.\n\n1. Cel\n\nRozłożyć karty w płynny łuk — twarzą lub rewersem do widza.\n\n2. Ustawienie\n\n- Trzymaj talię w dominującej ręce\n- Kciuk na górze, palce pod spodem\n- Lekko pochyl talię na zewnątrz\n\n3. Ruch wachlarza\n\n- Drugą ręką (lub tym samym kciukiem) przesuń po górnej krawędzi\n- Karty rozłożą się równomiernie w łuku\n\n4. Porady\n\n- Użyj zużytej talii — nowa może się kleić\n- Można też robić wachlarz jedną ręką — wymaga treningu\n\n**Porada**\nDla najlepszego efektu użyj pudru lub odpowiedniego rozgrzania kart."
          : "The Card Fan is a visual staple in cardistry and magic, creating a smooth arc of overlapping cards in your hand. It shows control, flair, and presentation skills.\n\n1. Objective\n\nSpread the cards in a clean, even arc using one or two hands — showcasing the faces or backs in a stylish fan shape.\n\n2. Setup\n\n- Hold the deck in your dominant hand\n- Angle the deck slightly downward and outward\n\n3. The fan\n\n- Use your thumb to apply pressure and slide across the top edge\n- Cards should cascade smoothly into an arc\n\n**Quick tip**\nUse a smooth, slightly broken-in deck with clean edges. Fanning powder can help with sticky cards.",
      category: lang === "pl" ? "Sztuczki" : "Flourishes",
      categoryTabColor: "red",
      date: "2025-06-26",
      videoLink: "https://www.youtube.com/watch?v=O-mo1ErJF60&",
      videoAuthor: "Josep Vidal",
    },
    {
      id: "2-2",
      bannerPath: require("../assets/skills/ribbonSpread.gif"),
      title:
        lang === "pl"
          ? "Rozsunięcie wstęgowe – technika na stole"
          : "Ribbon Spread - the smooth table spread",
      content:
        lang === "pl"
          ? "Rozsunięcie wstęgowe to klasyczna technika prezentacji kart na stole — długi, równy łuk używany w magii i pokazach.\n\n1. Cel\n\nRozłożyć całą talię na stole w płynnej, efektownej linii\n\n2. Ustawienie\n\n- Użyj gładkiej powierzchni (np. mata)\n- Trzymaj talię jedną ręką, krótkim bokiem w dół\n- Lekki nacisk palcami wskazującym i środkowym\n\n3. Rozsunięcie\n\n- Przeciągnij talię po stole w łuku\n- Zachowaj równy nacisk dla regularnego rozłożenia\n\n4. Opcjonalnie: Flip\n\n- Naciśnij na jeden koniec i delikatnie podnieś, by przewrócić cały wachlarz\n\n**Porada**\nLepiej działa przy rozgrzanej talii i stole o gładkiej fakturze."
          : "The Ribbon Spread is a classic flourish performed on a table where the deck is fanned out in a long, even arc, showcasing the cards and setting up for magical reveals.\n\n1. Objective\n\nSpread all cards across the table in one fluid motion\n\n2. Setup\n\n- Use a smooth surface\n- Hold the deck face-down at one edge\n\n3. The spread\n\n- Pull the deck sideways in a sweeping arc\n- Maintain even pressure for smooth spacing\n\n4. Optional: Flip\n\n- Press and flick to flip the spread over\n\n**Quick tip**\nSticky deck? Lightly bend and break in the cards beforehand. Smooth hands and surface make the difference.",
      category: lang === "pl" ? "Sztuczki" : "Flourishes",
      categoryTabColor: "red",
      date: "2025-06-26",
      videoLink: "https://www.youtube.com/watch?v=GhXxtp27Qhc&",
      videoAuthor: "Josep Vidal",
    },
    {
      id: "3-0",
      bannerPath: require("../assets/skills/upcard.jpg"),
      title:
        lang === "pl"
          ? "Karta dealera — jak ją czytać i reagować"
          : "Dealer’s Upcard — how to read and react",
      content:
        lang === "pl"
          ? "Jednym z najważniejszych elementów strategii blackjacka jest analiza odkrytej karty krupiera — tzw. „upcard”. Od niej zależy wiele Twoich decyzji.\n\n1. Słabe vs. mocne karty\n\n- Słabe: 2–6 → duża szansa, że krupier przekroczy 21\n- Mocne: 7–As → wyższe prawdopodobieństwo dobrej ręki krupiera\n\n2. Dostosuj grę\n\n- Krupier pokazuje 2–6:\n  → Stój nawet przy 12–16 — pozwól mu zaryzykować\n  → Unikaj ryzykownego dobierania\n\n- Krupier pokazuje 7–As:\n  → Bądź agresywny — dobieraj nawet przy słabych rękach\n  → Podwajaj zakład przy sumie 10–11\n\n**Porada**\nAs u krupiera to najgorszy scenariusz — ale nie panikuj, po prostu graj bardziej zdecydowanie."
          : "One of the most important elements in blackjack strategy is analyzing the dealer’s face-up card — known as the upcard. It dramatically affects how you should play your hand.\n\n1. Weak vs. Strong Upcards\n\n- Weak: 2 through 6 → high chance the dealer will bust\n- Strong: 7 through Ace → higher odds the dealer will finish strong\n\n2. Adjusting Your Play\n\n- Dealer shows 2–6:\n  → You can stand on lower totals (12–16) and let the dealer risk busting\n\n- Dealer shows 7–Ace:\n  → You need to be more aggressive — hitting even on hands like 16\n  → Consider doubling down on 10 or 11\n\n**Quick tip**\nIf the dealer shows an Ace, don’t panic — but know you’re up against the best possible starting card.",
      category: lang === "pl" ? "Strategia i decyzje" : "Strategy & Decisions",
      categoryTabColor: "gold",
      date: "2025-07-14",
      videoLink: "null",
      videoAuthor: "null",
    },
    {
      id: "3-1",
      bannerPath: require("../assets/skills/tolerance.jpg"),
      title:
        lang === "pl"
          ? "Tolerancja ryzyka — gra odważna kontra bezpieczna"
          : "Risk Tolerance — playing to win vs. playing it safe",
      content:
        lang === "pl"
          ? "Każdy gracz blackjacka ma inny stosunek do ryzyka — jedni gonią wygrane, inni unikają strat. Poznanie własnej tolerancji ryzyka to klucz do strategii.\n\n1. Ryzykanci\n\n- Często podwajają i dzielą ręce\n- Dobierają nawet przy słabszych rękach\n- Akceptują przegrane jako element długoterminowego zysku\n\n2. Zachowawczy gracze\n\n- Podwajają tylko gdy matematyka jest oczywista\n- Wolą stać przy granicznych rękach\n- Skupiają się na minimalizacji strat\n\n3. Adaptacja\n\n- Zmieniaj styl gry w zależności od sytuacji\n- Bądź odważniejszy przy słabym krupierze\n- Graj ostrożnie w złej passie\n\n**Porada**\nNie ma jednej idealnej strategii — poznaj siebie. Dobra gra to 50% matematyka, 50% nastawienie."
          : "Every blackjack player has a different approach to risk — some chase big wins, others avoid big losses. Understanding your risk tolerance helps you choose strategies that suit your personality.\n\n1. Risky Players\n\n- Tend to double down and split aggressively\n- Hit more often — even on borderline hands\n- Accept busts as part of long-term gain\n\n2. Conservative Players\n\n- Avoid doubling unless odds are clear\n- Prefer standing on marginal hands\n- Focus on minimizing loss over maximizing gain\n\n3. Adaptation is key\n\n- Shift your approach based on table dynamics\n- Be aggressive when the dealer is weak\n- Tighten up when you’re on a losing streak\n\n**Quick tip**\nThere’s no “perfect” strategy without knowing yourself. Good blackjack is 50% math — and 50% mindset.",
      category: lang === "pl" ? "Strategia i decyzje" : "Strategy & Decisions",
      categoryTabColor: "gold",
      date: "2025-07-14",
      videoLink: "null",
      videoAuthor: "null",
    },
    {
      id: "3-2",
      bannerPath: require("../assets/skills/strategy.jpg"),
      title:
        lang === "pl"
          ? "Strategia pokera — graj przeciwnikiem, nie kartami"
          : "Poker Strategy — playing the player, not the cards",
      content:
        lang === "pl"
          ? "W pokerze znajomość zasad to dopiero początek. Sukces zależy od strategii i psychologii — graj przeciwnikiem, nie tylko kartami.\n\n1. Pozycja przy stole\n\n- Wczesna: graj ostrożnie\n- Późna: więcej swobody, możliwość blefowania\n\n2. Dobór rąk\n\n- Nie graj każdej ręki — cierpliwość się opłaca\n- Wybieraj pary, suited connectory, dobre ręce po flopie\n\n3. Wielkość zakładów\n\n- Małe: kontrola puli, zachęcanie do sprawdzenia\n- Duże: nacisk na rywala, ochrona mocnej ręki\n- Mieszaj style, by być nieprzewidywalnym\n\n4. Blefuj mądrze\n\n- Blefuj, gdy plansza na to pozwala — nie na oślep\n- Buduj historię ruchem\n- Wiedz, kto potrafi spasować\n\n5. Adaptuj się\n\n- Obserwuj styl rywali: tight, loose, pasywni?\n- Zmieniaj swój styl\n- Wykorzystaj obraz przy stole (wyglądaj słabo, uderz mocno)\n\n**Porada**\nPoker to 20% karty, 80% informacje. Liczy się to, co rywal myśli, że masz — i jak go do tego przekonasz."
          : "In poker, knowing the rules is just the beginning. True success comes from applying strategic thinking and psychological tactics — playing opponents, not just your hand.\n\n1. Know your position\n\n- Early position: play tight\n- Late position: more freedom to bluff or control\n\n2. Hand selection\n\n- Be patient — don't play every hand\n- Favor pairs, suited connectors, and hands with potential\n\n3. Bet sizing\n\n- Small bets: control the pot\n- Big bets: pressure and protect\n- Mix it up to stay unpredictable\n\n4. Bluff wisely\n\n- Bluff when the board supports it\n- Tell a story with your actions\n- Know your target — don’t bluff a calling station\n\n5. Table adaptation\n\n- Read opponent patterns\n- Shift gears — go tight, then loose\n- Use table image to your advantage\n\n**Quick tip**\nPoker is 20% cards, 80% information. The real game is in convincing others of the story you're telling.",
      category: lang === "pl" ? "Strategia i decyzje" : "Strategy & Decisions",
      categoryTabColor: "gold",
      date: "2025-07-14",
      videoLink: "null",
      videoAuthor: "null",
    },
    {
      id: "4-0",
      bannerPath: require("../assets/skills/movies.jpg"),
      title:
        lang === "pl"
          ? "Blackjack i poker w filmach i popkulturze"
          : "Blackjack & Poker in Movies and Pop Culture",
      content:
        lang === "pl"
          ? "Poker i blackjack od dawna fascynują twórców filmów i kultury popularnej. Od dramatycznych pojedynków po sceny blefu — karty symbolizują ryzyko, władzę i psychologię.\n\n1. Znane sceny filmowe\n\n- *Casino Royale* (2006): Bond gra w Texas Hold'em na wysokie stawki\n- *21* (2008): prawdziwa historia zespołu MIT w grze w blackjacka\n- *Rounders* (1998): kultowy film o pokerze i czytaniu przeciwników\n\n2. Symbolika\n\n- Karty oznaczają los, bunt i kontrolę — np. karta Jokera w *Batmanie*\n- Stoły pokerowe budują napięcie i pokazują inteligencję postaci\n\n3. Wpływ na rzeczywistość\n\n- Filmy zachęciły miliony do spróbowania pokera i blackjacka\n- Turnieje jak WSOP zyskały popularność po 2003 roku\n\n**Porada**\nGdy oglądasz scenę pokerową – zapytaj: „Czy to realna strategia czy hollywoodzki dramat?” Zwykle to trochę jedno i drugie."
          : "Card games like poker and blackjack have long captured the imagination of filmmakers, writers, and pop culture icons. From dramatic showdowns to clever bluffing scenes — cards often symbolize risk, power, and mind games.\n\n1. Famous Movie Scenes\n\n- *Casino Royale* (2006): James Bond plays high-stakes Texas Hold'em\n- *21* (2008): Based on MIT Blackjack Team’s real-life card counting\n- *Rounders* (1998): A cult poker film full of underground games\n\n2. Symbolism in Pop Culture\n\n- Cards represent chance, rebellion, and control — like Joker’s calling card in *Batman*\n- Poker tables test intelligence, nerve, and desperation\n\n3. Real-world Impact\n\n- Movies inspired millions to try card games\n- Poker tournaments exploded in popularity after 2003\n\n**Quick tip**\nWhen watching a poker scene, ask: “Is this real strategy or Hollywood show?” Usually it's a mix.",
      category: lang === "pl" ? "Karty w kulturze" : "Cards in Culture",
      categoryTabColor: "indianred",
      date: "2025-07-14",
      videoLink: "null",
      videoAuthor: "null",
    },
    {
      id: "4-1",
      bannerPath: require("../assets/skills/wins.jpg"),
      title:
        lang === "pl"
          ? "Legendarni gracze — ikony blackjacka i pokera"
          : "Legendary Players — icons of poker and blackjack",
      content:
        lang === "pl"
          ? "Gry karciane nie tylko wyłaniają zwycięzców — tworzą legendy. Od matematycznych mózgów po odważnych ryzykantów, niektórzy gracze na zawsze zmienili oblicze blackjacka i pokera.\n\n1. Edward O. Thorp\n\n- Autor *Beat the Dealer*, pionier liczenia kart w blackjacku\n\n2. Stu Ungar\n\n- Genialny gracz pokera, trzykrotny zwycięzca WSOP\n\n3. Annie Duke\n\n- Psycholog i pokerzystka, mistrzyni WSOP, ekspertka teorii decyzji\n\n4. Don Johnson\n\n- Pokonał kasyna Atlantic City na $15 milionów dzięki negocjacjom i strategii\n\n5. Doyle Brunson\n\n- „Texas Dolly” – legenda pokera, autor *Super System*, 50 lat kariery\n\n**Porada**\nCi gracze zostawili coś więcej niż pieniądze — zostawili strategie, historię i inspirację."
          : "Card games don’t just create winners — they forge legends. From analytical geniuses to bold risk-takers, some players reshaped poker and blackjack forever.\n\n1. Edward O. Thorp\n\n- Author of *Beat the Dealer*, pioneer of blackjack card counting\n\n2. Stu Ungar\n\n- “The Kid” — 3-time WSOP champ, brilliant but troubled\n\n3. Annie Duke\n\n- Psychologist turned poker pro, WSOP winner, decision science expert\n\n4. Don Johnson\n\n- Beat Atlantic City casinos for $15M with sharp negotiation and smart play\n\n5. Doyle Brunson\n\n- “Texas Dolly” — poker legend and author of *Super System*, played for over 50 years\n\n**Quick tip**\nGreat players leave more than bankrolls — they leave playbooks, stories, and inspiration.",
      category: lang === "pl" ? "Karty w kulturze" : "Cards in Culture",
      categoryTabColor: "indianred",
      date: "2025-07-14",
      videoLink: "null",
      videoAuthor: "null",
    },
  ];
};

// Database.ts

export const getPatchNotesData = async () => {
  const lang = await getLanguage();

  return [
    {
      version: "0.9.0",
      date: "2025-07-14",
      description:
        lang === "pl"
          ? "Cieszymy się, że możemy przedstawić pierwszą wersję beta naszego projektu — v0.9.0! Ta odsłona rozpoczyna naszą podróż i została przygotowana z dbałością, by położyć fundamenty pod przyszłe funkcje.\n\nDziękujemy za zainteresowanie i zachęcamy do dzielenia się opiniami. Twoje uwagi pomogą kształtować dalszy rozwój aplikacji!\n\nW tej wersji znajdziesz:"
          : "We're excited to introduce the first beta release of our project — v0.9.0! This version marks the beginning of our journey and is built with care to lay the groundwork for future development.\n\nWe appreciate your interest in the project and encourage you to share your feedback. Your input will help shape the app as it evolves!\n\nThis version includes:",
      changes:
        lang === "pl"
          ? [
              "Śledzenie rozgrywek w blackjacka i pokera",
              "Narzędzie do sprawdzania układu kart",
              "Artykuły edukacyjne dla uczących się",
              "Minimalistyczny interfejs dla przejrzystości",
              "Kanał opinii do zbierania Twoich uwag",
            ]
          : [
              "Blackjack and poker tracking",
              "Hand checking tool",
              "Informative articles for learning",
              "A minimalist interface for a clean experience.",
              "Feedback channel integration to gather your insights.",
            ],
    },
  ];
};

export const getGlossaryData = async () => {
  const lang = await getLanguage();

  return [
    {
      title: lang === "pl" ? "Poker" : "Poker",
      data: [
        {
          term: "Bluff",
          definition:
            lang === "pl"
              ? "Zagranie mające na celu zmylenie przeciwnika poprzez obstawienie słabej ręki jakby była silna."
              : "A deceptive bet made with a weak hand to mislead opponents.",
        },
        {
          term: "Flop",
          definition:
            lang === "pl"
              ? "Pierwsze trzy wspólne karty wykładane na stół w Texas Hold'em."
              : "The first three community cards dealt in Texas Hold'em.",
        },
        {
          term: "All-In",
          definition:
            lang === "pl"
              ? "Postawienie wszystkich dostępnych żetonów w jednej rundzie."
              : "Betting all your remaining chips in a single hand.",
        },
        {
          term: "Check",
          definition:
            lang === "pl"
              ? "Zrezygnowanie z zakładu, jednocześnie pozostając w grze."
              : "Declining to bet while keeping your cards.",
        },
        {
          term: "River",
          definition:
            lang === "pl"
              ? "Piąta i ostatnia wspólna karta wykładana w Texas Hold'em."
              : "The fifth and final community card dealt in Texas Hold'em.",
        },
        {
          term: "Turn",
          definition:
            lang === "pl"
              ? "Czwarta wspólna karta wykładana w Texas Hold'em."
              : "The fourth community card dealt in Texas Hold'em.",
        },
        {
          term: "Call",
          definition:
            lang === "pl"
              ? "Wyrównanie obecnego najwyższego zakładu."
              : "Matching the current highest bet.",
        },
        {
          term: "Raise",
          definition:
            lang === "pl"
              ? "Podbicie aktualnego zakładu."
              : "Increasing the current bet.",
        },
        {
          term: "Fold",
          definition:
            lang === "pl"
              ? "Spasowanie — zrzucenie kart i rezygnacja z dalszej gry."
              : "Discarding your hand and forfeiting the round.",
        },

        {
          term: lang === "pl" ? "Poker królewski" : "Royal Flush",
          definition:
            lang === "pl"
              ? "Najwyższy możliwy układ: As, Król, Dama, Walet i 10 w jednym kolorze."
              : "The highest possible hand: Ace, King, Queen, Jack, and 10 of the same suit.",
        },
        {
          term: lang === "pl" ? "Poker" : "Straight Flush",
          definition:
            lang === "pl"
              ? "Pięć kolejnych kart tego samego koloru, np. 6-7-8-9-10 kier."
              : "Five consecutive cards of the same suit, e.g. 6-7-8-9-10 of hearts.",
        },
        {
          term: lang === "pl" ? "Kareta" : "Four of a Kind",
          definition:
            lang === "pl"
              ? "Cztery karty o tej samej wartości, np. cztery króle."
              : "Four cards of the same rank, e.g. four Kings.",
        },
        {
          term: lang === "pl" ? "Full" : "Full House",
          definition:
            lang === "pl"
              ? "Trójka i para, np. trzy ósemki i dwie damy."
              : "Three cards of one rank and two of another, e.g. three 8s and two Queens.",
        },
        {
          term: lang === "pl" ? "Kolor" : "Flush",
          definition:
            lang === "pl"
              ? "Pięć kart w tym samym kolorze, ale nie po kolei."
              : "Five cards of the same suit, not in sequence.",
        },
        {
          term: lang === "pl" ? "Strit" : "Straight",
          definition:
            lang === "pl"
              ? "Pięć kolejnych kart w różnych kolorach, np. 4-5-6-7-8."
              : "Five consecutive cards of any suits, e.g. 4-5-6-7-8.",
        },
        {
          term: lang === "pl" ? "Trójka" : "Three of a Kind",
          definition:
            lang === "pl"
              ? "Trzy karty o tej samej wartości, np. trzy dziesiątki."
              : "Three cards of the same rank, e.g. three 10s.",
        },
        {
          term: lang === "pl" ? "Dwie pary" : "Two Pair",
          definition:
            lang === "pl"
              ? "Dwie różne pary kart, np. dwie siódemki i dwie damy."
              : "Two pairs of cards, e.g. two 7s and two Queens.",
        },
        {
          term: lang === "pl" ? "Para" : "One Pair",
          definition:
            lang === "pl"
              ? "Jedna para kart o tej samej wartości, np. dwie dziewiątki."
              : "One pair of cards of the same rank, e.g. two 9s.",
        },
        {
          term: lang === "pl" ? "Wysoka karta" : "High Card",
          definition:
            lang === "pl"
              ? "Brak żadnego układu — wygrywa najwyższa karta w ręce."
              : "No poker hand formed — highest card wins.",
        },
      ],
    },
    {
      title: lang === "pl" ? "Blackjack" : "Blackjack",
      data: [
        {
          term: "Hit",
          definition:
            lang === "pl"
              ? "Dobranie dodatkowej karty do swojej ręki."
              : "Requesting another card to improve your hand.",
        },
        {
          term: "Stand",
          definition:
            lang === "pl"
              ? "Zatrzymanie obecnej ręki bez dobierania kolejnych kart."
              : "Ending your turn without taking more cards.",
        },
        {
          term: "Bust",
          definition:
            lang === "pl"
              ? "Przekroczenie 21 punktów — automatyczna przegrana."
              : "Exceeding 21 points, resulting in an automatic loss.",
        },
        {
          term: "Double Down",
          definition:
            lang === "pl"
              ? "Podwojenie zakładu i dobranie jednej karty."
              : "Doubling your bet and receiving exactly one more card.",
        },
        {
          term: "Split",
          definition:
            lang === "pl"
              ? "Podział pary kart na dwie osobne ręce."
              : "Dividing a pair into two separate hands.",
        },
        {
          term: "Blackjack",
          definition:
            lang === "pl"
              ? "As i karta za 10 punktów jako pierwsze rozdanie — najlepsza możliwa ręka."
              : "An Ace and a 10-point card on the initial deal — best hand possible.",
        },
        {
          term: "Insurance",
          definition:
            lang === "pl"
              ? "Zakład dodatkowy chroniący przed blackjackiem krupiera, oferowany gdy odsłania Asa."
              : "A side bet offered when the dealer shows an Ace, protecting against blackjack.",
        },
        {
          term: "Push",
          definition:
            lang === "pl"
              ? "Remis między graczem a krupierem — nikt nie wygrywa ani nie przegrywa."
              : "A tie between player and dealer — no one wins or loses.",
        },
      ],
    },
    {
      title: lang === "pl" ? "Ogólne terminy karciane" : "General Card Terms",
      data: [
        {
          term: "Deck",
          definition:
            lang === "pl"
              ? "Talia 52 kart do gry (bez jokerów)."
              : "A set of 52 playing cards without jokers.",
        },
        {
          term: "Suit",
          definition:
            lang === "pl"
              ? "Jeden z czterech kolorów: Kier, Karo, Trefl, Pik."
              : "One of the four categories: Hearts, Diamonds, Clubs, Spades.",
        },
        {
          term: "Face Card",
          definition:
            lang === "pl"
              ? "Karty z obrazkami: Walet, Dama, Król."
              : "Any Jack, Queen, or King.",
        },
        {
          term: "Shuffle",
          definition:
            lang === "pl"
              ? "Tasowanie — mieszanie kart w celu losowego ich ułożenia."
              : "Mixing the cards to randomize their order.",
        },
        {
          term: "Cut",
          definition:
            lang === "pl"
              ? "Przecięcie talii na dwie części i połączenie ich — finalizacja tasowania."
              : "Dividing the deck into two and rejoining them to finalize shuffle.",
        },
        {
          term: "Draw",
          definition:
            lang === "pl"
              ? "Dobranie karty z wierzchu talii."
              : "Taking a card from the top of the deck.",
        },
        {
          term: "Discard",
          definition:
            lang === "pl"
              ? "Odrzucenie karty na oddzielny stos, zazwyczaj odkrytą."
              : "Placing a card into a separate pile, often face-up.",
        },
        {
          term: "Hand",
          definition:
            lang === "pl"
              ? "Zestaw kart trzymanych przez gracza."
              : "The collection of cards held by a player.",
        },
        {
          term: "Pile",
          definition:
            lang === "pl"
              ? "Stos kart, np. dobierania lub odrzucania."
              : "A stack of cards, such as draw pile or discard pile.",
        },
      ],
    },
  ];
};

export const creditsData = [
  {
    title: "⚖️ About Visual Content Licensing",
    intro:
      "All visual materials (images, gifs, and videos) used in this project are either:",
    items: [
      "🧠 AI-generated",
      "🎨 Licensed under Creative Commons (with attribution when required)",
      "📸 Sourced from platforms like Pixabay under free-use licenses appropriate for educational and non-commercial use",
    ],
  },
  {
    title: "📺 Media Credits",
    intro:
      "We believe in proper attribution. This section contains all media sources. Specific video links are available within the articles where the content appears.",
    items: [
      {
        label: "Josep Vidal",
        link: "https://www.youtube.com/@JosepVidalMagic",
        suffix: "'s YouTube Channel.",
      },
      {
        label: "Hester23BearsCH",
        link: "https://www.youtube.com/@Hester23BearsCHx",
        suffix: "'s YouTube Channel.",
      },
      {
        label: "Microsoft Copilot",
        link: "https://copilot.microsoft.com/",
        suffix: " ",
      },
      {
        label: "Microsoft Designer",
        link: "https://designer.microsoft.com/",
        suffix: " ",
      },
      {
        label: "Pixabay",
        link: "https://pixabay.com/pl/",
        suffix: " ",
      },
    ],
  },
  {
    title: "Acknowledgements",
    intro: "Special thanks to our developers and betatesters.",
    // items: ["Our developers", "Our betatesters"],
  },
];
