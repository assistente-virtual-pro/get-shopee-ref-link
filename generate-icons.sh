#!/bin/bash

# Script para gerar ícones PNG a partir do SVG
# Requer: ImageMagick (convert) ou Inkscape

ICON_SVG="images/icon.svg"

if [ ! -f "$ICON_SVG" ]; then
    echo "Erro: Arquivo $ICON_SVG não encontrado!"
    exit 1
fi

echo "Gerando ícones da extensão..."

# Dimensões necessárias
SIZES=(16 48 128)

# Tentar usar ImageMagick
if command -v convert &> /dev/null; then
    for size in "${SIZES[@]}"; do
        OUTPUT="images/icon-${size}.png"
        echo "Gerando $OUTPUT (${size}x${size}px)..."
        convert -background none -size ${size}x${size} "$ICON_SVG" -resize ${size}x${size} "$OUTPUT"
    done
    echo "✓ Ícones gerados com sucesso!"
    exit 0
fi

# Tentar usar Inkscape
if command -v inkscape &> /dev/null; then
    for size in "${SIZES[@]}"; do
        OUTPUT="images/icon-${size}.png"
        echo "Gerando $OUTPUT (${size}x${size}px)..."
        inkscape "$ICON_SVG" -w $size -h $size -o "$OUTPUT"
    done
    echo "✓ Ícones gerados com sucesso!"
    exit 0
fi

echo "Erro: Nenhuma ferramenta para converter SVG encontrada."
echo "Por favor, instale ImageMagick ou Inkscape:"
echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
echo "  macOS: brew install imagemagick"
exit 1
