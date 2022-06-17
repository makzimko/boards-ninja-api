export enum FieldTypes {
  'String',
  'Number',
  'User',
}

export type FieldDescription = {
  label: string;
  type: FieldTypes;
  nullable: boolean;
  updatable: boolean;
};

export type Field = {
  name: string;
  value: unknown;
};
