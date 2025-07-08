"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const { server } = data;
  const inviteCode = `${origin}/invite/${server?.inviteCode}`;
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );
      onOpen("invite", { server: response.data });
      router.refresh();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const isModalOpen = isOpen && type === "invite";

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="overflow-hidden bg-white p-0 text-black">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-center text-2xl font-bold">
              Customize your server
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Give your server a personality with a name and an image. You an
              always change it later.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <Label className="dark:text-secondary/70 text-xs font-bold text-zinc-500 uppercase">
              Server invite link
            </Label>
            <div className="mt-2 flex items-center gap-x-2">
              <Input
                disabled={isLoading}
                className="focus-visible::ring-offset-0 border-0 bg-zinc-300/50 text-black focus-visible:ring-0"
                value={inviteCode}
              />
              <Button
                disabled={isLoading}
                onClick={onCopy}
                size="icon"
                className="cursor-pointer"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              disabled={isLoading}
              onClick={onNew}
              className="mt-4 text-xs text-zinc-500"
              variant="link"
              size="sm"
            >
              Generate a new link
              <RefreshCw className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateServerModal;
