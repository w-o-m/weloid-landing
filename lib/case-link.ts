/** Builds an /open-a-case link that prefills the intake form's case type and statement. */
export function caseLink(type: string, statement?: string) {
  const params = new URLSearchParams({ type });
  if (statement) params.set("statement", statement);
  return `/open-a-case?${params.toString()}`;
}
