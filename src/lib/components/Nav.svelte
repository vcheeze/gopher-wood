<script lang="ts">
	import { page } from '$app/stores';
	import { locale, setLocale, t } from '$lib/translations';

	$: imageUri = $locale === 'en' ? '/images/clinic_name_en.svg' : '/images/clinic_name_zh.svg';

	function switchLocale() {
		setLocale($locale === 'en' ? 'zh-Hant' : 'en');
	}
</script>

<nav class="navbar">
	<a class="logo" href="/">
		<img class="logo-img" src={imageUri} alt="gopherwoodclinic.org" />
	</a>
	<div class="navbar-pages">
		<ul class="navbar-pages-list">
			<li class="navbar-pages-list-item">
				<a class:selected={$page.url.pathname === '/'} href=".">
					{$t('common.nav.home')}
				</a>
			</li>
			<li class="navbar-pages-list-item">
				<a class:selected={$page.url.pathname === '/ivc'} href="ivc">
					{$t('common.nav.ivc')}
				</a>
			</li>
			<li class="navbar-pages-list-item">
				<a class:selected={$page.url.pathname === '/about'} href="about">
					{$t('common.nav.about')}
				</a>
			</li>
			<li class="navbar-pages-list-item">
				<a class:selected={$page.url.pathname === '/contact'} href="contact">
					{$t('common.nav.contact')}
				</a>
			</li>
		</ul>
	</div>
	<div>
		<span class="language-switch" on:click={switchLocale} aria-hidden="true">
			{$t('common.locale')}
		</span>
	</div>
</nav>

<style lang="less">
	.navbar {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin: 0;
		padding: 0 1rem;
		border-bottom-style: solid;
		border-bottom-width: 1px;

		&-pages {
			flex: 1 1 auto;
			min-width: 0;
			min-height: 0;

			&-list {
				height: 100%;
				margin: 0;
				padding: 0 1rem;
				display: flex;
				align-items: center;

				&::after {
					content: '';
					display: block;
					clear: both;
				}

				&-item {
					display: block;
					float: left;
					cursor: pointer;

					& > a {
						text-decoration: none;
						padding: 1rem;

						&.selected {
							display: inline-block;
							position: relative;

							&::after {
								position: absolute;
								content: '';
								width: calc(100% - 2rem);
								height: 2px;
								background-color: #19a974;
								display: block;
								bottom: -1px;
							}
						}
					}
				}
			}
		}
	}

	.logo {
		line-height: 56px;

		&-img {
			display: inline-block;
			vertical-align: middle;
			height: 24px;
		}
	}

	.language-switch {
		display: inline-block;
		padding: 1rem;
		cursor: pointer;
		opacity: 1;
		transition: opacity 0.15s ease-in;
	}
</style>
