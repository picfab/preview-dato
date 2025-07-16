import {
  connect,
  type RenderItemFormSidebarPanelCtx,
  type ItemFormSidebarPanelsCtx,
  type ItemType,
  type RenderFieldExtensionCtx,
  type Field,
} from 'datocms-plugin-sdk';
import { SelectField, Canvas } from 'datocms-react-ui';
import 'datocms-react-ui/styles.css';
import ConfigScreen from './app/entrypoints/ConfigScreen';
import { render } from './app/utils/render';
import SidebarPanel from './components/SidebarPanel';
import IconsModal from './components/IconsModal';
import { illustrationsLibrary } from './components/Icons/Illustration/illustrationLibraryGenerated';
import { pictosLibrary } from './components/Icons/Picto/pictosLibraryGenerated';
import Illustration from './components/Illustration';
import Picto from './components/Picto';
// import IconComboBox from './components/IconComboBox';

const siteUrl =
  import.meta.env.MODE !== 'development'
    ? import.meta.env.VITE_SITE_URL || 'http://localhost:4321'
    : import.meta.env.VITE_PREVIEW_SITE_URL || 'http://localhost:4321';

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  itemFormSidebarPanels(_model: ItemType, _ctx: ItemFormSidebarPanelsCtx) {
    return [
      {
        id: 'goToWebsite',
        label: 'Go to website',
        startOpen: true,
      },
    ];
  },
  renderModal(modalId, ctx) {
    if (modalId === 'preview-modal') {
      const params = ctx.parameters as {
        itemId: string;
        locale: string;
        modelName: string;
        slug: string;
        prodUri: string;
        siteUrl: string;
      };

      return render(
        <IconsModal
          itemId={params.itemId}
          locale={params.locale}
          modelName={params.modelName}
          slug={params.slug}
          prodUri={params.prodUri}
          siteUrl={params.siteUrl}
        />
      );
    }

    return null;
  },
  renderItemFormSidebarPanel(
    _sidebarPanelId,
    ctx: RenderItemFormSidebarPanelCtx
  ) {
    ctx.startAutoResizer();
    console.log('ctx', ctx);

    return render(<SidebarPanel ctx={ctx} siteUrl={siteUrl} />);
  },
  overrideFieldExtensions(field: Field, ctx) {
    // console.log('field', field);
    if (field.attributes.api_key === 'name') {
      console.log('OOOOO', field);

      return {
        editor: { id: 'name' },
      };
    }
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    console.log('fieldExtensionId', fieldExtensionId, ctx);
    switch (fieldExtensionId) {
      case 'name':
        if (ctx.fieldPath?.includes('icon.name')) {
          const value = ctx.formValues[ctx.fieldPath] || '';

          console.log('value', ctx.formValues, value, ctx.fieldPath);
          const handleChange = (val: any) => {
            console.log('val', val);
            ctx.setFieldValue(ctx.fieldPath, val);
          };

          const getOptionLabel = (
            option: string
          ): { label: React.ReactNode; value: string } => {
            let icon: React.ReactNode = '';
            if (illustrationsLibrary.includes(option as any)) {
              icon = (
                <Illustration
                  name={option as any}
                  style={{ width: 16, height: 16 }}
                />
              );
            } else if (pictosLibrary.includes(option as any)) {
              icon = (
                <Picto name={option as any} style={{ width: 16, height: 16 }} />
              );
            }

            return {
              value: option,
              label: (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {icon}
                  <span>{option}</span>
                </span>
              ),
            };
          };

          const options =
            ((ctx.field.attributes.validators.enum as any)
              ?.values as string[]) ?? [];
          const selectOptions = options.map((opt: string) => {
            return getOptionLabel(opt);
          });

          return render(
            <Canvas ctx={ctx}>
              <SelectField
                id='custom-select'
                name='option'
                label='Option'
                value={
                  selectOptions.find((opt: any) => opt.value === value) || null
                }
                hint='Select one of the options'
                onChange={handleChange}
                selectInputProps={{
                  options: selectOptions,
                }}
              />
            </Canvas>
          );
        }
    }
  },
});
