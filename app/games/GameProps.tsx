import { RouteProp } from "@react-navigation/core";

type RootStackParamList = {
  Game: { playersCount: number };
};

type GameRouteProp = RouteProp<RootStackParamList, "Game">;

export default GameRouteProp;