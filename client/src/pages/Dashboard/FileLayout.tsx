import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { TagsInput } from "react-tag-input-component";

const FileLayout = () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <Breadcrumb pageName="Add File" />

      <div className="w-full">
        <div className="flex flex-col w-full">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Upload File
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
              <div className="flex flex-col gap-5.5 p-6.5">
              <div className='mb-3'>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
              <div className='mb-3'>
                <label className="mb-3 block text-black dark:text-white">
                  Add Filters
                </label>
                <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="fruits"
                    placeHolder="enter filters"
                  />
              </div>
            </div>

                <button disabled={true} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray disabled:opacity-50">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileLayout;
