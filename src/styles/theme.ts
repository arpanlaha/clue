import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      h2: {
        marginBottom: "0.5em",
      },
      h3: {
        marginBottom: "0.5em",
      },
      select: {
        marginBottom: "20px",
      },
    },
  },
  initialColorMode: "light",
  useSystemColorMode: true,
});
