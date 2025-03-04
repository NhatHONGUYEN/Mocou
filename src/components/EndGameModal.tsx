import { EndGameModalProps } from "@/lib/type";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export function EndGameModal({
  isOpen,
  onClose,
  score,
  totalWords,
  isLoggedIn,
  onViewScores,
  onRestart,
  onHome,
}: EndGameModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="p-6 bg-bg">
        <AlertDialogTitle>Félicitations 🎉</AlertDialogTitle>
        <AlertDialogDescription className=" xs:w-80">
          Vous avez terminé la liste avec un score de{" "}
          <strong>
            {score} / {totalWords}
          </strong>{" "}
          !
        </AlertDialogDescription>
        <div className="flex flex-col  xs:justify-end gap-4 mt-4">
          {/* Si l'utilisateur n'est pas connecté */}
          {!isLoggedIn && (
            <Button onClick={onHome}>Retour à l&apos;accueil</Button>
          )}

          {/* Si l'utilisateur est connecté */}
          {isLoggedIn && (
            <>
              <Button onClick={onViewScores}>Voir les scores</Button>
              <Button onClick={onRestart}>Recommencer</Button>
            </>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
