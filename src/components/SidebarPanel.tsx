import type { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import {
  findProductionUri,
  type SiteLocale,
} from '../app/utils/findProductionUrl';

interface SidebarPanelProps {
  ctx: RenderItemFormSidebarPanelCtx;
  siteUrl: string;
}

const buttonBaseStyle = {
  display: 'block',
  paddingBottom: '12px',
  paddingTop: '12px',
  paddingLeft: '16px',
  paddingRight: '16px',
  minHeight: '48px',
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'sans-serif',
  borderRadius: '12px',
  textDecoration: 'none',
  transition: 'all 0.3s ease-in-out',
  boxSizing: 'border-box',
  border: 'none',
  cursor: 'pointer',
} as const;

export default function SidebarPanel({ ctx, siteUrl }: SidebarPanelProps) {
  const locale = ctx.locale as SiteLocale;
  const postTypeApyKey = ctx.itemType.attributes.api_key;
  const slug = (ctx.item?.attributes?.slug as any)?.[locale] as string;
  const prodUri = findProductionUri(locale, postTypeApyKey, slug);

  const handleModalOpen = () => {
    ctx.openModal({
      id: 'preview-modal',
      title: 'Icons Library',
      width: 'fullWidth',
      parameters: {
        itemId: ctx?.item?.id,
        locale: ctx.locale,
        modelName: ctx.itemType?.attributes?.name,
        slug: slug,
        prodUri: prodUri,
        siteUrl: siteUrl,
      },
    });
  };

  return (
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
            flexWrap: 'wrap',
          }}
        >
          <a
            href={`${siteUrl}/${prodUri}`}
            target='_blank'
            rel='noreferrer'
            style={{
              ...buttonBaseStyle,
              backgroundColor: 'white',
              color: '#132D4A',
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
            href={`${siteUrl}/preview/?slug=${slug}&id=${ctx?.item?.id}&locale=${ctx.locale}&type=${ctx.itemType?.attributes?.api_key}`}
            target='_blank'
            rel='noreferrer'
            style={{
              ...buttonBaseStyle,
              backgroundColor: '#0F6FDE',
              color: 'white',
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

          <button
            onClick={handleModalOpen}
            style={{
              ...buttonBaseStyle,
              backgroundColor: '#10B981',
              color: 'white',
            }}
          >
            📚 View Icons
          </button>
        </div>
      </div>
    </div>
  );
}
