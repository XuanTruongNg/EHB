import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { assignResourcePlaceholder, assignResourceText, buttonText } from "core/constant";
import { AutocompleteC, FormWrapper, SelectC, SliderC } from "core/form";
import { FilterParams } from "core/interface/api";
import { Resource as ResourceModel } from "core/interface/models";
import { FilterResourcesForm, SearchResourcesParams } from "core/interface/resource";
import { SelectOption } from "core/interface/select";
import { filterResourcesSchema } from "./formConfig";

type SFilter = FilterParams<ResourceModel> | undefined;
interface Props {
  roleData: SelectOption[];
  skillData: SelectOption[];
  setFilterData: (_filterData: SFilter) => void;
}

const ResourceSearchForm: FC<Props> = ({ roleData, skillData, setFilterData }) => {
  const methods = useForm<FilterResourcesForm>({
    resolver: yupResolver(filterResourcesSchema),
  });

  const handleSearch = (data: FilterResourcesForm) => {
    const searchParams: SearchResourcesParams = {
      roleId: data.roleId,
      skillIdList: data.hardSkillIds,
      minExp: data.yoeRange[0],
      maxExp: data.yoeRange[1],
    };

    setFilterData((prev: SFilter) => ({ ...prev, ...searchParams }));
  };

  return (
    <Box
      sx={{
        p: "32px",
        borderBottom: "1px solid",
        borderColor: "secondary.light",
      }}
    >
      <FormWrapper onSubmit={handleSearch} methods={methods}>
        <Stack spacing={2}>
          <SelectC
            name="roleId"
            title={assignResourceText.ROLE}
            placeholder={assignResourcePlaceholder.ROLE}
            options={roleData}
          />
          <AutocompleteC
            name="hardSkillIds"
            title={assignResourceText.SKILLS}
            placeholder={assignResourcePlaceholder.SKILLS}
            options={skillData}
            multiple
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "65%",
            }}
          >
            <SliderC name="yoeRange" title={assignResourceText.YOE} />
            <Button type="submit">{buttonText.SEARCH}</Button>
          </Box>
        </Stack>
      </FormWrapper>
    </Box>
  );
};

export default ResourceSearchForm;
