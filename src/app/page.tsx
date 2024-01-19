"use client";
import Button from "@/components/Button";
import ImageNext from "@/components/Image";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { Controller, useForm } from "react-hook-form";

interface DataLogin {
  email: string;
  password: string;
  confirm_password: string;
  username: string;
}

export default function Home() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      username: "",
    },
  });

  const { mutate: signIn, isPending } = useSignIn({
    options: {
      onSuccess: (res: any) => {
        const { access_token } = res.data.data.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(res));

        navigate("/protected/dashboard");
      },
    },
  });

  const onSubmit = async (data: DataLogin) => {
    alert(JSON.stringify(data));
  };

  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm h-dvh bg-gradient-radial-base px-5">
          <div className="h-5/6">
            <div className="p-3.5 flex items-center gap-2">
              <ImageNext src="/back.svg" alt="back" width={10} height={10} />
              <Text label="Back" className="font-bold not-italic text-sm text-white" />
            </div>

            <div className="p-3.5">
              <Text label="Register" className="font-bold not-italic text-2xl text-white" />
            </div>

            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
              name="email"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  onChange={onChange}
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  classNameInput="block w-full bg-white/20 rounded-md border-0 p-3 text-white shadow-sm placeholder:text-white/40 sm:text-sm"
                  placeholder="Enter Email"
                />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: "Username is required",
              }}
              name="username"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  onChange={onChange}
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  classNameInput="mt-4 block w-full bg-white/20 rounded-md border-0 p-3 text-white shadow-sm placeholder:text-white/40 sm:text-sm"
                  placeholder="Create Username"
                />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: "Password is required",
              }}
              name="password"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  onChange={onChange}
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  classNameInput="mt-4 block w-full bg-white/20 rounded-md border-0 p-3 text-white shadow-sm placeholder:text-white/40 sm:text-sm"
                  placeholder="Create Password"
                />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === control._formValues.password || "The passwords do not match",
              }}
              name="confirm_password"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  onChange={onChange}
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  name="confirm_password"
                  type="confirm_password"
                  autoComplete="confirm_password"
                  required
                  classNameInput="mt-4 block w-full bg-white/20 rounded-md border-0 p-3 text-white shadow-sm placeholder:text-white/40 sm:text-sm"
                  placeholder="Confirm Password"
                />
              )}
            />
          </div>

          <div className="h-1/6 flex flex-col justify-end py-5">
            <Button
              label="Register"
              onClick={handleSubmit(onSubmit)}
              type="button"
              className="flex items-center w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-gradient-to-r from-[#62CDCB] to-[#4599DB]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
