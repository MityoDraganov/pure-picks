import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Button } from "../../../Components/ui/button";
import { InputGroup } from "../../../Components/InputGroup";
import { Search } from "lucide-react";
import useFormData from "../../../hooks/useForm";

interface SearchBarProps {
  searchCriteria: {
    searchInput: string;
  };
  setSearchCriteria: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchBar = ({ searchCriteria, setSearchCriteria }: SearchBarProps) => {




  return (
    <div className="flex gap-4 items-center pl-[5%] pt-4 pb-8 w-full">

      <InputGroup
        label="Search:"
        placeHolder="Search..."
        value={searchCriteria.searchInput}
        onChange={setSearchCriteria}
        id="searchInput"
        absoluteLabel
        className="w-[40%]"
      />

      <Button size="icon" ><Search /></Button>
    </div>
  );
};
