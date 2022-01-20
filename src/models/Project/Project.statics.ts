import { ProjectStatics } from './Project.types';

const PROJECT_NOT_FOUND = 'Project not found';

const projectStatics: ProjectStatics = {
  getByKey: async function (key) {
    const project = await this.findOne({ key });

    if (!project) {
      throw PROJECT_NOT_FOUND;
    }

    return project;
  },
};

export default projectStatics;
