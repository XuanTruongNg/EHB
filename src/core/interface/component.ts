import { FC, ReactNode } from "react";

export type CustomFC<T extends object> = FC<T & { children?: ReactNode }>;
