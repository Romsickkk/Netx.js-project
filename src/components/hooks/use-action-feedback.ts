import { useEffect, useRef } from "react";

import { ActionState } from "../utils/to-action-state";

type OnArgs = { actionState: ActionState };

type UseOptionsFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

export function useActionFeedback(
  actionState: ActionState,
  options: UseOptionsFeedbackOptions
) {
  const prevTimestemp = useRef(actionState.timestamp);
  const isUpdate = prevTimestemp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdate) return;
    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }
    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }

    prevTimestemp.current = actionState.timestamp;
  }, [isUpdate, actionState, options]);
}
