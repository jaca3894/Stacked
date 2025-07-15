type RootStackParamList = {
  Game: {
    playersCount: number;
    initialBalance: number;
    smallBlindAmount: number;
    bigBlindAmount: number;
    loadGame: boolean;
  };
  Article: { articleId: string };
  BlackjackTraining: {
    initialBalance: number;
    insuranceEnabled: boolean;
    doubleEnabled: boolean;
    autoHitOnSeventeenEnabled: boolean;
  };
};

export default RootStackParamList;
