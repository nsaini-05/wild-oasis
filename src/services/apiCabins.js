import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins could not loaded");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", Number(id));

  if (error) {
    throw new Error("Cabins could not be deleted");
  }
};

export const createCabin = async (newCabin) => {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (imageError) {
    deleteCabin(data.id);
    throw new Error(
      "Cabin Image Could not be uploaded and the cabin was not created"
    );
  }

  return data;
};
