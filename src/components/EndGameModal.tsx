import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface EndGameModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  score: number;
  totalWords: number;
  isLoggedIn: boolean;
  onViewScores: () => void;
  onRestart: () => void;
  onHome: () => void;
}

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
        <AlertDialogDescription>
          Vous avez terminé la liste avec un score de{" "}
          <strong>
            {score} / {totalWords}
          </strong>{" "}
          !
        </AlertDialogDescription>
        <div className="flex justify-end gap-4 mt-4">
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
