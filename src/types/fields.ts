export enum FieldTypes {
  'String',
  'Number',
  'User',
  'Date',
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
  };
};

export type Fields = Record<string, unknown>;

export type Field = {
  name: string;
  value: unknown;
};

export type PickerOption = {
  id: string;
  name: string;
};

export type PickerOptions = PickerOption[];
