"use client";
import { CartProductType } from "@/app/product/[productId]/ProductDetail";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import toast from "react-hot-toast";

interface contextProp {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  handleSetPaymentIntent: (paymentIntentId: string | null) => void;
  paymentIntentId: string | null;
}
export const CartContext = createContext<contextProp | null>(null);

interface cartContextProps {
  children: any;
}
export const CartContextProvider: React.FC<cartContextProps> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCart");
    const ParsedCartItems: CartProductType[] | null = cartItems && JSON.parse(cartItems);
    const eShopPaymentIntent = localStorage.getItem("eShopPaymentIntent");
    const paymentIntentId = eShopPaymentIntent && JSON.parse(eShopPaymentIntent);
  
    setCartProducts(ParsedCartItems);
    setPaymentIntentId(paymentIntentId);
  }, []);

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const acc = cartProducts?.reduce(
          (acc: { total: number; qty: number }, item: CartProductType) => {
            const itemTotal = item.quantity * item.price;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalAmount(acc.total), setCartTotalQty(acc.qty);
      }
    };
    getTotal();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prevState) => {
      let updatedCart;
      if (prevState) {
        updatedCart = [...prevState, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Product added to Cart ");
      localStorage.setItem("eShopCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        let updatedCart = [...cartProducts];
        const productIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        updatedCart[productIndex].quantity =
          updatedCart[productIndex].quantity + 1;
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCart", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        let updatedCart = [...cartProducts];
        const productIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        updatedCart[productIndex].quantity =
          updatedCart[productIndex].quantity - 1;
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCart", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const updatedCartProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(updatedCartProducts);
        toast.success("Product removed from cart");
        localStorage.setItem("eShopCart", JSON.stringify(updatedCartProducts));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("eShopCart", JSON.stringify(null));
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback((val: string| null)=>{
    setPaymentIntentId(val);
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
  },[])

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handleSetPaymentIntent,
    paymentIntentId
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


