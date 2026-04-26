#!/bin/bash
# 사진을 public/images/ 폴더에 복사하는 스크립트
# 사용법: ./add-photos.sh /path/to/photo1.jpg /path/to/photo2.jpg ...

TARGET_DIR="$(dirname "$0")/public/images"
mkdir -p "$TARGET_DIR"

FILES=("$@")
COUNT=1

for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    EXT="${FILE##*.}"
    DEST="$TARGET_DIR/photo${COUNT}.jpg"
    cp "$FILE" "$DEST"
    echo "✅ photo${COUNT}.jpg 복사 완료: $FILE"
    COUNT=$((COUNT + 1))
  else
    echo "❌ 파일을 찾을 수 없습니다: $FILE"
  fi
done

echo ""
echo "총 $((COUNT - 1))개 사진이 복사되었습니다."
echo "브라우저에서 확인하세요: http://localhost:3001"
