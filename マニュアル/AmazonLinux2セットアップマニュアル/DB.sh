#!/bin/bash

# 接続情報
DB_NAME="file_management_system"
DB_USER="justinuser"
SQL_FILE="/usr/local/src/INSERT_DB.sql"
DB_PASSWORD="Justin001"

# SQL を実行
export PGPASSWORD="$DB_PASSWORD"
psql -U "$DB_USER" -d "$DB_NAME" -f "$SQL_FILE"

unset PGPASSWORD

# 終了コードを確認
if [ $? -eq 0 ]; then
    echo "SQL ファイルの実行が成功しました。"
else
    echo "SQL ファイルの実行に失敗しました。" >&2
fi
