import type { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, ContextInspector } from 'datocms-react-ui';
import s from './styles.module.css';

interface Props {
  ctx: RenderConfigScreenCtx;
}

export default function ConfigScreen({ ctx }: Props) {
  return (
    <Canvas ctx={ctx}>
      <p>Welcome to your Preview Button Plugin! This is your config screen!</p>
      <div className={s.inspector}>
        <ContextInspector />
      </div>
    </Canvas>
  );
}
