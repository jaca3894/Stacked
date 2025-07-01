import { View, Text, Easing } from "react-native";
import Popover, { PopoverPlacement } from "react-native-popover-view";

type HelpPopoverProps = {
  isVisible: boolean;
  from: any;
  onRequestClose: () => void;
  text: string;
}

const HelpPopover = ({isVisible, from, onRequestClose, text} : HelpPopoverProps) => {
  return (
    <Popover
      popoverStyle={{backgroundColor: "#cbbb9c"}}
      isVisible={isVisible}
      from={from}
      onRequestClose={onRequestClose}
      placement={PopoverPlacement.TOP}
      arrowSize={{ width: 10, height: 6 }}
      backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      animationConfig={{
        duration: 100, // czas animacji w ms
        easing: Easing.out(Easing.ease), // łagodny easing
      }}
    >
      <View style={{  backgroundColor: "#1c1c1c", padding: 10,  borderWidth: 3, borderColor: "#cbbb9c", borderRadius: 5 }}>
        <Text style={{ color: "#fff" }}>{text}</Text>
      </View>
    </Popover>
  )
}

export default HelpPopover;