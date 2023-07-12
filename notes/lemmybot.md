---
title: lemmybot
---

I want to set up a Lemmy bot to create match threads. I think there is a pretty good set of projects out-and-about that are for long-running processes, but I think I want to find a way to make a free-as-in-beer bot. Github supports [cron syntax in their workflow triggers](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule), so we can launch a process a few times a day to do a quick poll of the relevant data using a github action, and then post to [[activitypub]] any of the relevant posts. Github free tier comes with [500 MB and 2,000 minutes per month](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#included-storage-and-minutes), which means we can run for about an hour a day (2000/31 = 64.51612903225806), so if we run 24 times a day (once an hour), we can be awake for about 2 and a half minutes (64/24=2.6666666666666665) before we have to stop processing the data.
