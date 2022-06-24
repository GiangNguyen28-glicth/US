export function verifyEmailTemplate(
  fullname: string,
  urlConfirm: string,
): string {
  return `<a href="${urlConfirm}" style="display: inline-block;">Verify</a>`;
}
