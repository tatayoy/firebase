import { useQuery } from "@tanstack/react-query";
import { client } from "../client";

const fetchMusics = async ({ query = {} }) => {
  return client("/search", {
    params: {
      term: "Json Mraz",
      country: "",
      ...query,
    },
  }).then((data) => data);
};

const useListMusics = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["list-music", query],
    queryFn: () => fetchMusics({ query }),
    ...options,
  });
};

export { useListMusics };
