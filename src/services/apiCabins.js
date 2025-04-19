import supabase from "./supabase";
export const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins could not loaded");
  }

  return data;
};
