# gopher-wood <!-- omit in toc -->

Official app for Gopher Wood Clinic.

## Table of Contents <!-- omit in toc -->

- [Getting started](#getting-started)
  - [Running the project locally](#running-the-project-locally)
- [For Developers](#for-developers)
  - [Architecture](#architecture)
  - [Technologies](#technologies)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [User Authentication / Management](#user-authentication--management)
  - [Release Management and Naming Conventions](#release-management-and-naming-conventions)
  - [Features Sets](#features-sets)
- [Notes & Resources](#notes--resources)
  - [PWAs (Progressive Web Apps)](#pwas-progressive-web-apps)
  - [Database/Offline Functionality](#databaseoffline-functionality)
  - [Design Principles](#design-principles)
  - [Authentication / Security](#authentication--security)
  - [Dev environment setup](#dev-environment-setup)
  - [Animations](#animations)
  - [DevOps](#devops)
  - [Hosting](#hosting)
  - [Miscellaneous](#miscellaneous)

## Getting started

This project uses the [Sapper](https://github.com/sveltejs/sapper) template, available for Rollup and webpack.

### Running the project locally

Install dependencies and run the project in development mode with:

```bash
cd gopher-wood
npm install # or yarn
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.

## For Developers

### Architecture

Our source code is on [our GitHub repo](https://github.com/vcheeze/gopher-wood). We utilize AWS for hosting the app. The domain is currently bought from [GoDaddy](https://www.godaddy.com). GoDaddy is configured in its `www` CNAME record to point to an Application Load Balancer on AWS, which in turns routes port 80 to port 3000 of our EC2 instance (running Ubuntu 18), on which our app is running.

In the EC2 instance, [pm2](https://pm2.keymetrics.io/) is utilized to serve the app. In order to deploy the app again, simply `git pull` in the repo (found in `~/gopher-wood/`), `npm i` if `package.json` has been changed, then `npm run build`. pm2 should pick up the changes automatically from `__sapper__/build/` and serve the updated files. If your changes are not reflected, simply run `pm2 restart [PID of our process]` in the terminal. You can find the PID by entering `pm2 list`. If you need to start an entire new process, run `pm2 start pm2 start __sapper__/build` to start serving the app.

For IVC appointments, we use MariaDB to store booked appointments. This feature has not been deployed yet and is not in our EC2 VM yet.

For real time functionality, we are currently using Firebase's realtime DB. For the future, we should consider using web sockets with MariaDB so that our DB is centralized. We can also consider [RethinkDB](https://rethinkdb.com) as an alternative.

### Technologies

#### Frontend

We use [Sapper](https://sapper.svelte.dev), a framework built on [Svelte](https://svelte.dev). [Tachyons](https://tachyons.io) is used for CSS; read [this article by Adam Wathan](https://adamwathan.me/css-utility-classes-and-separation-of-concerns) for an idea of why we use functional CSS. Svelte's preferred bundler, [Rollup](https://rollupjs.org/guide/en), is used, as well as [Polka](https://github.com/lukeed/polka) instead of Express for the server.

With regards to Tachyons, how well it integrates with Sapper still remains to be seen. This is an ambitious attempt for us to use functional CSS, but we will remain open to other options as we develop our project - if an alternative comes up with a compelling argument to switch over, then we might. As of now, simply follow a few helpful guidelines:

- Create a `export let styles = {}` in `<script>` of your Svelte files, define functional CSS classes there, then use it as a class for your markup, i.e.
  ```HTML
  <script>
    export let styles = {
      h1: 'f1 tc'
    };
  </script>
  <h1 class={styles.h1}>Hello World!</h1>
  ```
- Pseudo elements such as `::before` and `::after` are not supported by Tachyons, so we will keep using semantic CSS to style them.
- Svelte supports [dynamic CSS classes](https://svelte.dev/docs#class_name), in which case the styles of those classes will also remain in the semantic format, i.e.
  ```HTML
  <style>
    .dynamic {
      font-weight: bold;
    }
  </style>
  <p class:dynamic={condition.isTrue()}></p>
  ```

And that's it! Go and get started on Svelte and Tachyons :)

#### Backend

As mentioned in the architecture section, we use Firebase as our realtime db. For IVC appointments, we use MariaDB on the AWS EC2 server to store timesots.

Remote access to MariaDB has been configured for the following user:
```
user: gwuser;
password: gdubsuperadmin;
```

However, we still have to configure MariaDB on the server to accept this user certain incoming IP addresses. This can be done by `ssh`ing into the server, running `sudo mysql -u root` to start MariaDB, then enter
```sql
GRANT ALL PRIVILEGES ON gopher_wood.* TO 'gwuser'@'[the_IP_address_to_add]' IDENTIFIED BY 'gdubsuperadmin';
```

Replace `[the_IP_address_to_add]` with the your IP address. After this, run `FLUSH PRIVILEGES;` in order to reload privileges on the database. This will grant the user `gwuser` accessing the database from the specified IP address all privileges on the database `gopher_wood` - including all the tables in it (specified by `.*` following `gopher_wood`).

#### User Authentication / Management

We use [Auth0](https://manage.auth0.com/dashboard) as the user authentication system. There is an Auth0 account created linked to vcheeze's GitHub account.
Within the Auth0 dashboard you will see an application called Gopher Wood, and that is where our system is set up.

### Release Management and Naming Conventions

Simply put, `master` is the code base for production deployment. `dev` is used as a consolidation of all development work. Testing will be conducted on this branch and then merged into `master`. The following outlines descriptions and naming conventions of branches.

<table>
  <thead>
    <tr>
      <th>Instance</th>
      <th>Branch</th>
      <th>Description</th>
      <th>Commit Message</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Master</strong></td>
      <td>master</td>
      <td>Accepts merges from <strong>Dev</strong> and <strong>Hotfixes</strong></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><strong>Dev</strong></td>
      <td>dev</td>
      <td>Accepts merges from <strong>Features</strong></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><strong>Features</strong></td>
      <td>feat-[issue #]/*</td>
      <td>Always branch off HEAD of <strong>Dev</strong></td>
      <td>feat-[issue #]: description</td>
    </tr>
    <tr>
      <td><strong>Hotfixs</strong></td>
      <td>hotfix-[issue #]/*</td>
      <td>Always branch off <strong>Master</strong></td>
      <td>hotfix-[issue #]: description</td>
    </tr>
  </tbody>
</table>

### Features Sets

#### Sprint 1 <!-- omit in toc -->

Build a simple PWA with client and server in place, including proper security measures. Sync with queue calling machine.

#### Sprint 2 <!-- omit in toc -->

IVC Appointment. Set up simple about and contact us pages.

## Notes & Resources

### PWAs (Progressive Web Apps)

- [Google's on PWA](https://developers.google.com/web/progressive-web-apps)
- [Awwwards on PWA](https://www.awwwards.com/PWA-ebook/en)
- [MDN on PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [An example of the entire PWA life cycle](https://dev.to/kefranabg/a-productive-stack-for-pwa-development-27o)
- [Yet another guide](https://www.smashingmagazine.com/2018/11/guide-pwa-progressive-web-applications)
- [PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist)
- [A Progressive Roadmap](https://cloudfour.com/thinks/a-progressive-roadmap-for-your-progressive-web-app)

### Database/Offline Functionality

- Google's recommendations: [Cache API + IndexedDB](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa)
- [Guide to Cache API](https://www.monterail.com/blog/pwa-offline-dynamic-data)
- [Guide to IndexedDB](https://itnext.io/indexeddb-your-second-step-towards-progressive-web-apps-pwa-dcbcd6cc2076)
  - [Yet another guide to IndexedDB](https://medium.com/@sahalsajjad/introduction-to-indexeddb-storing-data-in-browsers-2f8e5d0fb22)
- Use [Lighthouse](https://github.com/GoogleChrome/lighthouse) to monitor performance
- Google's tutorial for [building an offline-first, data-driven PWA](https://codelabs.developers.google.com/codelabs/workbox-indexeddb/index.html?index=..%2F..index#0)
- [PouchDB](https://pouchdb.com)
- [Dexie.js](https://dexie.org)
- [ZangoDB](https://github.com/erikolson186/zangodb)
- [JsStore](https://jsstore.net)
- [localForage](https://localforage.github.io/localForage)

### Design Principles

- [How to Design a Better Progressive Web App](https://www.telerik.com/blogs/how-to-design-a-better-progressive-web-app)
- [Adobe XD UI kits](https://www.adobe.com/mena_en/products/xd/resources.html?promoid=WXYGJ27F&mv=other#panel-3)

### Authentication / Security

- [JWT](https://jwt.io)
- [JWT npm package](https://www.npmjs.com/package/jsonwebtoken)
- [Auth0: Mobile Device Login Flow Best Practices](https://auth0.com/docs/best-practices/mobile-device-login-flow-best-practices)

### Dev environment setup

- [Setup Sapper with Sass](https://medium.com/@sean_27490/svelte-sapper-with-sass-271fff662da9)

### Animations

CSS:

- [tachyons-animate](https://github.com/anater/tachyons-animate)
- [Animista](https://animista.net/play/basic)
- [Animating SVG with CSS](https://blog.logrocket.com/animating-svg-with-css-83e8e27d739c)
- [Animates.css](https://github.com/daneden/animate.css)
- [SVGO](https://github.com/svg/svgo) (for optimizing SVG files)
- [SVG creation](https://www.smashingmagazine.com/2014/11/styling-and-animating-svgs-with-css)
- [SVG drawing animation](https://www.cassie.codes/posts/creating-my-logo-animation)

JS:

- [GSAP](https://greensock.com)
- [Vivus](http://maxwellito.github.io/vivus)
- [Velocity.js](http://velocityjs.org/) (a jQuery-like but much more performant library)
- [SVG.js](https://svgjs.com/docs/3.0)
- [Lottie](http://airbnb.io/lottie/#/README)

### DevOps
- [Node-Express app deployment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)

### Hosting

- [10 Tips to Host Your Web Apps for Free](https://blog.patricktriest.com/host-webapps-free)

### Miscellaneous
- [19 ways to become a better Node.js developer in 2019](https://medium.com/@me_37286/19-ways-to-become-a-better-node-js-developer-in-2019-ffd3a8fbfe38)
- [ZEIT Now](https://zeit.co/vcheeze/gopher-wood)
- [AWS Amplify](https://aws.amazon.com/registration-confirmation)

