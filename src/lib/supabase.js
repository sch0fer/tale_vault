import { createClient } from "@supabase/supabase-js";
import { routes } from "./routes";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const createResponse = (success, message, data = null) => {
  return { success, message, data };
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
  const { error } = await supabase.auth.signOut();
  if (error) {
    return createResponse(false, error.message);
  }

  return createResponse(true, "Signed out successfully");
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
      author_id,
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

export const saveChanges = async (book_id, formData) => {
  if (!book_id) {
    return createResponse(false, "Book ID is required.");
  }

  const title = formData.get("title")?.toString().trim();
  const blurp = formData.get("blurp")?.toString() ?? "";

  if (!title) {
    return createResponse(false, "Title can't be empty.");
  }

  const { data, error } = await supabase
    .from("books")
    .update({
      title,
      blurp,
    })
    .eq("id", book_id)
    .select()
    .single();

  if (error) {
    return createResponse(false, error.message);
  }

  return createResponse(true, "Book saved successfully.", data);
};

export const addChapter = async (book_id) => {
  if (!book_id) {
    return createResponse(false, "Book ID is required.");
  }

  const { data: latest_chapter, error: latest_chapter_error } = await supabase
    .from("chapters")
    .select("chapter_number")
    .eq("book_id", book_id)
    .order("chapter_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latest_chapter_error) {
    return createResponse(false, latest_chapter_error.message);
  }

  const chapter_number = latest_chapter ? latest_chapter.chapter_number + 1 : 1;

  const { data, error } = await supabase
    .from("chapters")
    .insert({
      book_id,
      chapter_number,
      title: `Chapter ${chapter_number}`,
      content_encrypted: "",
      published: false,
    })
    .select()
    .single();

  if (error) {
    return createResponse(false, error.message);
  }

  return createResponse(true, "New chapter created.", data);
};

export const saveChapter = async (chapter_id, formData) => {
  if (!chapter_id) {
    return createResponse(false, "Chapter ID is required.");
  }

  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString() ?? "";

  if (!title) {
    return createResponse(false, "Title can't be empty.");
  }

  const { data, error } = await supabase
    .from("chapters")
    .update({
      title,
      content_encrypted: content,
    })
    .eq("id", chapter_id)
    .select()
    .single();

  if (error) {
    return createResponse(false, error.message);
  }

  return createResponse(true, "Chapter saved successfully.", data);
};

export const loadUserData = async (user_id) => {
  if (!user_id) {
    return createResponse(false, "User id must be set");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .single();

  if (error) {
    return createResponse(false, error.message);
  }

  return createResponse(true, "Loading user data completed", data);
};

export const categories = ["Fantasy", "Sci-Fi", "Thriller", "Horror", "Love"];
