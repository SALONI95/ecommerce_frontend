export type IUser = {
  _id: string;
  email: string;
  fullname: string;
  wishlist: {
    _id: string;
    products: Array<string> | undefined;
  };
};

export type IProducts = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  new_price: number;
  old_price: number;
  type: string;
  category: string;
  avaliable: boolean;
  createdAt: string;
  updatedAt: string;
  categoryDetails: {
    _id: string;
    categoryName: string;
  };
  typeDetails: {
    _id: string;
    typeName: string;
  };
};

export type IApiResponse = {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
};

// const productDetails: IProducts = {
//   _id: "6756e4ae30d3f429810cf00b",
//   title: "efewfw",
//   description: "ewrewr",
//   images: [
//     "http://res.cloudinary.com/dpxi4fqcc/image/upload/v1733747888/sqr2spfbkhouudamw4fw.png",
//     "http://res.cloudinary.com/dpxi4fqcc/image/upload/v1733747888/sqr2spfbkhouudamw4fw.png",
//     "http://res.cloudinary.com/dpxi4fqcc/image/upload/v1733747888/sqr2spfbkhouudamw4fw.png",
//     "http://res.cloudinary.com/dpxi4fqcc/image/upload/v1733747888/sqr2spfbkhouudamw4fw.png",
//   ],
//   new_price: 32423,
//   old_price: 234234,
//   type: "Silver",
//   category: "Toe Ring",
//   avaliable: true,
//   createdAt: "2024-12-09T12:38:06.456Z",
//   updatedAt: "2024-12-09T12:38:06.456Z",
//   categoryDetails: {
//     _id: "674d9d72f529ee0c08deabdd",
//     categoryName: "Toe Ring",
//   },
//   typeDetails: {
//     _id: "66fa890d4aab9dda5376580b",
//     typeName: "Silver",
//   },
// };
