import {  usDropdownData } from "@/app/util/data";
import { Dropdown } from "../dropdown/Dropdown.component";
import { useRef, useState } from "react";
import { DropdownDataType } from "@/app/util/data.model";
import classNames from "classnames";
import { DropdownRef } from "../dropdown/Dropdown.model";
import { KeyboardArrowDown } from "@mui/icons-material";

import styles from './DropdownSelector.module.scss'

export const DropdownSelector = () => {
  const [selected, setSelected] = useState<DropdownDataType>();
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<DropdownRef>(null)
  const DROPDOWN_DATA = usDropdownData()

  const selectItem = (value: DropdownDataType) => {
    setSelected(value)
    dropdownRef.current?.close()
  };
  const isSelected = (value: DropdownDataType) => selected?.id === value.id;

  const closeDropdownHandler = () => {
    setIsOpen(false)
  }

  const openDropdownHandler = () => {
    setIsOpen(true)
  }

  const RenderDropdownContent = (
   <div className="relative">
     <input
      className={classNames("w-full cursor-pointer border rounded-lg p-2 text-gray-700 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500",)}
      value={selected?.title ? String(selected?.title) : ''}
      readOnly
    />

    <KeyboardArrowDown fontSize="small" className={classNames('transition delay-150 duration-300 ease-in-out ', styles['chevron'], {
        'rotate-180 ': isOpen
    })} />
   </div>
  );

  return (
    <Dropdown onOpen={openDropdownHandler} onClose={closeDropdownHandler} ref={dropdownRef} content={RenderDropdownContent}>
      <div className="w-full bg-white py-4 px-2 text-gray-700 flex flex-col">
        {DROPDOWN_DATA.map((item, index) => (
          <button
            key={item.id + "" + index}
            className={classNames("flex items-center cursor-pointer p-2 mb-1 text-left hover:bg-gray-100 rounded-lg", {
              "bg-gray-200 text-blue-500": isSelected(item),
            })}
            onClick={() => selectItem(item)}
          >
            {item.title}

            <span className="" color="inherit"> {item.icon} </span>
          </button>
        ))}
      </div>
    </Dropdown>
  );
};
