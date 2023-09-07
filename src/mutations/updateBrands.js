import ObjectID from "mongodb";
export default async function updateBrands(context, args) {
  try {
    const { collections } = context;
    const { SellerBrands } = collections;
    const { _id } = args;
    const { brandName, brandCategory } = args.input;
    console.log("args", args);
    let query = {};
    query.updatedAt = new Date();
    const filter = { _id: ObjectID.ObjectId(_id) };
    if (brandName) {
      query.brandName = brandName;
    }
    if (brandCategory) {
      query.brandCategory = brandCategory;
    }
    console.log("query", query);
    const options = { new: false };

    const updatedBrand = await SellerBrands.findOneAndUpdate(
      filter,
      { $set: query },
      options
    );

    console.log("Update result:", updatedBrand.value);
    return updatedBrand.value;
    // return null
  } catch (error) {
    console.error("Error updating brand:", error);
    throw error;
  }
}
