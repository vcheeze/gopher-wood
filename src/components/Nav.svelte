<script>
  import { onMount } from 'svelte';
  import { locale, _ } from 'svelte-i18n';
  export let segment;

  /*--- setup for GSAP animation ---*/
  let menuToggle;
  let displayMenu = false;
  onMount(() => {
    menuToggle = gsap.timeline({ paused: true, reversed: true });
    menuToggle
      .to('.top', 0.2, { y: '-9px', transformOrigin: '50% 50%' }, 'burg')
      .to('.bot', 0.2, { y: '9px', transformOrigin: '50% 50%' }, 'burg')
      .to(
        '.mid',
        0.2,
        { scale: 0.1, transformOrigin: '50% 50%', fill: 'white' },
        'burg'
      )
      .add('rotate')
      .to('.top', 0.2, { y: '5', fill: 'white' }, 'rotate')
      .to('.bot', 0.2, { y: '-5', fill: 'white' }, 'rotate')
      .to('.top', 0.2, { rotationZ: 45, transformOrigin: '50% 50%' }, 'rotate')
      .to(
        '.bot',
        0.2,
        { rotationZ: -45, transformOrigin: '50% 50%' },
        'rotate'
      );
  });

  function handleBurgerClick() {
    menuToggle.reversed() ? menuToggle.restart() : menuToggle.reverse();
    displayMenu = !displayMenu;
  }
  /*--- END setup for GSAP animation ---*/

  function switchLocale() {
    locale.set($locale === 'en' ? 'zh-Hant' : 'en');
  }

  const styles = {
    nav:
      'flex justify-between absolute w-100 ma0 ph3 fw3 z-999 bb b--washed-green', // TODO consider changing z-index later
    ul: 'ma0 pa0 dn db-ns',
    li: 'db pointer fl',
    a: 'no-underline pv3 ph2 db',
    locale: 'dib pv3 ph2 pointer dim',
    burger: 'dn-ns',
    menu: 'absolute dt vh-100 w-100 bg-dark-gray', // add z-index?
    menuList: 'ma0 pa0 dtc v-mid tc',
    menuItem: 'db pointer f2 near-white',
  };
</script>

<style>
  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1rem);
    height: 2px;
    background-color: rgb(25, 169, 116);
    display: block;
    bottom: -1px;
  }
</style>

<nav class={styles.nav}>
  <ul class={styles.ul}>
    <li class={styles.li}>
      <a class={styles.a} class:selected={segment === undefined} href=".">
        {$_('nav.home')}
      </a>
    </li>
    <li class={styles.li}>
      <a class={styles.a} class:selected={segment === 'about'} href="about">
        {$_('nav.about')}
      </a>
    </li>
  </ul>
  <svg
    id="burger"
    width="30"
    height="53"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    class={styles.burger}
    on:click={handleBurgerClick}>
    <path class="top" d="M0 9h30v2H0z" fill="#333333" />
    <line
      class="mid"
      x1="0"
      y1="15"
      x2="30"
      y2="15"
      stroke="#333333"
      stroke-width="2"
      vector-effect="non-scaling-stroke" />
    <path class="bot" d="M0 19h30v2H0z" fill="#333333" />
  </svg>
  <div>
    <span class={styles.locale} on:click={switchLocale}>
      {$locale === 'en' ? '中' : 'en'}
    </span>
    <!-- <span class={styles.locale} on:click={() => switchLocale('en')}>En</span> -->
  </div>
</nav>

{#if displayMenu}
  <div class={styles.menu}>
    <ul class={styles.menuList}>
      <li class={styles.menuItem} on:click={handleBurgerClick}>
        <a class={styles.a} class:selected={segment === undefined} href=".">
          {$_('nav.home')}
        </a>
      </li>
      <li class={styles.menuItem} on:click={handleBurgerClick}>
        <a class={styles.a} class:selected={segment === 'about'} href="about">
          {$_('nav.about')}
        </a>
      </li>
    </ul>
  </div>
{/if}
