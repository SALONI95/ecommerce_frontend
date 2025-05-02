import api from "./api";

class CategoryService {
  getCategories = async () => {
    try {
      const { data } = await api.get(`category`);
      return data;
    } catch (error) {
      console.log("Error in get all data api:", error);
    }
  };
}
export const categoryService = new CategoryService();
