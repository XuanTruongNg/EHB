import { Stack } from '@mui/material';
import { DataGrid, DataGridProps, GridSortItem } from '@mui/x-data-grid';
import { resourceText } from 'core/constant/resource';
import { ObjectLiteral } from 'core/interface/api';
import { Rows } from 'core/interface/table';
import { useEffect, useState } from 'react';

interface GridSortItemC<T> extends Omit<GridSortItem, 'field'> {
  field: keyof T;
}
export interface PaginationData<T> {
  page: number;
  pageSize: number;
  sort: GridSortItemC<T>[];
}

interface Props<T extends ObjectLiteral> extends Omit<DataGridProps, 'rows'> {
  rows: Rows<T>;
  onChange?: (paginationData: PaginationData<T>) => void;
}

const DatagridC = <T extends ObjectLiteral>({
  disableColumnMenu = true,
  hideFooterSelectedRowCount = true,
  pagination = true,
  rowsPerPageOptions = [10, 20, 50, 100],
  paginationMode = 'server',
  onChange,
  ...rest
}: Props<T>) => {
  const [paginationData, setPaginationData] = useState<PaginationData<T>>({
    pageSize: rowsPerPageOptions[0] || 10,
    page: 0,
    sort: [],
  });

  useEffect(() => {
    onChange && onChange(paginationData);
  }, [paginationData, onChange]);

  return (
    <DataGrid
      {...rest}
      disableColumnMenu={disableColumnMenu}
      hideFooterSelectedRowCount={hideFooterSelectedRowCount}
      pagination={pagination}
      paginationMode={paginationMode}
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
      onPageSizeChange={(pageSize) => {
        setPaginationData((prev) => ({ ...prev, pageSize }));
      }}
      onPageChange={(page) => {
        setPaginationData((prev) => ({ ...prev, page }));
      }}
      sortingMode="server"
      onSortModelChange={(e: GridSortItemC<T>[]) => {
        setPaginationData((prev) => ({ ...prev, sort: e }));
      }}
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
