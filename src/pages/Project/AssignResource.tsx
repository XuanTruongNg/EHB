import { Box, Button, Slide } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssignResourceHeader from "containers/Project/AssignResource/AssignResourceHeader";
import ResourceSearchForm from "containers/Project/AssignResource/ResourceSearchForm";
import ResourceTable from "containers/Project/AssignResource/ResourceTable";
import { buttonText, HEADER_MARGIN, PAGE_HEADER_MARGIN } from "core/constant";
import { FilterParams } from "core/interface/api";
import { Resource as ResourceModel } from "core/interface/models";
import { useAddResourcesToProject, useGetHardSkill, useGetResource, useGetRole } from "hooks";
import { dataToOptions } from "../../util";

type SFilter = FilterParams<ResourceModel> | undefined;

const AssignResource = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState<SFilter>(undefined);
  const [isSearchFormCollapse, setIsSearchFormCollapse] = useState(false);
  const [selectedResources, setSelectedResources] = useState<number[]>([]);
  const { id } = useParams<{ id: string }>();

  const { hardSkills } = useGetHardSkill();
  const skillData = useMemo(() => dataToOptions(hardSkills, "title", "id"), [hardSkills]);

  const { roles } = useGetRole();
  const roleData = useMemo(() => dataToOptions(roles, "title", "id"), [roles]);

  const { resources, isFetching } = useGetResource(filterData);

  const addMembersToProject = useAddResourcesToProject();

  const handleAssignResources = () => {
    addMembersToProject({
      id: Number(id),
      resourceIdList: selectedResources,
    });
    navigate(-1);
  };

  return (
    <>
      <AssignResourceHeader />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flex: 1,
          overflow: "auto",
          height: `calc(100vh - ${HEADER_MARGIN + PAGE_HEADER_MARGIN}px)`,
        }}
      >
        <Slide direction="down" in={!isSearchFormCollapse} mountOnEnter unmountOnExit>
          <Box>
            <ResourceSearchForm setFilterData={setFilterData} roleData={roleData} skillData={skillData} />
          </Box>
        </Slide>

        <ResourceTable
          resources={resources}
          isFetching={isFetching}
          setSelectedResources={setSelectedResources}
          isSearchFormCollapse={isSearchFormCollapse}
          setIsSearchFormCollapse={setIsSearchFormCollapse}
          setFilterData={setFilterData}
          filterData={filterData}
        />

        <Box
          sx={{
            display: "flex",
            gap: "20px",
            justifyContent: "end",
            p: "32px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "secondary.light",
              ":hover": {
                backgroundColor: "secondary.light",
                opacity: 0.8,
              },
              width: "150px",
              fontSize: "16px",
            }}
            type="button"
            onClick={() => navigate(-1)}
          >
            {buttonText.CANCEL}
          </Button>

          <Button
            sx={{
              backgroundColor: "secondary.main",
              ":hover": {
                backgroundColor: "secondary.main",
                opacity: 0.8,
              },
              width: "150px",
              fontSize: "16px",
            }}
            onClick={handleAssignResources}
          >
            {buttonText.ASSIGN}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AssignResource;
