import { Stack } from '@mui/material';
import { DataGrid, DataGridProps, GridSortItem } from '@mui/x-data-grid';
import { resourceText } from 'core/constant/resource';
import { ObjectLiteral } from 'core/interface/api';
import { Rows } from 'core/interface/table';
import { useCallback, useEffect, useState } from 'react';

interface GridSortItemC<T> extends Omit<GridSortItem, 'field'> {
  field: keyof T;
}
export interface TableOnChangeData<T> {
  page: number;
  pageSize: number;
  sort: GridSortItemC<T>[];
}

interface Props<T extends ObjectLiteral> extends Omit<DataGridProps, 'rows'> {
  rows: Rows<T>;
  onChange?: (paginationData: TableOnChangeData<T>) => void;
}

const DatagridC = <T extends ObjectLiteral>({
  disableColumnMenu = true,
  hideFooterSelectedRowCount = true,
  pagination = true,
  rowsPerPageOptions = [10, 20, 50, 100],
  paginationMode = 'server',
  onChange,
  rowCount,
  page = 0,
  ...rest
}: Props<T>) => {
  const [paginationData, setPaginationData] = useState<TableOnChangeData<T>>({
    pageSize: rowsPerPageOptions[0] || 10,
    page,
    sort: [],
  });

  const [rowCountState, setRowCountState] = useState(rowCount);
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      !(rowCount === undefined || rowCount < 0) ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  useEffect(() => {
    setPaginationData((prev) => ({ ...prev, page }));
  }, [page]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPaginationData((prev) => ({ ...prev, page: newPage }));
      onChange && onChange({ ...paginationData, page: newPage });
    },
    [onChange, paginationData]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setPaginationData((prev) => ({ ...prev, pageSize: newPageSize }));
      if (typeof rowCountState === 'number' && newPageSize > rowCountState)
        return;
      onChange && onChange({ ...paginationData, pageSize: newPageSize });
    },
    [onChange, paginationData, rowCountState]
  );

  const handleSortChange = useCallback(
    (newSort: GridSortItemC<T>[]) => {
      setPaginationData((prev) => ({ ...prev, sort: newSort }));
      onChange && onChange({ ...paginationData, sort: newSort });
    },
    [onChange, paginationData]
  );

  return (
    <DataGrid
      {...rest}
      disableColumnMenu={disableColumnMenu}
      hideFooterSelectedRowCount={hideFooterSelectedRowCount}
      pagination={pagination}
      paginationMode={paginationMode}
      rowCount={rowCountState}
      components={{
        NoRowsOverlay: () => (
          <Stack
            height="100%"
            alignItems="center"
            justifyContent="center"
            sx={{ fontSize: 24, fontWeight: 600 }}
          >
            {resourceText.NO_RESULT}
          </Stack>
        ),
        ...rest.components,
      }}
      rowsPerPageOptions={
        rowsPerPageOptions.length ? rowsPerPageOptions : undefined
      }
      pageSize={paginationData.pageSize}
      onPageSizeChange={handlePageSizeChange}
      page={paginationData.page}
      onPageChange={handlePageChange}
      sortingMode="server"
      onSortModelChange={handleSortChange}
      sx={{
        '& .FirstColumn-DataGrid': {
          borderRight: '1px solid rgba(224, 224, 224, 1)',
        },
        '& .MuiDataGrid-columnSeparator': {
          visibility: 'hidden',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 600,
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          justifyContent: 'space-between',
        },
        '& .MuiDataGrid-footerContainer': {},
        '& .MuiToolbar-root': {
          backgroundColor: 'rgba(224, 224, 224, 1)',
        },
        ...rest.sx,
      }}
    />
  );
};

export default DatagridC;
