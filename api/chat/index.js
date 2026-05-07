export default async function handler(req, res) {
  try {
    const userMessage = req.query.message || "Hello 😏";

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: userMessage,
      }),
    });

    const data = await response.json();

    console.log("FULL RESPONSE:", data);

    const reply =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "No response 😆";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Something broke 😆🖤" });
  }
}
