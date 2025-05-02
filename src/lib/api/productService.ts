import api from "./api";

class ProductService {
  getProductByPageNo = async (
    pageNo: number,
    limit: number,
    categoryId?: string
  ) => {
    return api.post(`product/product-page?pageNo=${pageNo}&limit=${limit}`, {
      categoryId,
    });
  };

  getProduct = async (id: string) => {
    const res = await api.post(`product/product-by-id`, { id });
    return res.data.data;
  };
}
export const productService = new ProductService();
