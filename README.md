# fluxtory-records

Tribute to Factory Records.

I'm a fan of Factory Records and their design. The album cover art and posters designed by [Peter Saville](https://factoryrecords.org/designed-by-peter-saville-chronological.php), [8vo](https://factoryrecords.org/8vo.php), [Central Station Design](https://factoryrecords.org/central-station-design.php), [Lawrence Weiner](https://factoryrecords.org/lawrence-weiner.php) and [Trevor Johnson](https://factoryrecords.org/trevor-johnson.php) for artists like [Joy Division](https://factoryrecords.org/joy-division.php), [New Order](https://factoryrecords.org/new-order.php), [Happy Mondays](https://factoryrecords.org/happy-mondays.php), [OMD](https://factoryrecords.org/orchestral-manoeuvres-in-dark-omd.php), and more captured the style coming out of Manchester in the mid 80s and early 90s.

This `fluxtory-records` project aims to recreate that style with generative AI.

## How it works

* Fetches releases and cover art from Discogs.
* Stores releases, labels, artists, and images in a local database.
* Runs a script to generate training data for Flux: see: https://fal.ai/models/fal-ai/flux-lora-general-training

## Scripts

In the `scripts` directory, you'll find

* `label-releases` - fetches all releases for a --label, or --all labels if no label is specified
* `update-releases-with-images` - updates the releases with the images
* `download-artist-images` - downloads the --artist images, or --all
* `generate-captions` - generates the captions for each image, for an --artist, or --all
* `backup` - backup the database to an archive file



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

### Discogs API Examples (curl)

#### Get Release

```bash
curl https://api.discogs.com/releases/179699?token=YOUR_DISCOGS_TOKEN --user-agent "fluxtory-records/0.1"
```

#### Get Label

```bash
curl https://api.discogs.com/labels/857?token=YOUR_DISCOGS_TOKEN --user-agent "fluxtory-records/0.1"
```

#### Get Label Releases

```bash
curl https://api.discogs.com/labels/857/releases?token=YOUR_DISCOGS_TOKEN  --user-agent "fluxtory-records/0.1"
```
## Training

### v1

#### Config
https://storage.googleapis.com/fal-flux-lora/f5acaf22500845d9ae019d4398d6cb1b_config.json

```json
{"images_data_url": "https://storage.googleapis.com/isolate-dev-hot-rooster_toolkit_bucket/github_1051633/f5f6c777a9934b7ab7140d1f06d3010b_fluxtory_set_v1.zip?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gke-service-account%40isolate-dev-hot-rooster.iam.gserviceaccount.com%2F20240821%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240821T162724Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=549486f98d90c24bf6f72776823f67845b3adcb1027a6201f3ff3f99de8b920df8684bd0e83a6af56ef9738bf4cc7fe10877e1e7bf1953b982008f78c785d6cfaf0a07cd9b5bbdb591c73d7e3259c9000d0b8965a7fc04ff5cd75ad5857498dd8f542ad9d4f63bff017b4cb0a72cea4de7ae017951a646c43a3c1b95e529ed81520122fbc7da59c6dda38bf848435348d9c0f3cd08ad2c8c87dc6e78c834d119df05166492db21cfdbf4ba636d8e28fed7778a6293015f97d4dafd602be11bc717fabbabe92f87a1474ba1acdf86753ad6ec3e6b98690300accd503a6256170fccd1c310df10aaa8718f9b067f293db3f15a8661a1ca0ae7516bc3e4c6f83735", "data_archive_format": null, "captions_file_url": null, "steps": 1000, "trigger_word": null, "rank": 16, "learning_rate": 0.0004, "batch_size": 1, "experimental_optimizers": "adamw8bit", "experimental_multi_checkpoints_count": 1, "experimental_multi_checkpoints_interval": null, "debug_caption_files": false, "instance_prompt": "Portrait photo"}
```



#### Models

https://storage.googleapis.com/fal-flux-lora/dade937347d341c3aa5d41377afd0973_lora.safetensors


### v2

#### Config
https://storage.googleapis.com/fal-flux-lora/fcd2a173e7844c41a0a2ac3e45512f4b_config.json

```json
{"images_data_url": "https://storage.googleapis.com/isolate-dev-hot-rooster_toolkit_bucket/github_1051633/574c99f25b634be9b07c50cdc7a041ae_training_set_v13_1724321945400.zip?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gke-service-account%40isolate-dev-hot-rooster.iam.gserviceaccount.com%2F20240822%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240822T102551Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=9b6dbbf0b08d40410f584e239661879b66e946b66a9e22db0b9ca935e784b78babc4005cea4e1bf4c4aad3671112736105d317aff706eded59ab61e840abbf7373dc576f0c572965e3ee94ff330ecf32e6c6cb7bec0e4dacbd214206b7fd2521cc41e152e057ac96950931accd4830cfff60e1478339e836d1af0cb987eaaced35c5a8f78ad529644b7a8af0d400877b5a0ee7c9a569b85bd8d6822f1f15b63e43a44cbdd2e8d9a4ab77d66d125dfe4b991f8099123b1191fa26fbdf3fb144f4f90cb61954092c911fba4b19462409ca954c8ec6e64a3ac253e523e926c298e0c92da5da5d789a1ecd79908e86a8668e60715764e8f0ee1f8e4be22f1c8b0ab6", "data_archive_format": null, "captions_file_url": null, "steps": 1000, "trigger_word": "fktry-rcrd", "rank": 16, "learning_rate": 0.0004, "batch_size": 1, "experimental_optimizers": "adamw8bit", "experimental_multi_checkpoints_count": 1, "experimental_multi_checkpoints_interval": null, "debug_caption_files": false, "instance_prompt": "Portrait photo of fktry-rcrd"}
```

#### Models

https://storage.googleapis.com/fal-flux-lora/4d6f45d927064f54ae47fb18548dba16_lora.safetensors
