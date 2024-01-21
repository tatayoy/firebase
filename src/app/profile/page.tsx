"use client";
import ImageNext from "@/components/Image";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { useProfile } from "@/services/profile/useProfile";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, useEffect, FC } from "react";
import { Control, Controller, FieldValues, UseFormGetValues, set, useForm } from "react-hook-form";

interface CardComponentInterface {
  title: string;
  control: Control<
    { name: string; birthday: string; height: number; weight: number; interests: never[] },
    any
  >;
  desc: string;
  handleChangeImageBase64: (e: any, type: string) => void;
  isEditAbout?: boolean;
  isEditInterest?: boolean;
  setIsEditAbout?: Dispatch<SetStateAction<boolean>>;
  setIsEditInterest?: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
  fieldsAbout?:
    | fieldsAboutOjbInterface[]
    | (
        | { label: string; name: string; type: string; placeholder: string; option?: undefined }
        | {
            label: string;
            option: { label: string; value: string }[];
            name: string;
            type: string;
            placeholder: string;
          }
      )[]
    | undefined;
  getValues?: UseFormGetValues<{
    name: string;
    birthday: string;
    height: number;
    weight: number;
    interests: never[];
  }>;
}

interface fieldsAboutOjbInterface {
  label: string;
  option?: { label: string; value: string }[] | undefined;
  name: string;
  type: string;
  placeholder: string;
}

interface FieldsAboutInterface {
  control: Control<
    { name: string; birthday: string; height: number; weight: number; interests: never[] },
    any
  >;
  fieldsAbout:
    | fieldsAboutOjbInterface[]
    | (
        | { label: string; name: string; type: string; placeholder: string; option?: undefined }
        | {
            label: string;
            option: { label: string; value: string }[];
            name: string;
            type: string;
            placeholder: string;
          }
      )[]
    | undefined;
}

export default function ProfilePage() {
  const [isEditAbout, setIsEditAbout] = useState(false);
  const [isEditInterest, setIsEditInterest] = useState(false);

  const router = useRouter();

  const fieldsAbout = [
    {
      label: "Display name:",
      name: "name",
      type: "text",
      placeholder: "Enter name",
    },
    {
      label: "Gender:",
      option: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
      name: "gender",
      type: "select",
      placeholder: "Select gender",
    },
    {
      label: "Birthday:",
      name: "birthday",
      type: "date",
      placeholder: "DD MM YYYY",
    },
    {
      label: "Horoscope:",
      name: "horosc",
      type: "text",
      placeholder: "Enter horoscope",
    },
    {
      label: "Zodiac:",
      name: "zodiac",
      type: "text",
      placeholder: "Enter zodiac",
    },
    {
      label: "Height:",
      name: "height",
      type: "number",
      placeholder: "Enter height",
    },
    {
      label: "Weight:",
      name: "weight",
      type: "number",
      placeholder: "Enter weight",
    },
  ];

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      name: "",
      birthday: "",
      height: 0,
      weight: 0,
      interests: [],
    },
  });

  const onSubmit = async (data: any) => {
    const { email, password, username } = data;
  };

  const {
    data: dataProfile,
    isPending: isPendingProfile,
    refetch: refetchProfile,
  } = useProfile({
    options: {
      onSuccess: () => {},
    },
  });

  const handleChangeImageBase64 = (e: any, type: string) => {
    let url = e.target.value;
    let ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();

    if (
      e.target.files &&
      e.target.files[0] &&
      (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")
    ) {
      let reader = new FileReader();

      reader.onload = function (e) {
        switch (type) {
          case "banner":
            localStorage.setItem("banner", reader.result as any);
            break;
          case "avatar":
            localStorage.setItem("avatar", reader.result as any);
            break;
          default:
            break;
        }

        window.location.reload();
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    const handleCheckIsLogin = () => {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        router.push("/");
      }
    };

    handleCheckIsLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleInterest = () => {
      const parseInterest = JSON.parse(localStorage.getItem("interest") as string);

      if (parseInterest) {
        setValue("interests", parseInterest);
      }
    };

    handleInterest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm h-dvh bg-[#09141A] px-5 overflow-auto">
          {isPendingProfile ? (
            <Text
              label="Loading..."
              className="font-bold not-italic text-2xl text-white text-center mt-6"
            />
          ) : (
            <div>
              <div className="p-2 flex items-center justify-between">
                <div
                  onClick={() => {
                    const confirm = window.confirm("Are you want to log out ?");
                    if (confirm) {
                      localStorage.removeItem("access_token");
                      router.push("/");
                    }
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
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
                  label={`@${dataProfile?.data?.data?.username}`}
                  className="font-bold not-italic text-sm text-white"
                />

                <ImageNext
                  src={"/setting.svg"}
                  alt="setting"
                  className="cursor-pointer w-auto"
                  width={20}
                  height={20}
                />
              </div>

              <div className="p-x-0 py-6">
                {/* Card Start */}
                <div className="relative bg-[#162329] rounded-md h-[190px] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(localStorage.getItem("banner") as string) || "/sample_banner.jpeg"}
                    alt="setting"
                    className=" h-[190px] w-full rounded-md bg-cover object-cover object-center bg-center bg-no-repeat"
                  />

                  <label className="cursor-pointer absolute top-2 right-2">
                    <ImageNext
                      src="/pencil.svg"
                      className="shadow-2xl drop-shadow-xl"
                      alt="pencil"
                      width={20}
                      height={20}
                    />

                    <input
                      onChange={(e: any) => handleChangeImageBase64(e, "banner")}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>

                  <Text
                    label={`@${dataProfile?.data?.data?.username}`}
                    className="shadow-2xl drop-shadow-xl font-bold not-italic text-sm text-white absolute bottom-2 left-2"
                  />
                </div>
                {/* Card End */}

                {/* Card Start */}
                <CardComponent
                  onClick={() => setIsEditAbout(true)}
                  title="About"
                  desc="Add in your your to help others know you better"
                  isEditAbout={isEditAbout}
                  setIsEditAbout={setIsEditAbout}
                  handleChangeImageBase64={handleChangeImageBase64}
                  control={control}
                  fieldsAbout={fieldsAbout}
                />
                {/* Card End */}

                {/* Card Start */}
                <CardComponent
                  onClick={() => router.push("/interest")}
                  title="Interest"
                  desc="Add in your interest to find a better match"
                  isEditInterest={isEditInterest}
                  setIsEditInterest={setIsEditInterest}
                  handleChangeImageBase64={handleChangeImageBase64}
                  control={control}
                  getValues={getValues}
                />
                {/* Card End */}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const FieldsAbout = (props: FieldsAboutInterface): any => {
  const { control, fieldsAbout } = props;
  return (
    <div>
      {fieldsAbout?.map((data: fieldsAboutOjbInterface, index: number) => {
        const { label, placeholder, name, type } = data;
        return (
          <div key={index} className="mt-6 grid grid-cols-2 items-center gap-4">
            <Text
              label={label}
              className="shadow-2xl drop-shadow-xl font-medium not-italic text-xs text-white/30"
            />

            <Controller
              control={control}
              rules={{
                required: "Name is required",
              }}
              name={name as "name" | "birthday" | "height" | "weight" | "interests"}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  onChange={onChange}
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  type={type}
                  required
                  classNameInput="block w-full bg-white/20 rounded-md border-0 p-3 text-white shadow-sm placeholder:text-white/40 sm:text-sm"
                  placeholder={placeholder}
                />
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export const CardComponent = (props: CardComponentInterface): any => {
  const {
    title,
    desc,
    onClick,
    isEditAbout,
    isEditInterest,
    setIsEditAbout,
    setIsEditInterest,
    handleChangeImageBase64,
    control,
    fieldsAbout,
    getValues,
  } = props;

  return (
    <div
      className={`rounded-md ${
        isEditAbout || (getValues && getValues("interests").length) ? "h-auto" : "h-[120px]"
      } w-full p-2 bg-[#0E191F] mt-6`}
    >
      {isEditAbout ? (
        <div>
          <div className="flex justify-between items-center">
            <Text
              label={title}
              className="shadow-2xl drop-shadow-xl font-bold not-italic text-sm text-white"
            />

            <Text
              onClick={() => setIsEditAbout && setIsEditAbout(false)}
              label="Save & Update"
              className="shadow-2xl drop-shadow-xl font-medium not-italic text-xs text-[#94783E] cursor-pointer"
            />
          </div>

          <label className="cursor-pointer flex gap-2 mt-4 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={localStorage.getItem("avatar") || "/avatar-placeholder.svg"}
              alt="avatar-placeholder"
              className="h-[57px] w-[57px] rounded-lg bg-center bg-no-repeat object-cover object-center"
            />

            <Text
              label="Add image"
              className="shadow-2xl drop-shadow-xl font-medium not-italic text-xs text-white"
            />

            <input
              onChange={(e: any) => handleChangeImageBase64(e, "avatar")}
              id="file-upload-avatar"
              name="file-upload-avatar"
              type="file"
              className="sr-only"
            />
          </label>

          <FieldsAbout control={control} fieldsAbout={fieldsAbout} />
        </div>
      ) : getValues && getValues("interests").length ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <Text
              label={title}
              className="shadow-2xl drop-shadow-xl font-bold not-italic text-sm text-white"
            />

            <ImageNext
              onClick={onClick}
              src="/pencil.svg"
              className="shadow-2xl drop-shadow-xl cursor-pointer"
              alt="pencil"
              width={20}
              height={20}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {getValues("interests").map((data: string, index: number) => {
              return (
                <div key={index} className="rounded-full p-4 bg-white/10 w-fit">
                  <p className="text-center text-white text-sm">{data}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <Text
              label={title}
              className="shadow-2xl drop-shadow-xl font-bold not-italic text-sm text-white"
            />

            <ImageNext
              onClick={onClick}
              src="/pencil.svg"
              className="shadow-2xl drop-shadow-xl cursor-pointer"
              alt="pencil"
              width={20}
              height={20}
            />
          </div>

          <Text
            label={desc}
            className="shadow-2xl drop-shadow-xl font-medium not-italic text-sm text-white/50 mt-8"
          />
        </div>
      )}
    </div>
  );
};
