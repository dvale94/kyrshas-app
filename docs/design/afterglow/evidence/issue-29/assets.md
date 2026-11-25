# Artwork inventory

The owner supplied seven ChatGPT-generated PNGs locally and authorized these uses for this personal app in [issue #29](https://github.com/dvale94/kyrshas-app/issues/29). The five portrait originals and their JPEG derivatives are under `modernization/expo-next/assets/afterglow/`. Both landscape boards are documentation under `docs/design/afterglow/references/`. The seven PNGs were the only untracked entries on main before the isolated checkout. Original file bytes were copied directly.

| Original PNG | Pixels | Bytes | SHA-256 |
|---|---:|---:|---|
| quote | 941 × 1672 | 1,578,697 | `41496ca0b1e2ef80369588c89b1da30099b212b43de39c81b836746cb3c916e5` |
| trivia | 941 × 1672 | 1,943,001 | `58a2637c39616f81d23e0690e6860e8ab98499a11e3c18f001e644784d5ae1a5` |
| fact | 941 × 1672 | 1,997,828 | `b73e1908a92148883e3a0eaf44a46f7322e529e5706b75bcc831b0ac60bd0766` |
| dad-joke | 941 × 1672 | 1,611,745 | `591a90e59a73afb321f706bd7c9758a47e5f4663e8de301cf3e25785df2bd7f5` |
| bucket-list | 941 × 1672 | 1,769,777 | `7188fe1d234e7318cdfff4caeeee1144b808e17b2a2b20026abccdea3010f4fd` |
| afterglow-concept | 1672 × 941 | 2,068,576 | `e1686ad12a1815960435fee152af1586534a20c4d616952c5df931b32c1cdc41` |
| afterglow-interaction-states | 1672 × 941 | 1,973,000 | `222c05b709403fc1c7df8a56edefa3d1422b3bc6a5dc173fdc362c61d856209a` |

The five PNGs total 8,901,048 bytes. Each runtime derivative preserves all 941 × 1672 pixels. macOS `sips -s format jpeg -s formatOptions 88 input.png --out output.jpg` reduced the five files to **1,429,977 bytes (1.36 MiB)**. Only these JPEGs have static runtime references. The concept boards and PNG originals are outside the application import graph.

| Bundled JPEG | Bytes | SHA-256 |
|---|---:|---|
| quote.jpg | 203,178 | `bc4c67e882504497ab8ff22bcc4e7dc05d18149dc5589f106729e4e03478bb5e` |
| trivia.jpg | 348,831 | `1af5a351e7e92eccf8e48626056de6823e68b53220a96acfa7c003817d547270` |
| fact.jpg | 396,490 | `ae14d992e543e9aa87963963e516957a95145c11aad62326400a0808b108022b` |
| dad-joke.jpg | 195,755 | `ffc329ffd69daef4179d16b9668e3a33c6a48667eac12640d9b58c7b3d97bb8b` |
| bucket-list.jpg | 285,723 | `3c81913bc0602a71e55d464f2e4c1afb8701cfd543eeb3d744bcb5726b4217c0` |

At four bytes per pixel a source-sized decode is estimated at 6,293,408 bytes (6.00 MiB) per picture. Five resident full-size decodes would be about 30 MiB. A single settled image is mounted behind the pager. Platform caching, downsampling, textures and live memory were not profiled. Byte counts above are on-disk measurements.
