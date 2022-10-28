import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { ObjectLiteral } from "./api";

type ColumnField<T> = Extract<keyof T, string>;

interface Column<T extends GridValidRowModel, V extends string = ""> extends GridColDef<T> {
  field: ColumnField<T> | V;
}

export type Columns<T extends GridValidRowModel, ExtraColums extends string = ""> = Column<T, ExtraColums>[];

type Row<T extends ObjectLiteral> = { id: number | string } & Partial<{
  [_key in keyof T]: string | number | boolean | object | null | undefined;
}>;
export type Rows<T extends ObjectLiteral> = Row<T>[];
