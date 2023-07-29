---
title: trailsapp
---

I think it would be interesting to create an outdoor-activity federated service based on [[activitypub]], similar to what mastodon has done for microblogging or what funkwhale has done for music.

## TODOs

Broad strokes, some things we need to do:
- Choose a name
- Set up a github organization for coordinating efforts
- Set up a repository for the server
- Design a basic api
- Set up a repository for the client
- Deploy a web client
- Deploy Android, iOS, and Windows clients

## Names

Traditionally, fediverse project have an animal associated with it. Personally, my spirit animal is the wombat, so that's high on the list for me.

## Client

I would prefer to write the first client with [[tybalt]], and use a component library that is hosted in a web view for the mobile clients. I'm selfish and want to use my own web client to exercise it, and also the first client is mostly about a proof-of-concept -- most people will hopefully use a native app developed by other open-source teams.

## Server

While I'm best in javascript, I doubt it'll be a good idea for us to write the server in js. My intuition is to use Rust, but if we can get a backend dev who is proficient in Go or another high-performance web framework, then I think its a better idea to bring another dev on board than having me write the client and the server.

## Funding

We should try to apply for grants when possible to fund development. Here's a starting point for grants to apply for

- https://socialhub.activitypub.rocks/t/grants-and-funding-for-our-projects/86