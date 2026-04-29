#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY = 75; // Reducir a 75 para mejor compresión
const WEBP_QUALITY = 75;

async function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024 / 1024).toFixed(2); // Convertir a MB
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath);
  const dir = path.dirname(filePath);

  // Skip archivos del sistema
  if (basename.startsWith('.')) {
    return null;
  }

  try {
    const originalSize = await getFileSize(filePath);

    // Si es WebP, re-comprimir con mejor calidad
    if (ext === '.webp') {
      const tempPath = filePath + '.temp.webp';

      await sharp(filePath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(tempPath);

      const newSize = await getFileSize(tempPath);

      // Solo reemplazar si el nuevo archivo es más pequeño
      if (parseFloat(newSize) < parseFloat(originalSize)) {
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        const saved = ((1 - parseFloat(newSize) / parseFloat(originalSize)) * 100).toFixed(1);
        console.log(`✓ ${basename}`);
        console.log(`  ${originalSize}MB → ${newSize}MB (${saved}% comprimido)`);
      } else {
        fs.unlinkSync(tempPath);
      }
      return null;
    }

    // Convertir PNG/JPG a WebP
    const webpPath = filePath.replace(ext, '.webp');

    await sharp(filePath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);

    const newSize = await getFileSize(webpPath);
    const saved = ((1 - parseFloat(newSize) / parseFloat(originalSize)) * 100).toFixed(1);

    console.log(`✓ ${basename}`);
    console.log(`  ${originalSize}MB → ${newSize}MB (${saved}% comprimido)`);

    // Eliminar archivo original
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      fs.unlinkSync(filePath);
      console.log(`  Eliminado archivo original`);
    }

    return { original: originalSize, optimized: newSize, saved };
  } catch (error) {
    console.error(`✗ Error optimizando ${basename}:`, error.message);
    return null;
  }
}

async function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await walkDir(filePath);
    } else if (['.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file).toLowerCase())) {
      await optimizeImage(filePath);
    }
  }
}

async function main() {
  console.log('🖼️  Optimizando imágenes...\n');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directorio no encontrado: ${IMAGES_DIR}`);
    process.exit(1);
  }

  try {
    await walkDir(IMAGES_DIR);
    console.log('\n✅ Optimización completada');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
