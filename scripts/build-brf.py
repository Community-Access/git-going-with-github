#!/usr/bin/env python3
"""
Convert plain text to BRF (Braille Ready Format) using liblouis.
No TTS required: this is pure text-to-braille-dots translation.

Usage: python3 build-brf.py input.txt output.brf [--code ueb|ebae]

--code ueb   Unified English Braille, grade 2 (the default)
--code ebae  English Braille American Edition, grade 2: the pre-UEB US code,
             for readers who prefer it (issue #174)
"""
import sys
import louis

TABLES = {
    "ueb": "en-ueb-g2.ctb",
    "ebae": "en-us-g2.ctb",
}

# NABCC (North American Braille Computer Code) lookup table.
# Maps 6-dot braille cell bitmask (0-63) to ASCII character.
# bit 0=dot1, bit1=dot2, bit2=dot3, bit3=dot4, bit4=dot5, bit5=dot6
NABCC = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)="


def unicode_braille_to_brf(text):
    """Convert Unicode braille characters (U+2800-U+283F) to NABCC ASCII."""
    out = []
    for ch in text:
        code = ord(ch)
        if 0x2800 <= code <= 0x283F:
            out.append(NABCC[code - 0x2800])
        elif code < 128:
            out.append(ch)
        else:
            out.append(" ")
    return "".join(out)


def main():
    args = sys.argv[1:]
    code = "ueb"
    if "--code" in args:
        i = args.index("--code")
        if i + 1 >= len(args) or args[i + 1] not in TABLES:
            sys.exit("--code must be one of: " + ", ".join(TABLES))
        code = args[i + 1]
        del args[i:i + 2]
    table = TABLES[code]
    input_file = args[0] if len(args) > 0 else "/tmp/book.txt"
    output_file = args[1] if len(args) > 1 else "output.brf"

    with open(input_file, encoding="utf-8", errors="replace") as f:
        lines = f.read().split("\n")

    brf_lines = []
    for line in lines:
        if line.strip():
            try:
                braille = louis.translateString([table], line)
                brf_lines.append(unicode_braille_to_brf(braille))
            except Exception:
                brf_lines.append(line[:80])
        else:
            brf_lines.append("")

    output = "\n".join(brf_lines)
    with open(output_file, "w", encoding="ascii", errors="replace") as f:
        f.write(output)

    print(f"BRF written ({code.upper()}, {table}): {len(output):,} bytes, {len(brf_lines):,} lines")


if __name__ == "__main__":
    main()
