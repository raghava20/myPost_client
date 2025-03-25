import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createPost,
  fetchPosts,
  updatePost,
} from "../redux/features/postSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextField, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Zod Schema for Post Validation
const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  text: z.string().min(10, "Text must be at least 10 characters"),
  image: z.union([z.instanceof(File), z.string()]).optional(),
});

type PostFormInputs = z.infer<typeof postSchema>;

const PostForm = ({ initialData, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<PostFormInputs>({ resolver: zodResolver(postSchema) });

  // Set initial data when available
  useEffect(() => {
    console.log(initialData, "initial data");
    if (initialData?.title) {
      if (initialData.title) setValue("title", initialData.title);
      if (initialData.text) setValue("text", initialData.text);
      if (initialData.image && typeof initialData.image === "string") {
        setImagePreview(initialData.image); // Set image URL for preview
        setValue("image", initialData.image);
        trigger("image");
        trigger("title");
        trigger("text");
      }
    }
  }, [initialData, setValue]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
      trigger("image"); // Manually trigger validation for the image field
    }
  };

  // Remove Image
  const removeImage = () => {
    setValue("image", null);
    setImagePreview(null);
    trigger("image"); // Re-validate the image field after removal
  };

  const onSubmit = async (data: PostFormInputs) => {
    try {
      console.log(data, "createpost");
      if (initialData?.title) {
        const result = {
          ...data,
          id: id,
        };
        navigate("/posts");
        await dispatch(updatePost(result)).unwrap();
        toast.success("Post updated successfully");
        dispatch(fetchPosts());
      } else {
        await dispatch(createPost(data)).unwrap();
        toast.success("Post created successfully");
      }
      setImagePreview(null);
      setValue("title", "");
      setValue("text", "");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-2">Create Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label="Title"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          size="small"
        />
        <TextField
          label="Text"
          multiline
          rows={4}
          {...register("text")}
          error={!!errors.text}
          helperText={errors.text?.message}
          size="small"
        />

        {/* Image Upload */}
        {!imagePreview && (
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
            className="hover:!cursor-pointer"
          />
        )}

        {/* Error Message for Image */}
        {errors.image && !imagePreview && (
          <Typography color="error" variant="body2">
            {errors.image.message}
          </Typography>
        )}

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mt-2 w-24 h-24">
            <img
              src={imagePreview}
              alt="Selected"
              className="border rounded-md w-full h-full object-cover"
            />
            <IconButton
              className="!top-0 !right-0 !absolute w-fit"
              size="small"
              onClick={removeImage}
            >
              <Close fontSize="small" />
            </IconButton>
          </div>
        )}

        <Button type="submit">
          {initialData?.title ? "Update Post" : "Create Post"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
