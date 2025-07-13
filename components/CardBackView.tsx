import { Image } from "react-native";

interface CardBackViewProps {
  width?: number;
  height?: number;
}

const CardBackView = ({ width, height}: CardBackViewProps) => {
  return (
    <Image
      source={require("../assets/poker/cardBack.png")}
      resizeMode="contain"
      style={{ width: width ?? 35, height: height ?? 50 }}
    />
  );
};

export default CardBackView;
