import { ObjectId } from 'mongoose';

import { FieldDescription, FieldTypes } from '../types/fields';

const SummaryFieldDescription: FieldDescription<string> = {
  label: 'Summary',
  type: FieldTypes.String,
  nullable: true,
  updatable: true,
};

const AuthorFieldDescription: FieldDescription<ObjectId> = {
  label: 'Author',
  type: FieldTypes.User,
  nullable: false,
  updatable: false,
};

const ProgressFieldDescription: FieldDescription<number> = {
  label: 'Progress',
  type: FieldTypes.Number,
  nullable: false,
  updatable: true,
  validation: {
    min: 0,
    max: 0,
    defaultValue: 0
  }
}

export const EntityFieldDescriptions = {
  unit: {
    summary: SummaryFieldDescription,
    author: AuthorFieldDescription,
    progress: ProgressFieldDescription,
  },
};
