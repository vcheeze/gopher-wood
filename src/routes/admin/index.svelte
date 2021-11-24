<script>
  import { onMount } from 'svelte';
  import { userInfo } from '../../store';
  // import session from 'express-session';
  // import Keycloak from 'keycloak-connect';
  import { _ } from 'svelte-i18n';

  onMount(() => {
    var keycloak = new Keycloak();
    keycloak
      .init({ onLoad: 'login-required' })
      .then(authenticated => {
        if (!authenticated) {
          keycloak.loadUserInfo().then(user => {
            user.token = keycloak.idToken;
            userInfo.set(user);
          });
        }
      })
      .catch(e => {
        alert('failed to initialize');
      });
  });
</script>

<svelte:head>
  <title>歌斐木診所 - {$_('page.admin.title')}</title>
</svelte:head>

<h1>{$_('page.admin.title')}</h1>

<p>{$_('page.admin.description')}</p>
