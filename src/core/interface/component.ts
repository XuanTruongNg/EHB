export type CustomFC<T extends object> = React.FunctionComponent<
  T & { children?: React.ReactNode }
>;
