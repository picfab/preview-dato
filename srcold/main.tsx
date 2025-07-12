import {
  connect,
  type RenderItemFormSidebarPanelCtx,
  type ItemType,
} from 'datocms-plugin-sdk';
import 'datocms-react-ui/styles.css';
import ConfigScreen from './app/entrypoints/ConfigScreen';
import { render } from './app/utils/render';
import SidebarPanel from './components/SidebarPanel';

const siteUrl = 'https://payfit.com';

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  itemFormSidebarPanels(_model: ItemType, _ctx) {
    return [
      {
        id: 'goToWebsite',
        label: 'Go to website',
        startOpen: true,
      },
    ];
  },
  renderItemFormSidebarPanel(
    _sidebarPanelId,
    ctx: RenderItemFormSidebarPanelCtx,
  ) {
    ctx.startAutoResizer();
    
    return render(<SidebarPanel ctx={ctx} siteUrl={siteUrl} />);
  },
});
