import { Stack } from '@mui/material';
import { DataGrid, DataGridProps, GridRowsProp } from '@mui/x-data-grid';
import { resourceText } from 'core/constant/resource';
import { FC, useState } from 'react';

interface Props extends DataGridProps {
  rows: GridRowsProp<{ id: string | number }>;
}

const DatagridC: FC<Props> = ({
  disableColumnMenu = true,
  hideFooterSelectedRowCount = true,
  pagination = true,
  rowsPerPageOptions = [10, 20, 50, 100],
  ...rest
}) => {
  const [pageSize, setPageSize] = useState<number>(rowsPerPageOptions[0] || 10);
  return (
    <DataGrid
      {...rest}
      disableColumnMenu={disableColumnMenu}
      hideFooterSelectedRowCount={hideFooterSelectedRowCount}
      pagination={pagination}
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
      pageSize={pageSize}
      onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
      rowsPerPageOptions={
        rowsPerPageOptions.length ? rowsPerPageOptions : undefined
      }
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
