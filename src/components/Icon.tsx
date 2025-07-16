import type { IllustrationName } from './Icons/Illustration/illustrationLibraryGenerated';
import type { PictoName } from './Icons/Picto/pictosLibraryGenerated';
import { illustrationsLibrary } from './Icons/Illustration/illustrationLibraryGenerated';
import { pictosLibrary } from './Icons/Picto/pictosLibraryGenerated';
import Illustration from './Illustration';
import Picto from './Picto';

interface IconProps {
  name: IllustrationName & PictoName;
  style: React.CSSProperties;
}

export default function Icon({ name, style }: IconProps) {
  const isIllustration = illustrationsLibrary.includes(name);
  if (isIllustration) {
    return <Illustration name={name} style={style} />;
  }
  const isPictogram = pictosLibrary.includes(name);
  if (isPictogram) {
    return <Picto name={name} style={style} />;
  }

  return null;
}
