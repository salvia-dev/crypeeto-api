import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

interface NewsData {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
}

export const getNews = async (req: Request, res: Response) => {
  const { topic } = req.query;
  const currentDate = new Date();

  const weekPeriod = new Date(currentDate.setDate(currentDate.getDate() - 7))
    .toISOString()
    .split("T")[0];

  try {
    const { data } = await axios.get<NewsData>(
      `https://newsapi.org/v2/everything?q=${topic}&from=${weekPeriod}&sortBy=popularity&apiKey=${process.env.CRYPTO_NEWS_API_KEY}`
    );

    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
