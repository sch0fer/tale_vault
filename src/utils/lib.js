import { createClient } from "@supabase/supabase-js";
import { routes } from "./routes";
import { useNavigate } from "@solidjs/router";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const createResponse = (success, message, data = null) => {
  return { success, message, data };
};
export const navigate = useNavigate();
export const createNavArray = (menu = "main", params = {}) => {
  const resolvePath = (path) => {
    return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      return params[key] ?? `:${key}`;
    });
  };
  const navArray = [];
  const walkRoutes = (routes, parentPath = "") => {
    routes.forEach((route) => {
      const path =
        route.path === "/"
          ? parentPath
          : `${parentPath}/${route.path}`.replace(/\/+/g, "/");

      if (route.menu === menu) {
        navArray.push({
          text: route.text,
          link: resolvePath(path),
          icon: route.icon,
        });
      }
      if (route.children) {
        walkRoutes(route.children, path);
      }
    });
  };
  walkRoutes(routes);
  return navArray;
};
export const login = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return createResponse(false, error.message);
  return createResponse(true, "Signed in successfully!", data);
};

export const logout = async () => {
  await supabase.auth.signOut();
  navigate("/");
};

export const register = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const repeat_password = formData.get("repeat_password");
  if (password != repeat_password) {
    return createResponse(false, "Passwords must be identical!");
  }
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return createResponse(false, error.message);
  }
  return createResponse(true, "Your account has been created!", data);
};

export const loadUserBooks = async (author_id) => {
  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("author_id", author_id);

  if (error) {
    return createResponse(false, error.message);
  }
  return createResponse(true, "Books loaded successfully", data);
};

export const loadBook = async (book_id) => {
  const { data: bookData, error: bookError } = await supabase
    .from("books")
    .select()
    .eq("id", book_id)
    .single();

  if (bookError) {
    return createResponse(false, bookError.message);
  }
  const { data: chaptersData, error: chaptersError } = await supabase
    .from("chapters")
    .select()
    .eq("book_id", book_id)
    .order("chapter_number");

  if (chaptersError) {
    return createResponse(false, chaptersError.message);
  }
  return createResponse(true, "Successfully loaded book data", {
    book: bookData,
    chapters: chaptersData,
  });
};

export const addBook = async (author_id) => {
  if (!author_id) {
    return createResponse(false, "You must be signed in to create a book.");
  }

  const { data, error } = await supabase
    .from("books")
    .insert({
      author_id: authorId,
      title: "Untitled book",
      blurp: "",
      cover_url: "https://placehold.co/600x900",
      published: false,
    })
    .select()
    .single();

  if (error) {
    return createResponse(false, error.message);
  }
  return createResponse(true, "New book created", data);
};

export const saveChanges = async (formData) => {
  const title = formData.get("title");
  if (!title.trim()) {
    return createResponse(false, "Title can't be");
  }
  const cover = formData.get("cover");
  if (!(cover instanceof File) || cover.size <= 0) {
    return createResponse(false, )
  }
};

export const categories = ["Fantasy", "Sci-Fi", "Thriller", "Horror", "Love"];
