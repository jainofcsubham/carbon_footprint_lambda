import jwt from "jsonwebtoken";


export const getUserIdFromToken = (idToken: string) => {
  const idTokenWithoutBearer = idToken.replace(/^Bearer\s/, "");
  const decoded = jwt.decode(idTokenWithoutBearer, { complete: true });
  return decoded.payload.sub;
};
