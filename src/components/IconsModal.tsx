import { pictosLibrary } from './Icons/Picto/pictosLibraryGenerated';
import { illustrationsLibrary } from './Icons/Illustration/illustrationLibraryGenerated';
import IconGrid from './IconGrid';

interface IconsModalProps {
  itemId: string;
  locale: string;
  modelName: string;
  slug: string;
  prodUri: string;
  siteUrl: string;
}

export default function IconsModal({
  itemId,
  locale,
  slug,
  prodUri,
  siteUrl,
}: IconsModalProps) {
  return (
    <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
      <h2 style={{ marginBottom: '24px', color: '#1F2937' }}>Icons Library</h2>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <strong>Total Pictos:</strong> {pictosLibrary.length}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <strong>Total Illustrations:</strong> {illustrationsLibrary.length}
        </div>
      </div>

      <IconGrid />

      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          paddingTop: '16px',
          borderTop: '1px solid #E5E7EB',
        }}
      >
        <a
          href={`${siteUrl}/${prodUri}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 16px',
            backgroundColor: '#0F6FDE',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          🌐 Open Production
        </a>
        <a
          href={`${siteUrl}/preview/?slug=${slug}&id=${itemId}&locale=${locale}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 16px',
            backgroundColor: '#10B981',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          👁️ Open Preview
        </a>
      </div>
    </div>
  );
}
