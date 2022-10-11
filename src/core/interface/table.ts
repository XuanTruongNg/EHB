import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { ObjectLiteral } from './api';

interface Column<T extends GridValidRowModel, V extends string = ''>
  extends Omit<GridColDef<T>, 'field'> {
  field: keyof T | V;
}

export type Columns<
  T extends GridValidRowModel,
  ExtraColums extends string = ''
> = Column<T, ExtraColums>[];

type Row<T extends ObjectLiteral> = { id: number | string } & Partial<{
  [key in keyof T]: any;
}>;
export type Rows<T extends ObjectLiteral> = Row<T>[];
