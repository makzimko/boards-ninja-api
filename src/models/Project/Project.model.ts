import { model } from 'mongoose';

import { IProjectDocument, IProjectModel } from './Project.types';
import ProjectSchema from './Project.schema';

const ProjectModel = model<IProjectDocument, IProjectModel>(
  'Project',
  ProjectSchema,
);

export default ProjectModel;
