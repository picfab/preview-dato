import React, { useEffect } from 'react';
import { Canvas } from 'datocms-react-ui';
import { getValueByPath } from '../app/utils/getValueByPath';
import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import Select from 'react-select'; // ✅ utilise react-select pur

interface IconSelectFieldProps {
  ctx: RenderFieldExtensionCtx;
  fieldPath: string;
  getOptionLabel: (option: string) => {
    labelOriginal: string;
    value: string;
    label: React.ReactNode;
  };
}

export default function IconSelectField({
  ctx,
  fieldPath,
  getOptionLabel,
}: IconSelectFieldProps) {
  useEffect(() => {
    ctx.startAutoResizer();
  }, [ctx]);

  const rawValue = getValueByPath(ctx.formValues, fieldPath);
  const value =
    typeof rawValue === 'object' && rawValue !== null
      ? rawValue.value
      : rawValue || '';

  const options =
    ((ctx.field.attributes.validators.enum as any)?.values as string[]) ?? [];
  const selectOptions = options.map(getOptionLabel);
  const selectedOption =
    selectOptions.find((opt) => opt.value === value) || null;

  const handleChange = (val: any) => {
    ctx.setFieldValue(fieldPath, val.value);
  };

  useEffect(() => {
    ctx.startAutoResizer();
  }, [ctx]);

  return (
    <Canvas ctx={ctx}>
      <Select
        options={selectOptions}
        value={selectedOption}
        onMenuOpen={() => {
          ctx.stopAutoResizer();
          ctx.setHeight(400);
        }}
        onMenuClose={() => {
          ctx.startAutoResizer();
        }}
        onChange={handleChange}
      />
    </Canvas>
  );
}
