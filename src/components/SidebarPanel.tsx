import type { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import {
  findProductionUri,
  type SiteLocale,
} from '../app/utils/findProductionUrl';
import { SignJWT } from 'jose';

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

  const getUserName = (user: any) => {
    if (!user?.id) return null;
    return user.id;
  };

  const handleTestToken = async () => {
    const token = ctx.plugin.attributes.parameters.token;
    const userName = getUserName(ctx.currentUser);
    if (!userName) return;
    if (typeof token !== 'string' || !token) {
      console.error('Token secret invalide ou manquant.');
      return;
    }
    try {
      const secret = new TextEncoder().encode(token);
      const jwtToken = await new SignJWT({ name: userName })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);
      console.log('JWT généré:', jwtToken);
    } catch (e) {
      console.error('Erreur lors de la génération du JWT:', e);
    }
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
        <button
          onClick={handleTestToken}
          style={{
            ...buttonBaseStyle,
            backgroundColor: '#F59E42',
            color: 'white',
            marginTop: '16px',
            width: '100%',
          }}
        >
          🧪 Test Token
        </button>
      </div>
    </div>
  );
}
