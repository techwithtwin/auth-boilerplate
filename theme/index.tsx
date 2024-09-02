import { extendTheme } from "@chakra-ui/react";
import { Epilogue } from "next/font/google";

const epilogue = Epilogue({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

export const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        lineHeight: "1.1em",
        fontWeight: "600",
      },
    },
    Text: {
      baseStyle: {
        color: "brand.white",
        fontSize: "16px",
        fontweight: "500",
        fontStyle: "normal",
        lineHeight: "24px",
      },
    },
  },
  fonts: {
    heading: epilogue.style.fontFamily,
  },

  colors: {
    brand: {
      primary: "#4458dc",
      white: "#ffffff",
      secondary: "#854fee",
      black: "#141313",
      blackHover: "#403f3f",
      gray: "#777777",
      gradient: "radial(#29cce5,blue.700)",
    },
  },
});
