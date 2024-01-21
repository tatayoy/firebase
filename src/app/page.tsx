"use client";
import Button from "@/components/Button";
import ImageNext from "@/components/Image";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { useSignIn } from "@/services/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser, isPending: isPendingLogin } = useSignIn({
    options: {
      onSuccess: (res: any) => {
        const { data } = res;
        const { access_token } = data;
        localStorage.setItem("access_token", access_token);

        router.push("/profile");
      },
    },
  });

  const onSubmit = (data: any) => {
    const { password, email } = data;

    loginUser({
      password,
      email: email.includes("@") ? email : "",
      username: !email.includes("@") ? email : "",
    });
  };

  useEffect(() => {
    const handleCheckIsLogin = () => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        router.push("/profile");
      }
    };

    handleCheckIsLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm h-dvh bg-gradient-radial-base px-5">
          <div className="h-5/6">
            <div className="p-3.5 flex items-center gap-2">
              <ImageNext
                onClick={() => router.push("/register")}
                src="/back.svg"
                alt="back"
                width={10}
                height={10}
                className="w-auto"
              />
              <Text label="Back" className="font-bold not-italic text-sm text-white" />
            </div>

            <div className="p-3.5">
              <Text label="Login" className="font-bold not-italic text-2xl text-white" />
            </div>

            <Controller
              control={control}
              rules={{
                required: "Email/Username is required",
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
                  placeholder="Enter Username/Email"
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
                  placeholder="Enter Password"
                />
              )}
            />
          </div>

          <div className="h-1/6 flex flex-col justify-end py-5">
            <Button
              disabled={isPendingLogin}
              label="Login"
              onClick={handleSubmit(onSubmit)}
              type="button"
              className="flex items-center w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-gradient-to-r from-[#62CDCB] to-[#4599DB]"
            />

            <div className="flex items-center justify-center gap-2 mt-6">
              <Text label="No account?" className="text-white text-xs font-medium" />
              <Text
                onClick={() => router.push("/register")}
                label="Register here"
                className="text-[#94783E] text-xs font-medium cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
