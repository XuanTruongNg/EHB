import { Box, Typography, TypographyProps } from "@mui/material";
import { FC, ReactNode, useMemo } from "react";
import { useFormContext } from "react-hook-form";
interface Props {
  title?: string;
  name?: string;
  labelStyle?: TypographyProps["sx"];
  errorStyle?: TypographyProps["sx"];
  dir?: "row" | "column";
  children?: ReactNode;
}

export const FieldWrapper: FC<Props> = ({ title, children, name, labelStyle, errorStyle, dir = "row" }) => {
  const { formState } = useFormContext();

  const errorText = useMemo(() => {
    if (!name) return null;
    const error = formState.errors[name]?.message;
    if (typeof error === "string") return error;
    return null;
  }, [name, formState]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: dir,
      }}
    >
      <Typography sx={{ width: "200px", ...labelStyle }}>{title}</Typography>
      <Box>
        {children}
        {errorText && (
          <Typography sx={{ color: "red", fontSize: 12, marginTop: "5px", ...errorStyle }}>{errorText}</Typography>
        )}
      </Box>
    </Box>
  );
};
