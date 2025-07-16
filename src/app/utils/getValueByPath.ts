export function getValueByPath(obj: any, path: string): any {
  const parts = path.split('.').map((part) =>
    // convert indices like '0' to actual numbers
    /^\d+$/.test(part) ? Number(part) : part
  );

  return parts.reduce((acc, part) => acc?.[part], obj);
}
