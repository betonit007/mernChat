# MernChat Messenger

![Project Image](https://res.cloudinary.com/dbb1t68vt/image/upload/v1604416443/1604416443456.jpg)

> MernChat Messenger - The chat application that takes whatsapp to the next level.

---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [References](#references)
- [License](#license)
- [Author Info](#author-info)

## Description

WhatsApp Messenger is a browswer-based instant messaging application that allows users to exchange text and image messages for free. 

#### Technologies

- MERN Stack - Mongo, Express, React and Node.js
- Pusher - a hosted service that adds real-time data functionality to web and mobile applications
- Cloudinary - a cloud service for managing and storing images

[Back To The Top](#Mernchat-Messenger)

---

## How To Use

#### Installation, in root directory run
```terminal 
    npm install
```


## Prerequirements
- [MongoDB](https://mongodb.com)
- [Cloudinary](https://cloudinary.com)
- [Pusher](https://pusher.com/)

### Prepare your credentials, run the following scripts in the root directory:

You need to add a JWT_SECRET in .env to connect to MongoDB

```terminal
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> ./.env
```

Secondly, you will need a MongoUri
```terminal
$ echo "MONGO_URI=YOUR_MONGO_URI" >> ./.env
```

Next, the following crendentials for Pusher
```terminal
$ echo -e "PUSHER_ID=YOUR_PUSHER_ID\nPUSHER_KEY=YOUR_PUSHER_KEY\nPUSHER_SECRET=YOUR_PUSHER_SECRET" >> ./.env
```

Then, enter the crendentials for Cloudinary
```terminal
$ echo -e "CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME\nCLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY\nCLOUDINARY_SECRET=YOUR_CLOUDINARY_SECRET" >> ./.env
```

Set your environment for developement purposes
```terminal
$ echo "NODE_ENV=development" >> ./.env
```

And finally, set your pusher id on the front end
```terminal
$ echo "REACT_APP_PUSHER=YOUR_REACT_APP_PUSHER" >> ./client/.env
```

## Start
```terminal
$ npm run dev
```


[Back To The Top](#Mernchat-Messenger)

---
## References
[Github Repo](https://github.com/betonit007/mernChat)

[Back To The Top](#Mernchat-Messenger)

---

## License

MIT License

Copyright (c) [2020] [Tim Nagorski]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#Mernchat-Messenger)

---

## Author Info

- Github - [betonit007](https://github.com/betonit007)
- LinkedIn - [Tim Nagorski](https://www.linkedin.com/in/tim-nagorski-7a188091/)
- Website - [The Fly Dev](https://theflydev.com)

[Back To The Top](#Mernchat-Messenger)
