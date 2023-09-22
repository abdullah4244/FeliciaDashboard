import PaginatedTable from '../../components/PaginatedTable.js';
import type { ColumnsType } from 'antd/es/table';
import { useGetAllFiltersQuery, useGetFilesQuery } from '../../store/services/api.js';
import { File } from '../../store/servicesTypes/fileTypes.js';
import { useState } from 'react';
import FiltersDropDown from '../../components/FiltersDropDown.js';

const columnsCreator = () : ColumnsType<File> => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Url',
    key: 'url',
    dataIndex: 'url',
    render:(_,record)=>(
      <a onClick={(e)=>{
        e.preventDefault()
        window.open(record.url)
      }}>{record.url}</a>
    )
  },
];

const Home = () => {
  const [filters,setFilters] = useState<string[]>([]);
  const outputString = filters.map(tag => `filter[]=${tag}`).join('&');
  const{data:files={data :[]},isLoading} = useGetFilesQuery(outputString)
  const columns = columnsCreator();
  const [limit,setLimit] = useState(10);
  const [currentPage,setCurrentPage] = useState(1);
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-2 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 py-2 px-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className='mb-0 flex justify-between col-span-12'>
        <h3 className="font-medium text-black dark:text-white">
                Files
          </h3>
           <FiltersDropDown setFilters={(value)=>setFilters(value)}/>
        </div>
        <div className="col-span-12 xl:col-span-12">
        <PaginatedTable columns={columns} 
          tableData={files.data} 
          currentPage={currentPage}
          isLoading={isLoading} 
          limit={limit} 
          setCurrentPage={setCurrentPage} 
          setLimit={setLimit} 
          totalCount={files.data.length}/>
        </div>
      </div>
    </>
  );
};

export default Home;
