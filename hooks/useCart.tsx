import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function  useCart () {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
      }
    return context
}