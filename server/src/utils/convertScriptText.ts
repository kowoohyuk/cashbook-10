export const convertScriptText = (text: string) =>
  text.replace(/\</g, '&lt;').replace(/\>/, '&gt;');
