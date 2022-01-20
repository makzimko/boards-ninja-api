import { Schema } from 'mongoose';

import { IProjectDocument } from './Project.types';
import projectStatics from './Project.statics';
import projectMethods from './Project.methods';

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

ProjectSchema.static(projectStatics);
ProjectSchema.method(projectMethods);

export default ProjectSchema;
