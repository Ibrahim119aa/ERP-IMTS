import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "../../lib/utils";
import axios from "axios";
import { apiUrl } from "../../utile/api";
const AsssignCounselorsManager = ({ trigger, selectedStudents }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [isSelectorPopUpOpen, setIsSelectorPopUpOpen] = useState(false);
  const [selectorValue, setSelectorValue] = useState("");

  /* const handleInputChange = (e) => {
    setValues(e.target.value);
    console.log("values :", values);
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudents.length > 0) {
      try {
        setLoading(true);
        setError(null);
        console.log("Form submitted with values:", values);
        console.log("selected Students :", selectedStudents);
        console.log("selected Counselor :", selectorValue);

        setDetails(values);

        let a = await axios.put(`${apiUrl}/counsellor/assign-counsellor-to-manager`,
          {
            counsellor: selectedStudents,
            manager: selectorValue
          }
        )

        setIsPopoverOpen(false);
        alert(a.data);

      } catch (err) {
        setError("Failed to submit details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    else {
      alert("Select Alteast One Counsellor")
    }

  };

  const [dataList, setdatalist] = useState([]);
  const getCounsellor = async () => {
    let a = await axios.get(`${apiUrl}/manager/get-manager`);
    console.log(a.data);

    setdatalist(a.data);


  }
  useEffect(() => {
    const fetchData = async () => {
      await getCounsellor();
    }
    fetchData();
  }, [])

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  mx-auto items-center"
        >
          {/* <div className="w-[200px] flex flex-col mx-auto">
            <div>
              <label
                htmlFor="counselor"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Counselor
              </label>
              <select
                id="counselor"
                name="counselor"
                defaultValue=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  Select Counselor
                </option>
                <option value="Counselor 1">Counselor 1</option>
                <option value="Counselor 2">Counselor 2</option>
              </select>
            </div>
            <Button className="my-3" variant="outline" type="submit">
              {" "}
              Submit
            </Button>
          </div> */}
          <Popover
            open={isSelectorPopUpOpen}
            onOpenChange={setIsSelectorPopUpOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-[220px] bg-white  justify-between"
              >
                {/* Show selected manager's full name or placeholder */}
                {selectorValue
                  ? dataList.find((framework) => framework.id.toString() === selectorValue)?.full_name
                  : "Select Manager..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search managers..." />
                <CommandList className="max-h-60 overflow-y-auto">
                  <CommandEmpty>No managers found.</CommandEmpty>
                  <CommandGroup>
                    {/* Map through dataList for options */}
                    {dataList.map((framework) => (
                      <CommandItem
                        className="text-[#212539]"
                        key={framework.id}
                        value={`${framework.id}`} // Use id as the value
                        onSelect={(currentValue) => {
                          // Set the selected value
                          setSelectorValue(
                            currentValue === selectorValue ? "" : currentValue
                          );
                          setIsSelectorPopUpOpen(false); // Close the popover
                        }}
                      >
                      
                        {framework.full_name} {/* Display full name */}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectorValue === framework.id.toString()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />

                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            className="my-3 bg-indigo-500 text-white"
            variant="outline"
            type="submit"
          >
            {" "}
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default AsssignCounselorsManager;
