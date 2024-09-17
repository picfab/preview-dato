// @ts-nocheck

import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  connect,
  IntentCtx,
  RenderItemFormSidebarPanelCtx,
  ItemType,
} from 'datocms-plugin-sdk';
import 'datocms-react-ui/styles.css';
import ConfigScreen from './entrypoints/ConfigScreen';
import { render } from './utils/render';
import { findProductionUri, SiteLocale } from './utils/findProductionUrl';

const container = document.getElementById('root');
const siteUrl = 'https://www.payfit.com';

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  itemFormSidebarPanels(model: ItemType, ctx: IntentCtx) {
    return [
      {
        id: 'goToWebsite',
        label: 'Go to website',
        startOpen: true,
      },
    ];
  },
  renderItemFormSidebarPanel(
    sidebarPanelId,
    ctx: RenderItemFormSidebarPanelCtx
  ) {
    ctx.startAutoResizer();
    const locale = ctx.locale as SiteLocale;
    const postTypeApyKey = ctx.itemType.attributes.api_key;
    const slug = (ctx.item?.attributes?.slug as any)?.[locale] as string;
    const prodUri = findProductionUri(locale, postTypeApyKey, slug);
    if (container && prodUri) {
      const root = createRoot(container);
      root.render(
        <React.StrictMode>
          <div>
            <div className='container'>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '200px',
                  backgroundImage: 'linear-gradient(180deg, #ebf4ff, #fff)',
                  gap: '16px',
                }}
              >
                <a
                  href={`${siteUrl}/${prodUri}`}
                  target='_blank'
                  rel='noreferrer'
                  style={{
                    display: 'block',
                    paddingBottom: '12px',
                    paddingTop: '12px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    backgroundColor: 'white',
                    color: '#132D4A',
                    minHeight: '48px',
                    fontWeight: 500,
                    fontSize: '16px',
                    fontFamily: 'sans-serif',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease-in-out',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.boxShadow =
                      '0px 4px 12px rgba(0, 0, 0, 0.2)';
                    (e.target as HTMLElement).style.backgroundColor = '#f6f6f7';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.boxShadow = 'none';
                    (e.target as HTMLElement).style.backgroundColor = 'white';
                  }}
                >
                  Production View
                </a>
                <a
                  href={`${siteUrl}/preview/?datoSlug=${slug}&id=${ctx?.item?.id}&locale=${ctx.locale}&type=${ctx.itemType?.attributes?.api_key}`}
                  target='_blank'
                  rel='noreferrer'
                  style={{
                    display: 'block',
                    paddingBottom: '12px',
                    paddingTop: '12px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    backgroundColor: '#0F6FDE',
                    color: 'white',
                    minHeight: '48px',
                    fontWeight: 500,
                    fontSize: '16px',
                    fontFamily: 'sans-serif',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease-in-out',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.boxShadow =
                      '0px 4px 12px rgba(0, 0, 0, 0.2)';
                    (e.target as HTMLElement).style.backgroundColor = '#0964cd';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.boxShadow = 'none';
                    (e.target as HTMLElement).style.backgroundColor = '#0F6FDE';
                  }}
                >
                  Preview
                </a>
              </div>
            </div>
          </div>
        </React.StrictMode>
      );
    }
  },
});
