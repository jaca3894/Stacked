import { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        backgroundColor: "#e0ffe0",
        // zIndex: 1000,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#006600",
      }}
      text2Style={{
        fontSize: 14,
        color: "#004400",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red", backgroundColor: "#121212" }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#c00",
      }}
      text2Style={{
        fontSize: 14,
        color: "#ccc",
      }}
    />
  ),
};

export default toastConfig;
