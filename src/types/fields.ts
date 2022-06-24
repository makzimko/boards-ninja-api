export enum FieldTypes {
  'String',
  'Number',
  'User',
}

export type FieldDescription<T> = {
  label: string;
  type: FieldTypes;
  nullable: boolean;
  updatable: boolean;
  validation?: {
    min?: number;
    max?: number;
    defaultValue?: T;
  }
};

export type Field = {
  name: string;
  value: unknown;
};
