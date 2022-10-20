import {
  Box,
  Typography,
  Button,
  Slide,
  Link,
  LinearProgress,
} from '@mui/material';
import DatagridC from 'components/Datagrid';
import SearchBar from 'components/SearchBar';
import {
  dashboardText,
  HEADER_MARGIN,
  pageHeaderText,
  PAGE_HEADER_MARGIN,
  PROJECT,
} from 'core/constant';
import { OnGoingProject } from 'core/interface/models';
import { Columns, Rows } from 'core/interface/table';
import { useCallback, useMemo, useState } from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { buttonText } from '../core/constant/button';
import AddProjectModal from 'containers/AddProjectModal';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [isCollapse, setCollapse] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [searchData, setSearchData] = useState<string | undefined>(undefined);

  const handleSearch = useCallback((searchData: string) => {
    setSearchData(searchData || undefined);
  }, []);

  const columns = useMemo<Columns<OnGoingProject>>(
    () => [
      {
        field: 'code',
        headerName: 'Code',
        flex: 1,
        cellClassName: 'FirstColumn-DataGrid',
        headerClassName: 'FirstColumn-DataGrid',
        sortable: false,
      },
      {
        field: 'projectName',
        headerName: 'Project Name',
        flex: 2,
        sortable: false,
      },
      {
        field: 'assignedResources',
        headerName: 'Assigned Resources',
        flex: 2,
        sortable: false,
      },
      {
        field: 'duration',
        headerName: 'Duration',
        flex: 2,
        cellClassName: 'FirstColumn-DataGrid',
        headerClassName: 'FirstColumn-DataGrid',
        sortable: false,
      },
      {
        field: 'burnRate',
        headerName: 'Resource Capacity Burn Rate',
        flex: 6,
        sortable: false,
        renderCell(params) {
          return (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
              }}
            >
              <LinearProgress
                variant="determinate"
                sx={{ height: 20, borderRadius: 50 }}
                value={params.value}
              />
              <Box
                sx={{
                  top: 0,
                  left: params.value < 10 ? params.value : undefined,
                  right:
                    params.value > 10
                      ? `calc(100% - ${params.value}%)`
                      : undefined,
                  bottom: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: 'common.black',
                    fontSize: 12,
                    fontWeight: 600,
                    px: '16px',
                  }}
                >
                  {params.value}%
                </Typography>
              </Box>
            </Box>
          );
        },
      },
    ],
    []
  );

  const tempRows = useMemo<Rows<OnGoingProject>>(
    () => [
      {
        id: 1,
        code: 'RMS',
        projectName: 'RMS',
        assignedResources: 12,
        duration: 'DD/MM/YY - DD/MM/YY',
        burnRate: 50,
      },
      {
        id: 2,
        code: 'PAF',
        projectName: 'Park Avenue',
        assignedResources: 8,
        duration: 'DD/MM/YY - DD/MM/YY',
        burnRate: 100,
      },
      {
        id: 3,
        code: 'STAR',
        projectName: 'STARLIGHT',
        assignedResources: 13,
        duration: 'DD/MM/YY - DD/MM/YY',
        burnRate: 29,
      },
      {
        id: 4,
        code: 'KD',
        projectName: 'Killik Dokter',
        assignedResources: 21,
        duration: 'DD/MM/YY - DD/MM/YY',
        burnRate: 59,
      },
      {
        id: 5,
        code: 'INTERN',
        projectName: 'Internals',
        assignedResources: 2,
        duration: 'DD/MM/YY - DD/MM/YY',
        burnRate: 0,
      },
    ],
    []
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          px: '32px',
          height: 60,
          borderBottom: '1px solid #C1C1C1',
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
          {pageHeaderText.OVERVIEW}
        </Typography>
        <Button
          sx={{
            backgroundColor: 'secondary.main',
            ':hover': {
              backgroundColor: 'secondary.main',
              opacity: 0.8,
            },
          }}
          onClick={() => setOpen((prev) => !prev)}
        >
          {buttonText.ADD_PROJECT}
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'auto',
          height: `calc(100vh - ${HEADER_MARGIN + PAGE_HEADER_MARGIN}%)`,
        }}
      >
        <Box sx={{ p: '16px 16px 4px 32px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="text"
              onClick={() => setCollapse((prev) => !prev)}
              sx={{ minWidth: 32, width: 16, height: 32 }}
            >
              {!isCollapse ? (
                <KeyboardDoubleArrowDownIcon />
              ) : (
                <KeyboardDoubleArrowUpIcon />
              )}
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: '20px 32px', borderTop: '1px solid #C1C1C1' }}>
          <Slide direction="up" in={!isCollapse} mountOnEnter unmountOnExit>
            <Box
              sx={{
                width: '100%',
                minHeight: 445,
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  {dashboardText.TABLE_TITLE}
                  <Link
                    onClick={() => navigate(PROJECT)}
                    sx={{ color: '#0F69EF', ml: 0.5, cursor: 'pointer' }}
                  >
                    {dashboardText.VIEW_ALL}
                  </Link>
                </Typography>
                <SearchBar onChange={handleSearch} />
              </Box>

              <DatagridC columns={columns} rows={tempRows} />
            </Box>
          </Slide>
        </Box>
      </Box>
      <AddProjectModal isOpen={isOpen} setIsOpen={setOpen} />
    </>
  );
};

export default Dashboard;
