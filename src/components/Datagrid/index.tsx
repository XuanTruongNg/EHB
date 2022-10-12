import { Stack } from '@mui/material';
import { DataGrid, DataGridProps, GridSortItem } from '@mui/x-data-grid';
import { resourceText } from 'core/constant/resource';
import { ObjectLiteral } from 'core/interface/api';
import { Rows } from 'core/interface/table';
import { useEffect, useState } from 'react';

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
    onChange && onChange(paginationData);
  }, [paginationData, onChange]);

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
      onPageSizeChange={(pageSize) => {
        setPaginationData((prev) => ({ ...prev, pageSize }));
      }}
      page={page}
      onPageChange={(_page) => {
        setPaginationData((prev) => ({ ...prev, page: _page }));
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
