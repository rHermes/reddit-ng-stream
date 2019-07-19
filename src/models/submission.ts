export interface Submission {
  author: string;
  author_fullname: string;
  created_utc: number;
  domain: string;
  id: string;
  is_self: boolean;
  name: string;
  over_18: boolean;
  permalink: string;
  score: number;
  subreddit: string;
  subreddit_id: string;
  subreddit_subscribers: number;
  title: string;
  url: string;
  selftext: string;
  selftext_html: string;
}
