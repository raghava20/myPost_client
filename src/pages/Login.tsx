import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// Zod Schema for Login Validation
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success("Login successful");
      navigate("/posts");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-auto w-full min-w-[320px] h-full min-h-[80vh]">
      <div className="p-8 border border-gray-200 rounded-lg w-96">
        <h2 className="mb-2 font-bold text-black text-2xl">Welcome back</h2>

        <h5 className="mb-4 font-normal text-gray-400 text-sm">
          Sign in to your account to continue
        </h5>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          <Button type="submit">Login</Button>

          <div className="text-gray-400 text-sm text-center">
            Don't have an account?{" "}
            <Link className="text-gray-800" to={"/signup"}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
