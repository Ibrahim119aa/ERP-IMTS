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

const AsssignStudentsCounselor = ({ trigger, selectedStudents }) => {
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

        let a = await axios.put(`${apiUrl}/assign-counsellor-to-student`,
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
      alert("Select Alteast One Slot")
    }

  };
  const [dataList, setdatalist] = useState([]);
  const getCounsellor = async () => {
    let a = await axios.get(`${apiUrl}/counsellor/get-counsellor`);
    console.log(a.data);

    setdatalist(a.data);


  }
  useEffect(() => {
    const fetchData = async () => {
      await getCounsellor();
    }
    fetchData();
    console.log(dataList);

  }, [])

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto items-center"
        >

          <Popover
            open={isSelectorPopUpOpen}
            onOpenChange={setIsSelectorPopUpOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[220px] justify-between"
              >
                {selectorValue
                  ? dataList.find(
                    (framework) => framework.id.toString() === selectorValue
                  )?.full_name
                  : "Select Responsible Person..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search counselors..." />
                <CommandList className="max-h-60 overflow-y-auto">
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {dataList.map((framework) => (
                      <CommandItem
                        key={framework.id}
                        value={`${framework.id}`}
                        onSelect={(currentValue) => {
                          setSelectorValue(
                            currentValue === selectorValue ? "" : currentValue
                          );
                          setIsSelectorPopUpOpen(false);
                        }}
                      >
                        {framework.full_name}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectorValue === framework.full_name
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

export default AsssignStudentsCounselor;
