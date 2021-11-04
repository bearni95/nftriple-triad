import { CardImporter } from '../dist/triple-triad/CardImporter.js'

console.log(`importing ${process.env.npm_config_openseaUrl}`);

const importer = new CardImporter([process.env.npm_config_openseaUrl])
importer.bulkImport()
.then(() => {
    console.log('done')
})
.catch(err => {
    console.error(err)
})