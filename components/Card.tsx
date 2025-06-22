import { Image } from "react-native"

const Card = () => {
  return (
    <Image source={require('../assets/cardBack.png')} resizeMode="contain" style={{width: 35}}/>
  )
}

export default Card