import dbConnection from "../../../util/dbConnection";
import Category from "../../../models/category";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { body } = req;

        const category = await Category.findOne({
          name: body.category
        }).exec();

        const newSubCategory = category.subCategory;

        newSubCategory.push(body.subCategory);

        await Category.findByIdAndUpdate(
          category._id,

          { subCategory: newSubCategory },

          (err) => console.log(err)
        ).then(res.end("done"));
      } catch (err) {
        return res.end(JSON.stringify([]));
      }

      break;

    default:
      return res.end(JSON.stringify([]));
  }
};
