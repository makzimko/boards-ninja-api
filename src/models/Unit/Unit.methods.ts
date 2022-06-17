import { UnitMethods } from './Unit.types';
import { EntityFieldDescriptions } from '../../constants/fields';

const unitMethods: UnitMethods = {
  updateDataFields: async function (data) {
    const unsupportedFields = Object.keys(data).filter(
      fieldName => !EntityFieldDescriptions.unit[fieldName],
    );

    if (unsupportedFields.length) {
      throw new Error(`Fields not supported: ${unsupportedFields.join(', ')}`);
    }

    this.set(
      'data',
      Object.entries(data).reduce((acc, [name, value]) => {
        if (value === null) {
          return acc.filter(field => field.name !== name);
        }

        const isFieldExists = acc.find(field => field.name === name);

        if (isFieldExists) {
          return acc.map(field =>
            field.name === name
              ? {
                  name,
                  value,
                }
              : field,
          );
        }

        return [...acc, { name, value }];
      }, this.data),
    );

    await this.save();
  },
};

export default unitMethods;
