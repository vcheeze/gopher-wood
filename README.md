# gopher-wood <!-- omit in toc -->

Official app for Gopher Wood Clinic.

## Table of Contents <!-- omit in toc -->

- [Getting started](#getting-started)
  - [Running the project locally](#running-the-project-locally)
- [For Developers](#for-developers)
  - [Architecture](#architecture)
  - [Technologies](#technologies)
    - [The base app](#the-base-app)
    - [The database](#the-database)
    - [User Authentication / Management](#user-authentication--management)
    - [PWA / SEO](#pwa--seo)
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

Open up [localhost:3000](http://localhost:3000) and start clicking around. If something fails, just as a note: the node version we are currently using is v14.17.0 (LTS when this is written).

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.

## For Developers

### Architecture

Our source code is on [our GitHub repo](https://github.com/vcheeze/gopher-wood). We utilize [Hostinger](https://www.hostinger.com)'s VPS plan to host the app. The domain is currently bought from [GoDaddy](https://www.godaddy.com). The server that we have chosen in Hostinger is an Ubuntu 20.04 server. [Digital Ocean](https://www.digitalocean.com) has a lot of neat tutorials for Ubuntu, and for different versions as well, so it's definitely worth checking out what they have.

This is so that we are not always accessing the server with the root user, who has total control over the server and can accidentally perform destructive tasks that can take a lot of time and effort to repair.

On the server, we have installed all the necessary tools such as `node`, `npm`, `git`, `pm2`, `nginx`, `mariadb`, etc. Detailed steps can be seen on some documentation somewhere (Medium.com or somewhere else). Essentially, `pm2` is used to run the app, and `nginx` is used as a proxy to connect our domain to the server. Of course, for the domain to be mapped to the server, we also need to point the DNS record on GoDaddy to our server's IP address.

In order to deploy the app, simply `cd` into the app directory, do a `git pull`, `npm i` if `package.json` has been changed, then `npm run build`. pm2 should pick up the changes automatically from `__sapper__/build/` and serve the updated files. If your changes are not reflected, simply run `pm2 restart [PID of our process]` in the terminal. You can find the PID by entering `pm2 list`. If you need to start an entire new process, run `pm2 start __sapper__/build` to start serving the app. There should also be a service configured called `pm2-gw-admin` that automatically starts serving our app when the system starts up again (i.e. after a reboot).

MariaDB on the server is used to store IVC appointments, as well as the current queue number. As for real time functionality, we are using [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) with our existing MariaDB.

### Technologies

#### The base app

We use [Sapper](https://sapper.svelte.dev), a framework built on [Svelte](https://svelte.dev). [Tachyons](https://tachyons.io) is used for CSS; read [this article by Adam Wathan](https://adamwathan.me/css-utility-classes-and-separation-of-concerns) for an idea of why we use functional CSS. Svelte's preferred bundler, [Rollup](https://rollupjs.org/guide/en), is used, as well as [Express](https://expressjs.com/). We use Express instead of the default Polka that comes with the Sapper template because of the way we are handling [authentication](#user-authentication--management).

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

For internationalization, we use [svelte-i18n](https://github.com/kaisermann/svelte-i18n) to accommodate both English and Traditional Chinese. The author of this package has an [example with Sapper](https://github.com/kaisermann/sapper-template-i18n) that we have referred to in order to incorporate `svelte-i18n` into our app.

Since Sapper uses Express, our we can write our server as well within the same application, and this is where all our APIs reside.

That's it! Go and get started on our Gopher Wood Clinic app :)

#### The database

We use MariaDB on the Ubuntu server to store timesots and the current queue number.

To install MariaDB on Ubuntu, follow [this guide by Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04).

It is also configured to only allow localhost connections, so remote attempts to connect to the DB will currently fail. Whether we open up remote connections at a later point will be decided when necessary.

#### User Authentication / Management

Within the Auth0 dashboard you will see an application called Gopher Wood, and that is where our system is set up.

We currently only allow a social login through Google, and any routes under `/admin` requires the user to be logged in. However, I still need to figure out how to allow only specific email addresses to login, and disable the rest.


The above can be considered deprecated for now. I will try to set up [Keycloak](https://www.keycloak.org/) on our Ubuntu server so that we can manage our own users. We are going to use docker to install Keycloack since we will likely use docker eventually for deployment. To install docker, follow their [official guide for Ubuntu](https://docs.docker.com/engine/install/ubuntu/).

- https://keycloak.ch/keycloak-tutorials/tutorial-1-installing-and-running-keycloak/
- https://www.keycloak.org/docs/latest/getting_started/#trying-out-keycloak
- https://usmanshahid.medium.com/levels-of-access-control-through-keycloak-part-1-d29e24b0ddad
- https://wkrzywiec.medium.com/create-and-configure-keycloak-oauth-2-0-authorization-server-f75e2f6f6046
- https://medium.com/@hasnat.saeed/setup-keycloak-server-on-ubuntu-18-04-ed8c7c79a2d9
- https://www.techrunnr.com/how-to-set-up-a-keycloak-server-in-linux/
- https://zweck.io/setting-up-keycloak-sso-open-source-identity-and-access-management/
- https://tux-techie.com/2020/11/01/how-to-install-keycloak-in-ubuntu-20-04/
- 

#### PWA / SEO

I have currently combined these 2 categories into one because I don't have much to say about them yet. SEO should fall under PWA anyway, and we currently utilize [Progressier](https://progressier.com) to achieve some simple functions such as prompt to install, manifest.json and its required images, and the service worker for our app. It should generate the necessary headers as well for SEO, though of course we can still add on to whatever is generated. To check our Progressier's integration with our app, we can go to the [Progressier Dashboard](https://progressier.com/dashboard).

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

#### Sprint 3 <!-- omit in toc -->

Add admin pages:
- Login system with [Auth0](https://auth0.com/)
- Page to view appointments (think about table and calendar views)
- Page to update IVC appointment rules (i.e. how many days in advance, when is the latest someone can get an appointment, etc.)

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
- [Popmotion](https://popmotion.io)

### DevOps
- [Node-Express app deployment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)

### Hosting

- [10 Tips to Host Your Web Apps for Free](https://blog.patricktriest.com/host-webapps-free)

### Miscellaneous
- [19 ways to become a better Node.js developer in 2019](https://medium.com/@me_37286/19-ways-to-become-a-better-node-js-developer-in-2019-ffd3a8fbfe38)
- [ZEIT Now](https://zeit.co/vcheeze/gopher-wood)
