"""
Arma las hojas de sprites de Marianne para el Reto 4.

Todas las animaciones acaban en celdas del mismo tamaño, con los pies en el
borde inferior, para que el juego sólo tenga que cambiar de hoja.
"""
import os
from PIL import Image

ORIGEN = r"C:\Users\USUARIO\AppData\Local\Temp\claude\094b8b152e7a5e2b\30710f65-4cb5-4f7b-9240-9f87da8abfaf\images"
DESTINO = r"C:\Users\USUARIO\Desktop\lizeth\expediente-01\src\assets"

ALTO_DE_PIE = 240  # a cuántos píxeles equivale la figura de pie


def fotogramas_gif(nombre):
    im = Image.open(os.path.join(ORIGEN, nombre))
    salida = []
    for i in range(im.n_frames):
        im.seek(i)
        salida.append(im.convert("RGBA"))
    return salida


def caja_union(fotogramas):
    cajas = [f.getbbox() for f in fotogramas if f.getbbox()]
    return (
        min(c[0] for c in cajas),
        min(c[1] for c in cajas),
        max(c[2] for c in cajas),
        max(c[3] for c in cajas),
    )


def recortar_todos(fotogramas):
    caja = caja_union(fotogramas)
    return [f.crop(caja) for f in fotogramas]


def quitar_fondo_negro(im, umbral=45):
    im = im.convert("RGBA")
    pix = im.load()
    for y in range(im.size[1]):
        for x in range(im.size[0]):
            r, g, b, _ = pix[x, y]
            if r < umbral and g < umbral and b < umbral:
                pix[x, y] = (0, 0, 0, 0)
    return im


def fotogramas_hoja(nombre, n, fondo_negro=False):
    """
    Parte una hoja en n celdas. Mantiene el alto común (para que el salto
    conserve su arco) y centra cada figura en horizontal.
    """
    im = Image.open(os.path.join(ORIGEN, nombre)).convert("RGBA")
    if fondo_negro:
        im = quitar_fondo_negro(im)
    _, y0, _, y1 = im.getbbox()
    paso = im.size[0] / n

    celdas = []
    for i in range(n):
        celda = im.crop((round(i * paso), y0, round((i + 1) * paso), y1))
        caja = celda.getbbox()
        celdas.append((celda, caja))

    ancho = max(c[2] - c[0] for _, c in celdas if c)
    salida = []
    for celda, caja in celdas:
        lienzo = Image.new("RGBA", (ancho, celda.size[1]), (0, 0, 0, 0))
        if caja:
            trozo = celda.crop((caja[0], 0, caja[2], celda.size[1]))
            lienzo.paste(trozo, ((ancho - trozo.size[0]) // 2, 0), trozo)
        salida.append(lienzo)
    return salida


# --- fuentes ---
idle = recortar_todos(fotogramas_gif("2.gif"))
correr = recortar_todos(fotogramas_gif("3.gif"))
salto = fotogramas_hoja("6.webp", 8, fondo_negro=True)
agachar = [salto[1], salto[6]]  # las dos poses en cuclillas

k = ALTO_DE_PIE / idle[0].size[1]


def escalar(fotogramas):
    return [
        f.resize((max(1, round(f.size[0] * k)), max(1, round(f.size[1] * k))), Image.LANCZOS)
        for f in fotogramas
    ]


animaciones = {
    "n4-idle": escalar(idle[:1]),
    "n4-correr": escalar(correr),
    "n4-saltar": escalar(salto),
    "n4-agachar": escalar(agachar),
}

celda_w = max(f.size[0] for fs in animaciones.values() for f in fs)
celda_h = max(f.size[1] for fs in animaciones.values() for f in fs)

print(f"celda = {celda_w} x {celda_h}  (escala {k:.3f})")

for nombre, fotogramas in animaciones.items():
    hoja = Image.new("RGBA", (celda_w * len(fotogramas), celda_h), (0, 0, 0, 0))
    for i, f in enumerate(fotogramas):
        x = i * celda_w + (celda_w - f.size[0]) // 2
        y = celda_h - f.size[1]  # pies abajo
        hoja.paste(f, (x, y), f)
    ruta = os.path.join(DESTINO, nombre + ".png")
    hoja.save(ruta, optimize=True)
    print(f"{nombre}: {len(fotogramas)} fotogramas -> {hoja.size}  {os.path.getsize(ruta) // 1024} KB")
