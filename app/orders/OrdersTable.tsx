"use client";
import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import TableAction from "@/app/components/TableAction";
import { useRouter } from "next/navigation";
import moment from "moment";
import Container from "../components/Container";

interface OrdersTableProps {
  orders: ExtendOrdersProps[];
}
type ExtendOrdersProps = {
  user: User;
} & Order;

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const router = useRouter();
  let rows: any = [];

  if (orders) {
    rows = orders.map((order: ExtendOrdersProps) => {
      return {
        id: order.id,
        currency: order.currency,
        amount: formatPrice(order.amount / 100),
        deliveryStatus: order.deliveryStatus,
        paymentStatus: order.status,
        date: moment(order.createdAt).fromNow(),
        customer: order.user.name,
      };
    });
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "customer",
      headerName: "Customer",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => {
        return <div className="font-semibold">{params.row.amount}</div>;
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 110,
      renderCell: (params) => {
        return (
          <div
            className={` flex rounded h-10 items-center gap-2 mt-1 pl-2
              ${
                params.row.paymentStatus === "pending"
                  ? "bg-slate-300 text-slate-700"
                  : params.row.paymentStatus === "complete"
                  ? "bg-green-200 text-green-700"
                  : " "
              }
            `}
          >
            {params.row.paymentStatus === "pending" ? (
              <MdAccessTimeFilled />
            ) : params.row.paymentStatus === "complete" ? (
              <MdDone />
            ) : (
              <></>
            )}
            {params.row.paymentStatus === "pending" ? (
              "Pending"
            ) : params.row.paymentStatus === "complete" ? (
              "complete"
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "DeliveryStatus",
      width: 160,
      renderCell: (params) => {
        return (
          <div
            className={` flex rounded h-10 items-center gap-2 mt-1 pl-2
              ${
                params.row.deliveryStatus === "pending"
                  ? "bg-slate-300 text-slate-700"
                  : params.row.deliveryStatus === "dispatched"
                  ? "bg-purple-200 text-purple-700"
                  : params.row.deliveryStatus === "delivered"
                  ? "bg-green-200 text-green-700"
                  : " "
              }
            `}
          >
            {params.row.deliveryStatus === "pending" ? (
              <MdAccessTimeFilled />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <MdDeliveryDining />
            ) : params.row.deliveryStatus === "delivered" ? (
              <MdDone />
            ) : (
              <></>
            )}
            {params.row.deliveryStatus === "pending" ? (
              "Pending"
            ) : params.row.deliveryStatus === "dispatched" ? (
              "Dispatched"
            ) : params.row.deliveryStatus === "delivered" ? (
              "delivered"
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      renderCell: (params) => {
        return (
          <div className="flex gap-4 justify-between w-full items-center mt-2">
            <TableAction
              onClick={() => router.push(`/order/${params.row.id}`)}
              icon={MdRemoveRedEye}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Container>
      <Box sx={{ height: 400, width: "100%" }}>
        <Heading title="View Orders" />
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default OrdersTable;
