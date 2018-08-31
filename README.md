# espoo.kobujutsu.fi

> Web site for "Espoon Yuishinkai ry", a martial club in Espoo, Finland.

![Visual Regression Status](https://api.ghostinspector.com/v1/suites/595b6dd7a66a5e53b4a3cd3d/status-badge)

The web site is available at `espoo.kobujutsu.fi`, in which it is deployed immediately when something is pushed to this GitHub repository.
The web site is hosted at [Netlify](https://www.netlify.com/), for free since creating open source stuff is great.

The site is configured to only allow secured connections (via `https`) and
the certificates for it are provided for free by [Let's Encrypt](https://letsencrypt.org/).

## Service Worker

Service Worker is used for caching assets, also
[with `backgroundFetch`](https://philna.sh/blog/2017/07/04/experimenting-with-the-background-fetch-api/).
However, by default the network is used, and only when it fails, then local cache is utilised.

## Sub-resource Integrity

I just had to play with [SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity):

```sh
shasum -a 256 public/assets/default.css | xxd -r -p | base64
```

But it is not used currently, since it requires additional step when adjusting styles and hence easily forgotten.

## Cross browser supported styling

CSS should be passed through [online Autoprefixer at `autoprefixer.github.io`](https://autoprefixer.github.io/).
Using there the option `"last 4 version"`.

## Testing with GhostInspector

[![GhostInspector](ghostinspector-logo.png)](https://ghostinspector.com/)

Functional and visual regression testing with latest Mozilla Firefox is provided for free by
[GhostInspector(https://ghostinspector.com/).

## Testing with CrossBrowserTesting

[![CrossBrowserTesting](crossbrowsertesting-logo.png)](https://crossbrowsertesting.com/).

Cross browser testing provided for free by [CrossBrowserTesting](https://crossbrowsertesting.com/).

## Testing with sitespeed.io

Install [the `sitespeed.io`](https://www.sitespeed.io/documentation/sitespeed.io/) command line tool via [`npm`, that comes with Node.js](https://nodejs.org/en/download/):

```sh
[sudo] npm install --global sitespeed.io
```

Execute:

```sh
sitespeed.io https://espoo.kobujutsu.fi
```

Results will appear in the folder `sitespeed-results/espoo.kobujutsu.fi/`.

## Testing with sonar

Install [the `sonar`](https://sonarwhal.com/) command line tool via [`npm`, that comes with Node.js](https://nodejs.org/en/download/):

```sh
[sudo] npm install --global --engine-strict sonarwhal
```

The configuration for it is already available in the file called `.sonarrc` and used via:

```sh
sonar https://espoo.kobujutsu.fi
```

## License

Licensed under [the MIT license](LICENSE).
