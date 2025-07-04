type RootStackParamList = {
  Game: {
    playersCount: number;
    initialBalance: number;
    smallBlindAmount: number;
    bigBlindAmount: number;
  };
  Article: { articleId: number };
  BlackjackTraining: {
    initialBalance: number;
    insuranceEnabled: boolean;
    doubleEnabled: boolean;
    autoHitOnSeventeenEnabled: boolean;
  };
};

export default RootStackParamList;
