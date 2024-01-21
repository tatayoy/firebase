"use client";
import { CardComponent } from "@/components/CardComponent";
import ImageNext from "@/components/Image";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { useProfile } from "@/services/profile/useProfile";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, useEffect, FC } from "react";
import { Control, Controller, FieldValues, UseFormGetValues, set, useForm } from "react-hook-form";

export interface CardComponentInterface {
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

export interface fieldsAboutOjbInterface {
  label: string;
  option?: { label: string; value: string }[] | undefined;
  name: string;
  type: string;
  placeholder: string;
}

export interface FieldsAboutInterface {
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
