import type { PictoName } from './Icons/Picto/pictosLibraryGenerated';

interface PictoProps {
  name: PictoName;
  style: React.CSSProperties;
}

export default function Picto({ name, style }: PictoProps) {
  return (
    <svg width='64' height='64' style={style && { ...style }}>
      <use href={`/icons/pictos.svg#${name}`} />
    </svg>
  );
}
