import type { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, ContextInspector, TextInput, Button } from 'datocms-react-ui';
import s from './styles.module.css';
import React from 'react';

interface Props {
  ctx: RenderConfigScreenCtx;
}

export default function ConfigScreen({ ctx }: Props) {
  const [token, setToken] = React.useState(ctx.plugin.attributes.parameters.token || '');
  const [saving, setSaving] = React.useState(false);

  const handleSave = async () => {
    setSaving(true);
    await ctx.updatePluginParameters({ token });
    ctx.notice('Configuration sauvegardée !');
    setSaving(false);
  };

  return (
    <Canvas ctx={ctx}>
      <p>Welcome to your Preview Button Plugin! This is your config screen!</p>
      <div style={{ background: '#fff3cd', color: '#856404', padding: '12px', borderRadius: '4px', marginBottom: '16px', border: '1px solid #ffeeba' }}>
        <strong>Attention :</strong> Ce token sera stocké en clair dans la configuration du plugin et accessible à toute personne ayant accès à l’interface d’administration DatoCMS. N’utilisez pas de secrets critiques ici.
      </div>
      <TextInput
        id="token"
        name="token"
        labelText="Token"
        value={typeof token === 'string' ? token : ''}
        onChange={(newValue: string) => setToken(newValue)}
        placeholder="Entrez votre token"
        required
        type="password"
      />
      <Button onClick={handleSave} disabled={saving} fullWidth>
        {saving ? 'Sauvegarde...' : 'Sauvegarder'}
      </Button>
      <div className={s.inspector}>
        <ContextInspector />
      </div>
    </Canvas>
  );
}
