# Drawy

Drawy is an easy to use web based drawing app that lets you draw doodles and share them with other members on the platform from anywhere around the world!

It's complete with User Authentication ( Magic link + 3rd party auth - Google and Github), and Database to store data about the doodles. All you need to do is Draw, Share and have a good time on Drawy :)

[Here's a link to the working site](https://drawy.vercel.app/). Have a look around, Doodle and Share.

### The Team

- **Utkarsh Singh** - [Twitter](https://twitter.com/uttutu_singh) - [GitHub](https://github.com/utkarsh963741)
- **Shubham** -  [GitHub](https://github.com/shubham963741)

### Demo 

Here's quick demo of Drawy :
https://drive.google.com/file/d/1Nwvrs9gegvaNHW6vm7wZcZ4nm3k_H64R/view?usp=sharing


### How it works

Supabase has been integral part of this project and has helped us achieve our goals in such a short period of time. Here's how we used it's features in our website:

1. For Sign up and Login we are using Supabase Magic Link Authentication Service
2. Users also have a choice to Login using third party auth like Google and Github which hve been implemented using Supabase Auth
2. All Data of the User as well as Image data is stored in the Supabase Database
4. All authenticated users on the Platform can view drawings made by other users

In addition to that, we also used Vercel to host the next.js app.

### The Idea

The idea for creating Drawy came from the game Pictionary. We wanted to create a platform where people can showcase their drawing talent with people from around the world. We can also the platform as an whiteboarding or playing other drawing games. 

### What's next?

We are planning to add chat feature, drawing board sharing among users, customizable pens, topic prompts, time based challenges, peer rating based ranking system, among other things and with the help of Supabase, we are extremely optimistic about the future of this project.


## Developer Details

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!