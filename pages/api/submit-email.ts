import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await fetch("https://flow.zoho.com/850283995/flow/webhook/incoming?zapikey=1001.c5f8e62b5f9cc70c42a841cdffef6775.f32dbe84393d6d7bf0b4eda2fde8e265&isdebug=false", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: { email } }),  // 🔥 Correct structure
    });

    return res.status(200).json({ message: 'Email sent to Zoho Flow' });
  } catch (error) {
    console.error('Error sending to Zoho Flow:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
