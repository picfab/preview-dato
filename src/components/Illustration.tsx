import type { IllustrationName } from './Icons/Illustration/illustrationLibraryGenerated';

interface IllustrationProps {
  name: IllustrationName;
  style: React.CSSProperties;
}

export default function Illustration({ name, style }: IllustrationProps) {
  return (
    <img
      src={`/icons/illustrations/${name}.svg`}
      alt={name}
      width='32'
      height='32'
      style={style && { ...style }}
    />
  );
}
