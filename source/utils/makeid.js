const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export default function makeid(side = 10) {
  let text = "";

  for (let i = 0; i < side; i++)
    text += possible.charAt(~~(Math.random() * possible.length));

  return text;
}
