import { DropdownDataType } from "@/app/util/data.model";

export const filterUniqueByTitle = (array: DropdownDataType[]) => {
  return array.filter((obj, index, self) => 
    index === self.findIndex((o) => o.title === obj.title)
  );
};