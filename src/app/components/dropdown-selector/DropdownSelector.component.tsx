import { usDropdownData } from "@/app/util/data";
import { Dropdown } from "../dropdown/Dropdown.component";
import { ChangeEventHandler, useRef, useState } from "react";
import { DropdownDataType } from "@/app/util/data.model";
import classNames from "classnames";
import { DropdownRef } from "../dropdown/Dropdown.model";
import { KeyboardArrowDown, NewReleases } from "@mui/icons-material";

import styles from "./DropdownSelector.module.scss";
import { filterUniqueByTitle } from "./DropdownSelector.util";

export const DropdownSelector = () => {
  const DROPDOWN_DATA = usDropdownData();
  const [selected, setSelected] = useState<DropdownDataType>();
  const [options, setOptions] = useState<DropdownDataType[]>(DROPDOWN_DATA);
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<DropdownRef>(null);

  const selectItem = (value: DropdownDataType) => {
    setValue("")
    setSelected(value);
    dropdownRef.current?.close();
  };
  const isSelected = (value: DropdownDataType) => selected?.id === value.id;

  const closeDropdownHandler = () => {
    setIsOpen(false);
  };

  const openDropdownHandler = () => {
    setIsOpen(true);
  };

  const changeInputHandler: ChangeEventHandler<HTMLInputElement> = (
    inputEvent
  ) => {
    setValue(inputEvent.target.value);

    if (typeof window !== "undefined") {
      document.addEventListener("keyup", (_event) => {
        if (_event.keyCode === 13) {
             const localSelected = {
            id: Math.random(),
            title: inputEvent.target.value,
            icon: <NewReleases fontSize="small" className="ml-2" />,
          };
        setSelected(localSelected);

        setOptions((prevOptions) => [...prevOptions, localSelected]);
        }
      });
    }
  };

  const RenderDropdownContent = (
    <div className="relative">
      <input
        className={classNames(
          "w-full cursor-pointer border rounded-lg p-2 text-gray-700 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
        )}
        value={value || (selected?.title ? String(selected?.title) : "")}
        onChange={changeInputHandler}
        type="text"
      />

      <KeyboardArrowDown
        fontSize="small"
        className={classNames(
          "transition delay-150 duration-300 ease-in-out ",
          styles["chevron"],
          {
            "rotate-180 ": isOpen,
          }
        )}
      />
    </div>
  );

  return (
    <Dropdown
      onOpen={openDropdownHandler}
      onClose={closeDropdownHandler}
      ref={dropdownRef}
      content={RenderDropdownContent}
    >
      <div className="w-full bg-white py-4 px-2 text-gray-700 flex flex-col">
        {filterUniqueByTitle(options).map((item, index) => (
          <button
            key={item.id + "" + index}
            className={classNames(
              "flex items-center cursor-pointer p-2 mb-1 text-left hover:bg-gray-100 rounded-lg",
              {
                "bg-gray-200 text-blue-500": isSelected(item),
              }
            )}
            onClick={() => selectItem(item)}
          >
            {item.title}

            <span className="" color="inherit">
              {item.icon}
            </span>
          </button>
        ))}
      </div>
    </Dropdown>
  );
};
