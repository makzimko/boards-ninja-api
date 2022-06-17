import { FieldDescription, FieldTypes } from '../types/fields';

const SummaryFieldDescription: FieldDescription = {
  label: 'Summary',
  type: FieldTypes.String,
  nullable: true,
  updatable: true,
};

const AuthorFieldDescription: FieldDescription = {
  label: 'Author',
  type: FieldTypes.User,
  nullable: false,
  updatable: false,
};

export const EntityFieldDescriptions = {
  unit: {
    summary: SummaryFieldDescription,
    author: AuthorFieldDescription,
  },
};
