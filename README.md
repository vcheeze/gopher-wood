# gopher-wood <!-- omit in toc -->

Official app for Gopher Wood Clinic.

## Table of Contents <!-- omit in toc -->

- [Getting started](#getting-started)
  - [Running the project](#running-the-project)
- [For Developers](#for-developers)
  - [Technologies](#technologies)
  - [Release Management and Naming Conventions](#release-management-and-naming-conventions)
  - [Features Sets](#features-sets)
- [Notes & Resources](#notes--resources)
  - [PWAs (Progressive Web Apps)](#pwas-progressive-web-apps)
  - [Database/Offline Functionality](#databaseoffline-functionality)
  - [Design Principles](#design-principles)
  - [Security](#security)
  - [Dev environment setup](#dev-environment-setup)
  - [Animations](#animations)

## Getting started

This project uses the [Sapper](https://github.com/sveltejs/sapper) template, available for Rollup and webpack.

### Running the project

Install dependencies and run the project in development mode with:

```bash
cd my-app
npm install # or yarn
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.

## For Developers

### Technologies

We use [Sapper](https://sapper.svelte.dev), a framework built on [Svelte](https://svelte.dev). [Tachyons](https://tachyons.io) is used for CSS. Svelte's preferred bundler, [Rollup](https://rollupjs.org/guide/en), is used, as well as [Polka](https://github.com/lukeed/polka) instead of Express for the server.

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

TBD.

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

### Security

- [JWT](https://jwt.io)
- [JWT npm package](https://www.npmjs.com/package/jsonwebtoken)

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
