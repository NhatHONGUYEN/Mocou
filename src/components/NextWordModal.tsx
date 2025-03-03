import Image from "next/image";
import { WordData } from "@/lib/type";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface NextWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWord: WordData;
  onConfirm: () => void;
}

export function NextWordModal({
  isOpen,
  onClose,
  currentWord,
  onConfirm,
}: NextWordModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="p-6 text-center bg-bg">
        <AlertDialogTitle>La Solution</AlertDialogTitle>
        <AlertDialogDescription>
          Mot : {currentWord.word}
          <Image
            src={currentWord.imageUrl}
            alt={currentWord.word}
            className="mb-4 mx-auto w-40 h-40 mt-4 object-cover rounded-lg"
            width={300}
            height={200}
          />
          Traduction : {currentWord.translation}
        </AlertDialogDescription>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={onConfirm}>Fermer</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
