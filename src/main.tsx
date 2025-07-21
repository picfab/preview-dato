import {
  connect,
  type RenderItemFormSidebarPanelCtx,
  type ItemFormSidebarPanelsCtx,
  type ItemType,
  type RenderFieldExtensionCtx,
  type Field,
} from 'datocms-plugin-sdk';
import 'datocms-react-ui/styles.css';
import ConfigScreen from './app/entrypoints/ConfigScreen';
import { render } from './app/utils/render';
import SidebarPanel from './components/SidebarPanel';
import IconsModal from './components/IconsModal';
import Icon from './components/Icon';
import IconSelectField from './components/IconSelectField';
import './styles.css';

const siteUrl =
  import.meta.env.MODE !== 'development'
    ? import.meta.env.VITE_SITE_URL || 'http://localhost:4321'
    : import.meta.env.VITE_PREVIEW_SITE_URL || 'http://localhost:4321';

const getOptionLabel = (
  option: string
): {
  labelOriginal: string;
  value: string;
  label: React.ReactNode;
} => {
  return {
    value: option,
    labelOriginal: option,
    label: (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Icon name={option as any} style={{ width: 16, height: 16 }} />
        <span>{option}</span>
      </span>
    ),
  };
};

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  itemFormSidebarPanels(_model: ItemType, _ctx: ItemFormSidebarPanelsCtx) {
    return [
      {
        id: 'goToWebsite',
        label: 'dev (payfit plugin)',
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
    return render(<SidebarPanel ctx={ctx} siteUrl={siteUrl} />);
  },

  overrideFieldExtensions(field: Field, _ctx) {
    if (field.attributes.api_key === 'name' && field.id === '1763288') {
      return {
        editor: { id: 'overwriteIcon' },
      };
    }
    if (field.attributes.api_key === 'icon' && field.id === '9554822') {
      console.log('overwriteIcon Icon', field);
      return {
        editor: { id: 'overwriteIcon' },
      };
    }
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    switch (fieldExtensionId) {
      case 'overwriteIcon':
        return render(
          <IconSelectField
            ctx={ctx}
            fieldPath={ctx.fieldPath}
            getOptionLabel={getOptionLabel}
          />
        );
      default:
        return undefined;
    }
  },
});
