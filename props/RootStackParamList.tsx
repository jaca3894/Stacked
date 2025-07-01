type RootStackParamList = {
  Game: { playersCount: number, initialBalance: number, smallBlindAmount: number; bigBlindAmount: number };
  ChoosePlayersAmount: { gameType: string };
  Article: { articleId: number };
};

export default RootStackParamList;