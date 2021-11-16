<script>
  import { onMount } from 'svelte';
  // import session from 'express-session';
  // import Keycloak from 'keycloak-connect';
  import { _ } from 'svelte-i18n';

  onMount(() => {
    var keycloak = new Keycloak();
    keycloak
      .init()
      .then(function(authenticated) {
        alert(authenticated ? 'authenticated' : 'not authenticated');
      })
      .catch(function() {
        alert('failed to initialize');
      });
  });
</script>

<svelte:head>
  <title>Admin</title>
</svelte:head>

<h1>{$_('page.admin.title')}</h1>

<p>{$_('page.admin.description')}</p>
