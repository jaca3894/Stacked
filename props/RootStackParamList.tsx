type RootStackParamList = {
  Game: { playersCount: number, initialBalance: number, smallBlindAmount: number; bigBlindAmount: number };
  Article: { articleId: number };
};

export default RootStackParamList;