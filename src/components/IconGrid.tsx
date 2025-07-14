import { pictosLibrary } from './Icons/Picto/pictosLibraryGenerated';
import { illustrationsLibrary } from './Icons/Illustration/illustrationLibraryGenerated';
import IconCard from './IconCard';
import IllustrationCard from './IllustrationCard';

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '12px',
};

const sectionTitleStyle = {
  marginBottom: '16px',
  color: '#1F2937',
  fontSize: '18px',
};

export default function IconGrid() {
  return (
    <>
      <h3 style={{ ...sectionTitleStyle, marginBottom: '16px' }}>
        Pictos ({pictosLibrary.length})
      </h3>
      <div style={{ ...gridStyle, marginBottom: '32px' }}>
        {pictosLibrary.map((iconName) => (
          <IconCard key={iconName} iconName={iconName} />
        ))}
      </div>

      <h3 style={{ ...sectionTitleStyle, marginBottom: '16px' }}>
        Illustrations ({illustrationsLibrary.length})
      </h3>
      <div style={{ ...gridStyle, marginBottom: '24px' }}>
        {illustrationsLibrary.map((illustrationName) => (
          <IllustrationCard
            key={illustrationName}
            illustrationName={illustrationName}
          />
        ))}
      </div>
    </>
  );
}
