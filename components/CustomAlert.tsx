import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

type AlertType = "dialog" | "info";

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "cancel" | "destructive" | "default";
}

interface AlertOptions {
  title?: string;
  message: string;
  buttons?: AlertButton[];
  type?: AlertType;
}

interface AlertContextValue {
  showAlert: (opts: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export const useAlert = (): AlertContextValue => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be inside AlertProvider");
  return ctx;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [opts, setOpts] = useState<AlertOptions>({
    title: undefined,
    message: "",
    buttons: [{ text: "OK", style: "default" }],
    type: "info",
  });

  const showAlert = (options: AlertOptions) => {
    setOpts({
      title: options.title,
      message: options.message,
      buttons: options.buttons?.length
        ? options.buttons
        : [{ text: "OK", style: "default" }],
      type: options.type || "info",
    });
    setVisible(true);
  };

  const onPressButton = (btn: AlertButton) => {
    setVisible(false);
    btn.onPress && btn.onPress();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.container}>
            {opts.title && <Text style={styles.title}>{opts.title}</Text>}

            <Text style={styles.message}>{opts.message}</Text>

            <View style={styles.buttonsRow}>
              {opts.buttons!.map((btn, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.button,
                    btn.style === "destructive" && styles.destructive,
                    btn.style === "cancel" && styles.cancel,
                  ]}
                  onPress={() => onPressButton(btn)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      btn.style === "destructive" && styles.destructiveText,
                    ]}
                  >
                    {btn.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </AlertContext.Provider>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: width * 0.8,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#cbbb93",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#cbbb93",
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: "#ddd",
    marginBottom: 20,
    lineHeight: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  destructive: {
    backgroundColor: "#550000",
  },
  destructiveText: {
    color: "tomato",
  },
  cancel: {
    backgroundColor: "#555",
  },
});
