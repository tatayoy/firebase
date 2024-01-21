"use client";
import Button from "@/components/Button";
import ImageNext from "@/components/Image";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { Controller, useForm } from "react-hook-form";
import { useRegister } from "@/services/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InterestinterestinterestPage() {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      username: "",
    },
  });

  const { mutate: registerUser, isPending: isPendingRegister } = useRegister({
    options: {
      onSuccess: (res: any) => {
        console.log("@res", res);

        if (res?.data?.message === "User already exists") {
          alert(res?.data?.message);
        } else if (res?.data?.message === "User has been created successfully") {
          alert(res?.data?.message);
          router.push("/login");
        }

        reset();
      },
    },
  });

  const onSubmit = async (data: any) => {
    const { email, password, username } = data;

    registerUser({ email, password, username });
  };

  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm h-dvh bg-gradient-radial-base px-5">
          {/* Header Start */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <ImageNext
                onClick={() => router.push("/")}
                src="/back.svg"
                alt="back"
                width={10}
                height={10}
                className="w-auto"
              />
              <Text label="Back" className="font-bold not-italic text-sm text-white" />
            </div>

            <Text
              label="Save"
              className="font-bold not-italic text-sm text-[#ABFFFD] cursor-pointer"
            />
          </div>
          {/* Header End */}

          <Text
            label="Tell everyone about yourself"
            className="font-bold not-italic text-sm text-[#94783E] mt-20"
          />

          <Text label="What interest you?" className="font-bold not-italic text-xl text-white" />

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
                classNameInput="mt-8 block w-full bg-white/20 rounded-md border-0 p-3 text-white shadow-sm placeholder:text-white/40 sm:text-sm"
                placeholder="Create Username"
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}
