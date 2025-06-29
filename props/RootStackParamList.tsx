type RootStackParamList = {
  Game: { playersCount: number, initialBalance: number };
  ChoosePlayersAmount: { gameType: string };
  Article: { articleId: number };
};

export default RootStackParamList;