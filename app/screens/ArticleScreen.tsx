import { View, Text } from "react-native";
import RootStackParamList from "../../props/RootStackParamList";
import { RouteProp, useRoute } from "@react-navigation/native";

type ArticleScreenProp = RouteProp<RootStackParamList, "Article">;    

const ArticleScreen = () => {

    const route = useRoute<ArticleScreenProp>();
    const { articleId } = route.params;
    console.log("Article ID:", articleId);
  return (
    <View style={{ flex: 1, backgroundColor: '#1c1c1c', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#cbbb9c', fontSize: 24, fontWeight: 'bold' }}>Article Screen, {articleId}</Text>
    </View>
  );
}

export default ArticleScreen;