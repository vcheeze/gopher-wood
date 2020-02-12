const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({
    scss: {
      includPaths: ['src'],
    },
    postcss: {
      plugins: [require('autoprefixer')],
    },
  }),
};
