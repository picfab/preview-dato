import {
  connect,
  type RenderItemFormSidebarPanelCtx,
  type ItemFormSidebarPanelsCtx,
  type ItemType,
} from 'datocms-plugin-sdk';
import 'datocms-react-ui/styles.css';
import ConfigScreen from './app/entrypoints/ConfigScreen';
import { render } from './app/utils/render';
import SidebarPanel from './components/SidebarPanel';
import IconsModal from './components/IconsModal';

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
});
