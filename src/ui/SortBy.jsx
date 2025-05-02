import Select from "../ui/Select";
import { useSearchParams } from "react-router";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      type={"white"}
      onChange={handleChange}
      value={sortBy}
    ></Select>
  );
}

export default SortBy;
