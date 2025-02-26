"use client";
import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";

interface SummaryProps {
  products: Product[];
  orders: Order[];
  users: User[];
}
type SummaryKey = {
  [key: string]: {
    label: string;
    amount: number;
  };
};
const Summary: React.FC<SummaryProps> = ({ products, orders, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryKey>({
    sale: {
      label: "Total Sale",
      amount: 0,
    },
    products: {
      label: "Total Products",
      amount: 0,
    },
    orders: {
      label: "Total Orders",
      amount: 0,
    },
    users: {
      label: "Total Users",
      amount: 0,
    },
  });

  const summaryKeys = Object.keys(summaryData);

  useEffect(() => {
    setSummaryData((prev) => {
      let data = { ...prev };
      const totalSales = orders.reduce((acc, item) => {
        // if (item.status === "completed") {
        return acc + item.amount;
        // }
        // return acc;
      }, 0);
      data.sale.amount = totalSales;
      data.products.amount = products.length;
      data.orders.amount = orders.length;
      data.users.amount = users.length;
      return data;
    });
  }, [products, orders, users]);

  return (
    <div className="max-w-[1200px]">
      <div className="font-semibold text-center">
        <Heading title="Summary Statistics" center />
      </div>
      <div className="grid grid-cols-2 gap-3 w-full h-52">
        {summaryKeys.map((sumKey) => {
          return (
            <div key={sumKey} className="flex flex-col gap-2 items-center justify-center border h-[200px] rounded">
              <div className="font-semibold text-lg">
                {summaryData[sumKey].label}
              </div>
              <p>
                {summaryData[sumKey].label === "Total Sale"
                  ? formatPrice(summaryData[sumKey].amount)
                  : summaryData[sumKey].amount}{" "}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
