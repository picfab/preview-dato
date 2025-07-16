import React from 'react';
import { SelectField, Canvas } from 'datocms-react-ui';
import Icon from './Icon';
import { getValueByPath } from '../app/utils/getValueByPath';
import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';

interface IconSelectFieldProps {
  ctx: RenderFieldExtensionCtx;
  fieldPath: string;
  getOptionLabel: (option: string) => {
    labelOriginal: string;
    value: string;
    label: React.ReactNode;
  };
}

export default function IconSelectField({ ctx, fieldPath, getOptionLabel }: IconSelectFieldProps) {
  // Récupère la valeur (string ou objet)
  const rawValue = getValueByPath(ctx.formValues, fieldPath);
  const value = typeof rawValue === 'object' && rawValue !== null ? rawValue.value : rawValue || '';

  const options = ((ctx.field.attributes.validators.enum as any)?.values as string[]) ?? [];
  const selectOptions = options.map(getOptionLabel);
  const selectedOption = selectOptions.find((opt) => opt.value === value) || null;

  const handleChange = (val: any) => {
    ctx.setFieldValue(fieldPath, val.value);
  };

  return (
    <Canvas ctx={ctx}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '20px' }}>
          {value && (
            <Icon
              name={value as any}
              style={{ width: 16, height: 16, color: 'blue' }}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <SelectField
            id='icon-select'
            required={!!ctx.field.attributes.validators.required}
            name='Icon'
            label='Icon'
            value={selectedOption}
            hint='Select one of the options'
            onChange={handleChange}
            selectInputProps={{
              options: selectOptions,
            }}
          />
        </div>
      </div>
    </Canvas>
  );
} 