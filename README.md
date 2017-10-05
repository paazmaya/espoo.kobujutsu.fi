# espoo.kobujutsu.fi

Web site for "Espoon Yuishinkai ry", a martial club in Espoo, Finland.

The web site is available at `espoo.kobujutsu.fi`, in which it is deployed immediately when something is pushed to this GitHub repository.
The web site is hosted at [Netlify](https://www.netlify.com/), for free since creating open source stuff is great.

## Service Worker

Service Worker is used for caching assets, also [with `backgroundFetch`](https://philna.sh/blog/2017/07/04/experimenting-with-the-background-fetch-api/).
However, buy default the network is used, and only when it fails, then local cache is utilised.

## Sub-resource Integrity

I just had to play with [SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity):

```sh
shasum -a 256 public/assets/default.css | xxd -r -p | base64
```

But it is not used currently...

## Cross browser supported styling

CSS should be passed through [online Autoprefixer at `autoprefixer.github.io`](https://autoprefixer.github.io/).
Using there the option `"last 4 version"`.

## Testing with GhostInspector

Functional and visual regression testing with latest Mozilla Firefox is provided for free by
[GhostInspector ![GhostInspector](ghostinspector-logo.png)](https://ghostinspector.com/).

## Testing with CrossBrowserTesting

Cross browser testing provided for free by
[CrossBrowserTesting ![CrossBrowserTesting](crossbrowsertesting-logo.png)](https://crossbrowsertesting.com/).

## Testing with sitespeed.io

Install [the `sitespeed.io`](https://www.sitespeed.io/documentation/sitespeed.io/) command line tool via [`npm`, that comes with Node.js](https://nodejs.org/en/download/):

```sh
[sudo] npm install --global sitespeed.io
```

Execute:

```sh
sitespeed.io https://espoo.kobujutsu.fi
```

Results will appear in the folder `site
speed-results/espoo.kobujutsu.fi/`.

## Testing with sonar

Install [the `sonar`](https://sonarwhal.com/) command line tool via [`npm`, that comes with Node.js](https://nodejs.org/en/download/):

```sh
[sudo] npm install --global @sonarwhal/sonar
```

The configuration for it is already available in the file called `.sonarrc` and used via:

```sh
sonar https://espoo.kobujutsu.fi
```

## License

Licensed under [the MIT license](LICENSE).
