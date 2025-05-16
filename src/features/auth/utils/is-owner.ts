import { Session } from "next-auth";
type Entity = {
  userId: string | null;
};
export function isOwner(
  authUser: Session["user"] | null | undefined,
  entity: Entity | null | undefined
) {
  if (!authUser || !entity) return false;

  if (!entity.userId) return false;

  if (entity.userId !== authUser.id) {
    return false;
  } else {
    return true;
  }
}
