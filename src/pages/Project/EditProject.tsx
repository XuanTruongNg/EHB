import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import EditProjectForm from "containers/Project/AddEditProject/EditProjectForm";
import ResourceTable from "containers/Project/AddEditProject/ResourceTable";
import EditMemberModal from "containers/Project/EditMember/EditMemberModal";
import { FilterParams } from "core/interface/api";
import { ResourceInProject as ResourceModel } from "core/interface/models";
import { useGetProjectById, useGetProjectType } from "hooks";
import { dataToOptions } from "util/";

type SFilter = FilterParams<ResourceModel> | undefined;

const EditProject = () => {
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(true);
  const [filterData, setFilterData] = useState<SFilter>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projectTypes } = useGetProjectType();
  const { id } = useParams<{ id: string }>();

  const { project, isFetching } = useGetProjectById({
    id: Number(id) || undefined,
  });

  const projectTypeData = useMemo(() => dataToOptions(projectTypes, "name", "id"), [projectTypes]);

  return (
    <>
      <EditProjectForm
        isEditDisabled={isEditDisabled}
        setIsEditDisabled={setIsEditDisabled}
        projectTypeData={projectTypeData}
        project={project}
      >
        <ResourceTable
          project={project}
          isFetching={isFetching}
          filterData={filterData}
          setFilterData={setFilterData}
          setIsModalOpen={setIsModalOpen}
        />
      </EditProjectForm>
      <EditMemberModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default EditProject;
