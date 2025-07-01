import { View, StyleSheet, Image, SafeAreaView, Text, TouchableOpacity } from "react-native";

const generateDeck = () => {
  const values = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  const suits = [
    { symbol: '♠', color: 'black', code: 's' },
    { symbol: '♥', color: 'red', code: 'h' },
    { symbol: '♣', color: 'black', code: 'c' },
    { symbol: '♦', color: 'red', code: 'd' },
  ];

  return suits.flatMap(suit =>
    values.map(value => ({
      id: `${value}${suit.code}`,
      value,
      suit: suit.symbol,
      color: suit.color,
    }))
  );
};



const CheckHandScreen = () => 
{
    const selectedCards = ["", "", "", "", "", "", ""];
    const deck = generateDeck();

    return(
        <View style={ styles.container }>
            <SafeAreaView style={styles.header}>
                <Image source={require("../../assets/logo/logo.png")} style={styles.logo} />
            </SafeAreaView>
            <View style={styles.content}>
                <Text style={styles.buttonText}>Select your cards.</Text>
                <View style={styles.dropZone}>
                    {selectedCards.map((item, index) => (
                        <View key={index+1} style={styles.emptyCardSlot}>

                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.deckPanel}>
                    <View style={styles.deckGrid}>
                        {deck.map((card, index) => (
                        <View key={card.id} style={styles.cardView}>
                            <Text style={[styles.cornerLeftText, { color: card.color }]}>{card.value}</Text>
                            <Text style={[styles.suitSymbol, { color: card.color }]}>{card.suit}</Text>
                            <Text style={[styles.cornerRightText, { color: card.color, transform: [{ rotate: '180deg' }] }]}>
                            {card.value}
                            </Text>
                        </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>2025 Stacked.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: "#1c1c1c"
    },
    header:
    {
        height: "20%",
        backgroundColor: "#1c1c1c",
        // borderWidth: 1,
        // borderColor: "red",
        justifyContent: "flex-end",
    },
    logo:
    {
        width: "100%",
        height: "80%",
        resizeMode: "contain",
    },
    content:
    {
        // borderWidth: 1,
        // borderColor: "red",
        height: "70%",
        alignContent: "center"
    },
    dropZone:
    {
        width: "90%",
        height: "20%",
        // borderWidth: 1,
        // borderColor: "yellow",
        alignSelf: "center",
        margin: 10,
        flexDirection: "row"
    },
    emptyCardSlot:
    {
        borderWidth: 1,
        borderColor: "gray",
        flex: 1,
        marginHorizontal: 5,
        marginVertical: "7%",
        borderRadius: 7,
    },
    button:
    {
        width: "30%",
        height: "5%",
        alignSelf: "center",
        // borderWidth: 1,
        // borderColor: "green",
        justifyContent: "center"
    },
    buttonText:
    {
        color: "white",
        textAlign: "center",
    },
    deckPanel:
    {
        flex: 1,
        // borderWidth: 1,
        // borderColor: "red",
        padding: "7%",
    },
    deckGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 4, 
    },
    cardView: {
        width: '10%', // 9-10 kart w rzędzie zależnie od marginesów
        aspectRatio: 0.66, // standardowy stosunek kart (np. 60x90)
        backgroundColor: 'white',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#888',
        padding: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    suitSymbol: {
        fontSize: 12,
        textAlign: 'center',
        marginVertical: 2,
    },
    cornerLeftText: {
        fontSize: 10,
        alignSelf: 'flex-start',
    },
    cornerRightText: {
            fontSize: 10,
        alignSelf: 'flex-end',
    },
    footer: {
        // borderWidth: 1,
        // borderColor: "red",
        height: '10%',
        justifyContent: "center",
        alignSelf: "center",
        // justifyContent: 'center',
        // alignItems: 'center',
        // position: 'absolute',
        // bottom: 0,
        // left: '50%',
        // transform: [{translateX: '-50%'}],
    },
    footerText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 'auto'
    },
});

export default CheckHandScreen;