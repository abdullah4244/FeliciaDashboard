import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import FilterIcon from '../images/icon/filter.svg';
import { useGetAllFiltersQuery } from '../store/services/api';
interface FiltersDropDownProps {
 setFilters : (value : string[]) =>void;
}
const FiltersDropDown = ({setFilters}:FiltersDropDownProps) => {
  const{data,isLoading} = useGetAllFiltersQuery();
  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

const handleCheckboxChange = (tag : string) => {
  if (checkedTags.includes(tag)) {
    setCheckedTags(checkedTags.filter(item => item !== tag));
  } else {
    setCheckedTags([...checkedTags, tag]);
  }
};
  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
      <img src={FilterIcon} className='w-6 h-6'/> 
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        className={`z-10 absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          {
            data?.data.map((tag)=>(
              <li key={tag.id} className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'>
                   <input 
                     type='checkbox' 
                     value={tag.tag}
                     checked={checkedTags.includes(tag.tag)} 
                     onChange={() => handleCheckboxChange(tag.tag)}/>   
                     <span>{tag.tag}</span>
              </li>
            ))
          }
        </ul>
        <button onClick={()=>setFilters([...checkedTags])} className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'>
          Apply
        </button>
        
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default FiltersDropDown;
