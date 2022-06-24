import { UnitMethods } from './Unit.types';
import { EntityFieldDescriptions } from '../../constants/fields';

const unitMethods: UnitMethods = {
  updateDataFields: async function (data = {}) {
    const unsupportedFields = Object.keys(data).filter(
      fieldName => !EntityFieldDescriptions.unit[fieldName],
    );

    if (unsupportedFields.length) {
      throw new Error(`Fields not supported: ${unsupportedFields.join(', ')}`);
    }

    const dataToSet = {
      ...data,
      updated: new Date().toISOString(),
    };

    this.set(
      'data',
      Object.entries(dataToSet).reduce((acc, [name, value]) => {
        if (value === null) {
          const { [name]: _, ...rest } = acc;
          return rest;
        }
        return {
          ...acc,
          [name]: value,
        };
      }, this.data),
    );

    await this.save();
  },
};

export default unitMethods;
