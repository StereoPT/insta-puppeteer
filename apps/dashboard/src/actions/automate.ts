"use server";

export type AutomateArgs = {
  email: string;
  password: string;
  hashtag?: string;
};

export const Automate = async ({ hashtag }: AutomateArgs) => {
  const response = await fetch(`${process.env.AUTOMATOR_URL}/automate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hashtag }),
  });

  const { sessionId } = await response.json();

  return sessionId;
};
