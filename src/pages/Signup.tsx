import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/features/authSlice";
import { AppDispatch } from "../redux/store";

// Zod Schema for Signup Validation
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      console.log(data, "signup data");
      await dispatch(registerUser(data)).unwrap(); // Replace with actual signup action
      toast.success("Signup successful");
      navigate("/login");
    } catch {
      toast.error("Signup failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-auto w-full min-w-[320px] h-full min-h-[80vh]">
      <div className="p-8 border border-gray-200 rounded-lg w-96">
        <h2 className="mb-2 font-bold text-black text-2xl">
          Create an account
        </h2>

        <h5 className="mb-4 font-normal text-gray-400 text-sm">
          Sign up to get started with Elegant Posts
        </h5>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            size="small"
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            size="small"
          />
          <Button type="submit">Signup</Button>

          <div className="text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <Link className="text-gray-800" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
