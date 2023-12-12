import SearchIcon from "@mui/icons-material/Search";
import { UserIcon } from "../icons";
const SearchBar = () => {
  return (
    <div className="flex justify-between items-center mb-4 w-full ">
      <div className="flex  ml-4 w-400  text-gray-400 gap-1 p-2 items-center  bg-blue-100  rounded-[60px] overflow-hidden">
        <SearchIcon className=" cursor-pointer ml-2" />
        <input
          className="flex-1  ml-1 p-1  text-gray-400  bg-blue-100   outline-none  "
          type="search"
          placeholder="Search items"
        />
      </div>
      <div className="flex items-center space-x-4 mr-4 ">
        <div className="flex items-center">
          <UserIcon />
          <div className="flex flex-col ml-2">
            <span className="text-sm font-semibold">Hieuhv2</span>
            <span className="text-xs font-semibold bg-blue-500 text-white py-1 px-2 rounded-full mt-1">
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
