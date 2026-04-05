// scripts/optimize-images.mjs
// Converts all product images to optimized WebP format
// Run: node scripts/optimize-images.mjs

import sharp from 'sharp'
import { readdirSync, mkdirSync, copyFileSync } from 'fs'
import { join, parse } from 'path'

const SRC_DIR = 'public/images/products'
const EXTRA_SRC = 'D:/Alim/Проект/Sait/Фото/1-Панелі перекриття/Основний.png'
const EXTRA_DEST_NAME = 'paneli-perekryttya'

// Card images: 600px wide is enough for retina mobile (300px CSS * 2x)
const CARD_WIDTH = 600
const WEBP_QUALITY = 78

async function run() {
    // First, copy the new paneli-perekryttya source
    const tempSrc = join(SRC_DIR, 'paneli-perekryttya-src.png')
    copyFileSync(EXTRA_SRC, tempSrc)

    const files = readdirSync(SRC_DIR).filter(
        (f) => /\.(png|jpg|jpeg)$/i.test(f) && !f.endsWith('-src.png'),
    )

    // Also process the new source file  
    const allFiles = [...files, 'paneli-perekryttya-src.png']
    // Deduplicate output names
    const processed = new Set()

    for (const file of allFiles) {
        const { name } = parse(file)
        const outName = name === 'paneli-perekryttya-src' ? EXTRA_DEST_NAME : name

        if (processed.has(outName)) continue
        processed.add(outName)

        const input = join(SRC_DIR, file)
        const output = join(SRC_DIR, `${outName}.webp`)

        try {
            const meta = await sharp(input).metadata()
            const needsResize = (meta.width || 0) > CARD_WIDTH

            let pipeline = sharp(input)
            if (needsResize) {
                pipeline = pipeline.resize(CARD_WIDTH, null, {
                    withoutEnlargement: true,
                    fit: 'inside',
                })
            }

            await pipeline
                .webp({ quality: WEBP_QUALITY, effort: 6 })
                .toFile(output)

            const origSize = (await sharp(input).metadata()).size || 0
            const newMeta = await sharp(output).metadata()
            console.log(
                `✅ ${file} (${meta.width}x${meta.height}) → ${outName}.webp (${CARD_WIDTH}w, ~${Math.round((newMeta.size || 0) / 1024)}KB)`,
            )
        } catch (err) {
            console.error(`❌ ${file}: ${err.message}`)
        }
    }

    // Clean up temp file
    const { unlinkSync } = await import('fs')
    try { unlinkSync(tempSrc) } catch { }

    console.log('\n🎉 Done! All images optimized to WebP.')
}

run()
