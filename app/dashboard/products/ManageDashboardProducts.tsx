"use client";
import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRefresh,
  MdRemoveRedEye,
} from "react-icons/md";
import TableAction from "@/app/components/TableAction";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ManageDashboardProductProps {
  products: Product[];
}

const ManageDashboardProduct: React.FC<ManageDashboardProductProps> = ({ products }) => {

  const router = useRouter();
  let rows: any = [];

  if (products) {
    rows = products.map((product: Product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        brand: product.brand,
        category: product.category,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 210 },
    {
      field: "name",
      headerName: "Name",
      width: 180,
    },
    {
      field: "price",
      headerName: "Price",
      width: 110,
      renderCell: (params) => {
        return <div className="font-semibold">{params.row.price}</div>;
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 110,
    },
    {
      field: "category",
      headerName: "Category",
      width: 110,
    },
    {
      field: "inStock",
      headerName: "InStock",
      width: 140,
      renderCell: (params) => {
        return (
          <div
            className={` flex rounded h-10 items-center gap-2 mt-1 pl-2
              ${params.row.inStock
                ? "bg-teal-500  text-teal-950"
                : "bg-rose-400  text-rose-950"}
            `}
          >
            {params.row.inStock ? <MdDone  size={20}/> : <MdClose  size={20}/>}
            <p>{params.row.inStock ? "In Stock" : "Out of Stock"}</p>
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      renderCell: (params) => {
        return (
          <div className="flex gap-4 justify-between w-full items-center mt-2">
            <TableAction
              onClick={() =>
                handleToggleInStock(params.row.id, params.row.inStock)
              }
              icon={MdCached}
            />
            <TableAction
              onClick={() => handleDeleteProduct(params.row.id)}
              icon={MdDelete}
            />
            <TableAction onClick={()=> router.push(`/product/${params.row.id}`)} icon={MdRemoveRedEye} />
          </div>
        );
      },
    },
  ];

  const handleToggleInStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then(() => {
        toast.success("Product InStock updated successfully ");
        router.refresh();
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      const product = products.find((product) => product.id === id);
      if (product) {
        await Promise.all(
          product.images.map(async (item: any) => {
            const publicId = item.publicId;
            await axios
              .delete(`/api/upload/${publicId}`)
              .then(() => {
                toast.success("Delete image successfully");
              })
              .catch((err) => {
                toast.error(err);
              });
          })
        );
      }
        axios
          .delete(`/api/product/${id}`)
          .then(() => {
            toast.success("Product Deleted successfully ");
            router.refresh();
          })
          .catch((err) => {
            toast.error(err);
          });
    },
    [products]
  );

  return (
    <Box sx={{ height: 400, width: "90%" }}>
      <Heading title="Manage products" />
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
  );
};

export default ManageDashboardProduct;
