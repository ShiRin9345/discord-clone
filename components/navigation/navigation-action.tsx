"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "@/components/navigation/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip label="Add a server" align="center" side="right">
        <button
          onClick={() => onOpen("createServer")}
          className="group cursor-pointer"
        >
          <div className="flex-center bg-background mx-3 h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px] group-hover:!bg-emerald-500 dark:bg-neutral-700">
            <Plus className="text-emerald-500 transition group-hover:text-white" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
export default NavigationAction;
