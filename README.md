# fluxtory-records

Tribute to Factory Records.

I'm a fan of Factory Records and their design. The album cover art and posters designed by [Peter Saville](https://factoryrecords.org/designed-by-peter-saville-chronological.php), [8vo](https://factoryrecords.org/8vo.php), [Central Station Design](https://factoryrecords.org/central-station-design.php), [Lawrence Weiner](https://factoryrecords.org/lawrence-weiner.php) and [Trevor Johnson](https://factoryrecords.org/trevor-johnson.php) for artists like [Joy Division](https://factoryrecords.org/joy-division.php), [New Order](https://factoryrecords.org/new-order.php), [Happy Mondays](https://factoryrecords.org/happy-mondays.php), [OMD](https://factoryrecords.org/orchestral-manoeuvres-in-dark-omd.php), and more captured the style coming out of Manchester in the mid 80s and early 90s.

This `fluxtory-records` project aims to recreate that style with generative AI.

## How it works

* Fetches releases and cover art from Discogs.
* Stores releases, labels, artists, and images in a local database.
* Runs a script to generate training data for Flux: see: https://fal.ai/models/fal-ai/flux-lora-general-training

## Discogs API

Basic REST API for Discogs. However we'll use the [`@lionralfs/discogs-client`](https://github.com/lionralfs/discogs-client) package to interact with the API.

Note that we're using the `--user-agent` flag to set the user agent to `fluxtory-records/0.1`.
Also, it's important to use the `--token` flag to set the token to `YOUR_DISCOGS_TOKEN`.

```ts
export const discogsClient = new DiscogsClient({
  userAgent: 'fluxtory-records/0.1',
  auth: {
    userToken: process.env.DISCOGS_USER_TOKEN,
  },
})
```

Otherwise, thumbnails and images will not returned in the response.

### Get Release

```bash
curl https://api.discogs.com/releases/249504 --user-agent "fluxtory-records/0.1"
```

### Get Label

```bash
curl https://api.discogs.com/labels/857 --user-agent "fluxtory-records/0.1"
```

### Get Label Releases

```bash
curl https://api.discogs.com/labels/857/releases --user-agent "fluxtory-records/0.1"
```
