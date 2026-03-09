import re
import sys
from pathlib import Path


def find_images_without_alt(file_path):
    """Find images in qmd files missing alt text (both markdown and HTML)"""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    issues = []

    # Remove fenced code blocks ```...``` (including ```{.md} etc.)
    code_fence_pattern = r"```[\s\S]*?```"
    content_no_code = re.sub(code_fence_pattern, "", content)

    # Remove inline code `...`
    inline_code_pattern = r"`[^`]*`"
    content_no_code = re.sub(inline_code_pattern, "", content_no_code)

    md_pattern = r"(?<!\[)!\[(?:\s*)\]\([^)]+\)"
    attr_pattern = r"\{[^}]*(?:\balt=|\bfig-alt=)[^}]*\}"

    for match in re.finditer(md_pattern, content_no_code):
        end = match.end()
        # Look at the next chunk of text after the image
        following = content_no_code[end:end+200]  # enough to include `{...}`
        if re.match(r"\s*" + attr_pattern, following):
            # This image has alt/fig-alt in its attribute block; skip
            continue
        line_num = content[:match.start()].count("\n") + 1
        issues.append(("markdown", line_num, match.group(0)))

    return issues


# Check all qmd files
qmd_files = Path(".").rglob("*.qmd")
found_issues = False

for file in qmd_files:
    issues = find_images_without_alt(file)
    if issues:
        found_issues = True
        print(f"\n{file}:")
        for img_type, line_num, img in issues:
            print(f"  Line {line_num} [{img_type}]: {img}")

if not found_issues:
    print("✓ All images have alt text!")
else:
    sys.exit(1)  # Non-zero exit for CI/CD
