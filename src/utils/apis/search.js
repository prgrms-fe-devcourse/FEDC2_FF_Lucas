import { useQuery } from "react-query";
import axios from "axios";

const useSearch = query =>
  useQuery(
    [`/search/all/${query}`, query],
    async () => {
      const { data } = await axios({
        method: "GET",
        url: `search/all/${query}`,
      });
      return data;
    },
    {
      enabled: !!query,
    },
  );

export default useSearch;
