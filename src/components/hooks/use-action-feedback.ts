import { useEffect } from "react";
import { ActionState } from "../utils/to-actionState";

export function useActionFeedback(actionState: ActionState) {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      console.log(actionState.message);
    }
    if (actionState.status === "ERROR") {
      console.log(actionState.message);
    }

    return () => {};
  }, [actionState]);
}
