#!/bin/bash

# Script para gerar ícones PNG simples sem dependências externas
# Cria ícones usando puro shell e dados base64

# Ícone 16x16px - PNG vazio com fundo roxo
echo "Criando icon-16.png..."
python3 << 'EOF'
from PIL import Image, ImageDraw
import os

os.makedirs('images', exist_ok=True)

# Cores
colors = {
    16: '#667eea',
    48: '#667eea', 
    128: '#667eea'
}

sizes = [16, 48, 128]

for size in sizes:
    # Criar imagem com fundo de cor
    img = Image.new('RGBA', (size, size), (102, 126, 234, 255))
    
    # Adicionar texto "S" para Shopee
    draw = ImageDraw.Draw(img)
    
    # Tentar usar uma fonte, se não existir, usar a padrão
    try:
        from PIL import ImageFont
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size=int(size*0.6))
    except:
        font = ImageFont.load_default()
    
    # Desenhar um "S" branco no centro
    text = "S"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
    
    # Salvar
    img.save(f'images/icon-{size}.png')
    print(f"✓ icon-{size}.png criado ({size}x{size}px)")

EOF

if [ $? -eq 0 ]; then
    echo "✓ Todos os ícones foram criados com sucesso!"
else
    echo "Nota: Pillow (PIL) não está instalado. Usando fallback..."
    
    # Fallback: criar ícones usando convert do ImageMagick se disponível
    if command -v convert &> /dev/null; then
        for size in 16 48 128; do
            convert -size ${size}x${size} xc:'#667eea' \
                    -gravity center \
                    -pointsize $((size / 2)) \
                    -fill white \
                    -annotate +0+0 'S' \
                    images/icon-${size}.png
            echo "✓ icon-${size}.png criado"
        done
    else
        echo "Aviso: Nenhuma ferramenta de imagem encontrada."
        echo "Instale: pip install pillow  ou  sudo apt install imagemagick"
    fi
fi
