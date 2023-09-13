import { FiSearch } from "react-icons/fi";

export interface SearchProps {
  searchVal: any;
  inputSearch: (e: any) => void;
}

const Search = (props: SearchProps) => {
  const { searchVal, inputSearch } = props;

  return (
    <div className="flex justify-center relative w-full h-full mb-2">
      {searchVal === "" && (
        <div className="text-xl z-10 flex justify-center items-center gap-2 text-[#8E8E8E]">
          <FiSearch /> Search
        </div>
      )}
      <input
        type="text"
        className="absolute top-0 left-0 w-full h-full border-[1px] border-solid border-[#DBDBDB] rounded-md flex justify-center items-center outline-none placeholder:flex placeholder:justify-center placeholder:items-center placeholder:text-center px-4"
        onChange={inputSearch}
      />
    </div>
  );
};

export default Search;
