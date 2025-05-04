import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Invalid Crendtials");

  return { data };
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data.user;
};

export const logout = async () => {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Unable to logout");
  }
};

export const signUp = async ({ email, password, fullName, avatar = "" }) => {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar,
      },
    },
  });

  if (error) throw new Error("Unable to Sign Up this time");

  return data;
};

export const updateUser = async ({ avatar, password, fullName }) => {
  let updatedData;

  if (password) {
    updatedData = { password };
  }
  if (fullName) {
    updatedData = { data: { fullName } };
  }

  let { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${Math.random()}-${data.user.id}`;
  const { error: imageUploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (imageUploadError) throw new Error(imageUploadError.message);

  const { data: updatedUser, error: UpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (UpdateError) throw new Error(UpdateError.message);
  return updateUser;
};
