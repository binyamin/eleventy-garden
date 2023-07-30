---
title: trailsapp
---

I think it would be interesting to create an outdoor-activity federated service based on [[activitypub]], similar to what mastodon has done for microblogging or what funkwhale has done for music. I've set up [a public Matrix room](https://matrix.to/#/#trailsapp:matrix.org) to discuss this -- if you're reading this, you're invited to join the project! Come drop by and chat -- we'll take help from anyone: potential users, developers, designers, project managers, privacy experts, and so on.

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

Traditionally, fediverse project have an animal associated with it. Personally, my spirit animal is the wombat, so that's high on the list for me, but a quokka or capybara would also be very fun.

## Simple user stories

- As a national park service, I want to share the shape and conditions of trails with visitors to my park
- As a hiker, I want to to follow a trail while hiking
- As a kayaker, I want to record a free-style paddle and share it with my friends
- As a park ranger, I want to report when a trail is unsafe for use
- As a tourist, I want to discover trails near my vacation zone

## Client

I would prefer to write the first client with [[tybalt]], and use a component library that is hosted in a web view for the mobile clients. I'm selfish and want to use my own web client to exercise it, and also the first client is mostly about a proof-of-concept -- most people will hopefully use a native app developed by other open-source teams.

There are two different groups of users, but I think we can serve them both from a single client. The two biggest use cases are end users sharing activity, and administrators editing trails and communities. I think we'll have a better time with an RBAC system, where users are granted permissions based on roles (user, moderator, admin) that progressively discloses more functionality on a single client than multiple clients for different roles (an admin dashboard and a consumer app, for instance).

## Server

While I'm best in javascript, I doubt it'll be a good idea for us to write the server in js. My intuition is to use Rust, but if we can get a backend dev who is proficient in Go or another high-performance web framework, then I think its a better idea to bring another dev on board than having me write the client and the server.

## Privacy

Apps that share location data have real privacy concerns, especially around stalking when all activitypub data is public? See, for instance https://www.theverge.com/2018/1/28/16942626/strava-fitness-tracker-heat-map-military-base-internet-of-things-geolocation

I don't think the server needs to implement anything -- by the time the client has reported an accurate location, it's too late. For activities that take place away from home, I think it's okay as long as we release the activity data *after* the activity is done. This means we would have to implement any kind of group activity on a device-to-device basis, like Bluetooth.

The biggest problem, in my mind, is people leaking their home address by sharing their morning walk every morning via a free-style activity, so we'll have to come up with a "fuzz your location by default" algorithm for reporting free-style activities that doesn't leak your home address. Additionally, we can encrypt the activities users mark as private using a user-specific private key that only their approved friends get the public key to decrypt, like Matrix.

This gives users three tiers of privacy: public, private, and public with extra safety, which should be enough to get off the ground.

## Funding

We should try to apply for grants when possible to fund development. Here's a starting point for grants to apply for

- https://socialhub.activitypub.rocks/t/grants-and-funding-for-our-projects/86
