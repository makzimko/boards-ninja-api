import { Schema } from 'mongoose';

import { IProjectDocument } from './Project.types';

const ProjectSchema = new Schema<IProjectDocument>({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
});

export default ProjectSchema;
