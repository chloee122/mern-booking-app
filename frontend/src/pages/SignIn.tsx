import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import useAppContext from "../hook/useAppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

function SignIn() {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      showToast({ message: "Sign in successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((formData) => mutation.mutate(formData));
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold ">Sign In</h2>
      <label className="text-gray-700 font-bold text-sm">
        Email
        <input
          type="email"
          {...register("email", { required: "This field is required" })}
          className="border rounded py-1 px-2 font-normal w-full"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 font-bold text-sm">
        Password
        <input
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="border rounded py-1 px-2 font-normal w-full"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <div className="flex justify-between items-center">
        <span className="text-gray-700">
          Not registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Login
          </button>
        </span>
      </div>
    </form>
  );
}

export default SignIn;
