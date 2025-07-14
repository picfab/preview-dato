import type { IllustrationName } from './Icons/Illustration/illustrationLibraryGenerated';

interface IllustrationCardProps {
  illustrationName: IllustrationName;
}

export default function IllustrationCard({
  illustrationName,
}: IllustrationCardProps) {
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
      <img
        src={`/icons/illustrations/${illustrationName}.svg`}
        alt={illustrationName}
        width="32"
        height="32"
        style={{ marginBottom: '8px' }}
      />
      <span
        style={{
          fontSize: '10px',
          textAlign: 'center',
          color: '#6B7280',
          wordBreak: 'break-word',
        }}
      >
        {illustrationName}
      </span>
    </div>
  );
}
