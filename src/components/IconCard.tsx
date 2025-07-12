import type { PictoName } from './Icons/Picto/pictosLibraryGenerated';

interface IconCardProps {
  iconName: PictoName;
}

export default function IconCard({ iconName }: IconCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        backgroundColor: '#F9FAFB',
      }}
    >
      <svg
        width='64'
        height='64'
        style={{ marginBottom: '8px', fill: '#2196f3' }}
      >
        <use href={`/icons/pictos.svg#${iconName}`} />
      </svg>
      <span
        style={{
          fontSize: '10px',
          textAlign: 'center',
          color: '#6B7280',
          wordBreak: 'break-word',
        }}
      >
        {iconName}
      </span>
    </div>
  );
}
