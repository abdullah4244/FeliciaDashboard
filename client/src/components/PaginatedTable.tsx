import { Table } from 'antd'
import { ColumnType } from 'antd/es/table'

interface PaginatedTableProps<T extends object> {
    columns : ColumnType<T>[];
    tableData : T[];
    isLoading : boolean;
    currentPage : number;
    limit : number;
    totalCount : number;
    setCurrentPage : (page:number) => void;
    setLimit : (page:number) => void
}
const PaginatedTable = <T extends object> ({columns,tableData,isLoading,currentPage,limit,totalCount,setCurrentPage , setLimit} : PaginatedTableProps<T>) => {
  return (
    <>
      <Table columns={columns} dataSource={tableData} loading={isLoading} 
              pagination={
                {current: currentPage,
                 pageSize : limit,
                 total:totalCount,
                 showSizeChanger : true,
                 onChange(page, pageSize) {
                        setCurrentPage(page)
                        setLimit(pageSize)
                         },
                 }}
        />
    </>
  )
}

export default PaginatedTable