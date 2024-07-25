import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";

export interface FormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: () => {
      console.log("Registration successful!");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((formData) => mutation.mutate(formData));
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="font-bold text-3xl">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 font-bold flex-1 text-sm">
          First name
          <input
            {...register("firstName", { required: "This field is required" })}
            className="border rounded py-1 px-2 font-normal w-full"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 font-bold flex-1 text-sm">
          Last name
          <input
            {...register("lastName", { required: "This field is required" })}
            className="border rounded py-1 px-2 font-normal w-full"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 font-bold text-sm">
        Confirm Password
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This field is required";
              } else if (watch("password") !== value) {
                return "Your password do not match";
              }
            },
          })}
          className="border rounded py-1 px-2 font-normal w-full"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <div className="flex justify-between items-center">
        <span className="text-gray-700">
          Already registered?
          <Link className="underline" to="/login">
            Sign in here
          </Link>
        </span>
        <span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Create Account
          </button>
        </span>
      </div>
    </form>
  );
}

export default RegisterForm;
