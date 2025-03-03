export const saveScore = async (
  userId: string,
  score: number,
  category: string
) => {
  try {
    const response = await fetch("/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, score, category }),
    });

    if (!response.ok)
      throw new Error("Erreur lors de l'enregistrement du score");
    const data = await response.json();
    console.log("Score enregistré :", data);
  } catch (error) {
    console.error("Erreur :", error);
  }
};
