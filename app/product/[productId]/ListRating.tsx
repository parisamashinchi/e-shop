import moment from "moment";
import Heading from "@/app/components/products/Heading";
import { Rating } from "@mui/material";
import Avatar from "@/app/components/Avatar";

interface ListRatingProps {
  product: any;
}
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product Preview" />
      <div className="mt-2">
        {product.reviews.map((review: any) => {
          return (
            <div key={review.id} className="w-[500px]">
              <div className="flex  gap-2 items-center">
                <Avatar src={review.user.image} />
                <div className="font-semibold">{review?.user.name}</div>
                <div>{moment(review.createdDate).fromNow()}</div>
              </div>
              <div className="mt-2">
                <Rating value={review.rating} readOnly />
                <p className="ml-2">{review.comment}</p>
              </div>
              <hr className="mt-2 mb-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListRating;
