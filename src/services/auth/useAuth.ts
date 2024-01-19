import { useMutation } from "@tanstack/react-query";
import { client } from "../client";

function useSignIn({ options }: any) {
  return useMutation({
    mutationFn: (reqBody) =>
      client("/authentication/login", {
        method: "POST",
        data: reqBody,
      }),
    ...options,
  });
}

function useLogOut({ options }: any) {
  return useMutation({
    mutationFn: (reqBody) =>
      client("/authentication/logout", {
        method: "POST",
        data: reqBody,
      }),
    ...options,
  });
}

export { useSignIn, useLogOut };
