/**
 * ファイル検索・管理画面
 */

/**
 * ファイル登録画面
 */
function validateForm() {
    // 全てのclass="check"が入力済みか確認
    let allCheckValid = $('.check').toArray().every(function(element) {
        // input値またはリストアイテム
        return element.value !== "" && externalSelectedList.children.length > 0;
    });

    // class="eitherCheck"の少なくとも一つが入力済みか確認
    let anyEitherCheckValid = $('.eitherCheck').toArray().some(function(element) {
        // input値が空でないか
        return element.value !== "";
    });

    // 条件に基づいて登録ボタンを切り替え
    if (allCheckValid && anyEitherCheckValid) {
        $("input[type='submit']").attr('disabled', false);
    } else {
        $("input[type='submit']").attr('disabled', true);
    }
}

// 表示するファイル名を設定する関数
function fileNameSet(inputElement, fileIdName) {
    var file = $(inputElement).prop('files')[0];
    // ファイルが選択されていない場合
    if (file == null) {
        $(fileIdName).text("選択されていません");
    } else {
        $(fileIdName).text(file.name);
    }
}

/**
 * ファイル更新画面
 */

// ファイル更新画面の入力値チェック
function updateValidateForm() {
    // 全てのclass="check"が入力済みか確認
    let allCheckValid = $('.check').toArray().every(function(element) {
        // input値またはリストアイテム
        return (element.value !== "" && externalSelectedList.children.length > 0);
    });

    // 入力値に変更があるかどうか確認
    let changeCheckValid = $('.check').toArray().some(function(element) {
        // 初期値の値と異なるか
        return inputs[element.id] !== document.getElementById(element.id).value;
    });

    // 現時点の参加者リストを取得
    listItemsAfter = document.querySelectorAll('#externalSelectedList li');

    // 参加者リスト内の数に変更があるかどうか
    if (listItemsBefore.length === listItemsAfter.length && !changeCheckValid) {
        // 同じ場合内容を比較
        for (let i = 0; i < listItemsAfter.length; i++) {
            // 内容が異なるかどうか
            if (listItemsBefore[i].id !== listItemsAfter[i].id) {
                // 変更あり
                changeCheckValid = true;
                break;
            }
            // 変更なし
            changeCheckValid = false;
        }
    } else {
        // リストの数が異なる場合、変更ありと判断
        changeCheckValid = true;
    }

    // 条件に基づいて更新ボタンを切り替え
    if (allCheckValid && changeCheckValid) {
        $("input[type='submit']").attr('disabled', false);
    } else {
        $("input[type='submit']").attr('disabled', true);
    }
}

/**
 * ユーザー管理画面
 */

/**
 * ユーザー登録画面
 */
// 登録ボタンの活性・非活性を切り替える関数
function userInsertCheck(checkValidity) {
    for (let i = 1; i <= $('.checkList').length; i++) {
        // チェックボックスが選択されているか
        if (document.getElementById(i).checked) {
            // 状態を切り替え
            $("input[type='submit']").attr('disabled', checkValidity);
            return;
        } else {
            // 全て未選択なら無効化
            $("input[type='submit']").attr('disabled', true);
        }
    }
}

/**
 * ユーザー更新画面
 */
// 入力値変更時に更新ボタンの活性・非活性を切り替える関数
function valueChangeCheck() {
    // フォーム内の全要素を取得
    const formElements = document.querySelectorAll('input, select, textarea');
    // 各要素の初期値を保存するマップ
    const initialValues = new Map();

    // 各要素の初期値を記録
    formElements.forEach((el) => {
        if (el.type === "checkbox" || el.type === "radio") {
            // チェック状態を保存
            initialValues.set(el, el.checked);
        } else {
            // テキストやセレクトボックスの値を保存
            initialValues.set(el, el.value);
        }
    });

    // 入力値が初期値と異なるか監視
    formElements.forEach((el) => {
        el.addEventListener("input", checkChanges);
        el.addEventListener("change", checkChanges);
    });

    // 入力状況の変更確認
    function checkChanges() {
        let hasChanged = false;

        // 変更を検知
        initialValues.forEach((initialValue, element) => {
            if (element.type === "checkbox" || element.type === "radio") {
                if (element.checked !== initialValue) {
                    // 変更あり
                    hasChanged = true;
                }
            } else {
                if (element.value !== initialValue) {
                    // 変更なし
                    hasChanged = true;
                }
            }
        });

        // 変更があれば処理を実行
        if (hasChanged) {
            // 一般ユーザーの更新時処理
            if ($('.checkList').length < 1) {
                // ボタンを有効化
                $("input[type='submit']").attr('disabled', false);
                return;
            }
            for (let i = 1; i <= $('.checkList').length; i++) {
                if (document.getElementById(i).checked) {
                    // チェックがある場合
                    $("input[type='submit']").attr('disabled', false);
                    return;
                } else {
                    // チェックがなければ無効化
                    $("input[type='submit']").attr('disabled', true);
                }
            }
        } else {
            // 変更がない場合無効化
            $("input[type='submit']").attr('disabled', true);
        }
    }
}

/**
 * 所属・役職管理画面
 */

/**
 * 所属・役職登録・更新画面
 */
// 入力値のチェックを行う関数
function inputCheck(inputElement) {
    if ($(inputElement).val().length < 1) {
        $("#submit1").prop("disabled", true);
    } else {
        $("#submit1").prop("disabled", false);
    }
}

/**
 * 共通処理
 */

// 登録確認ダイアログ
function insertcheck() {
    return window.confirm('登録します。よろしいですか？');
}

// 更新確認ダイアログ
function updatecheck() {
    return window.confirm('更新します。よろしいですか？');
}

// 削除確認ダイアログ
function deletecheck() {
    return window.confirm('削除します。よろしいですか？');
}

// 行をクリックした際に、対応するラジオボタンを選択し、他の行のラジオボタンを解除する関数
function selectRadioButton(optionName) {
    // ラジオボタンを選択
    const radio = document.querySelector(`input[name="${optionName}"]`);
    if (radio) {
        radio.checked = true;
        // ボタン活性・非活性
        if (document.querySelector('input[name="button1"]') != null) {
            document.querySelector('input[name="button1"]').disabled = false;
        }
        if (document.querySelector('input[name="button2"]') != null) {
            document.querySelector('input[name="button2"]').disabled = false;
        }
    }

    // 他のラジオボタンを解除
    clearOtherRadios(optionName);
}

/**
 * エラーメッセージダイアログ
 */

// エラーメッセージアラート
function errorAlert() {

    // アラート表示
    document.getElementById('errorAlert').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// アラートを閉じる
function closeAlert(targetId) {
    document.getElementById('errorAlert').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    // targetIdに入っているidのテキストボックスにフォーカスを設定する
    document.getElementById(targetId).select();
}

/**
 * 参加者選択モーダルウィンドウ
 */

// モーダルを開く
function modalOpen() {
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
    // 初期表示のリスト1にイベントを設定
    setUpClickEvents("teamList");
}

// モーダルを閉じる
function modalClose() {
    document.body.style.overflow = 'auto';
    // 送信フォームの隠しフィールド
    var selectedDataInput = document.getElementById("selectedData");

    modal.style.display = "none";
    detailList.style.display = "none";

    // externalSelectedList内の<li>要素からid属性を取得して配列を作成
    const selectedIds = Array.from(externalSelectedList.querySelectorAll("li"))
        .map(li => li.id); // 各<li>のid属性を取得

    // 配列としてselectedDataInputに渡す
    selectedDataInput.value = selectedIds;
    // リストの表示状態を更新
    updateExternalSelectedListVisibility();
}

function toggleList(activeList, inactiveList, toggleActive, toggleInactive) {
    activeList.classList.add("active");
    inactiveList.classList.remove("active");
    toggleActive.disabled = true;
    toggleInactive.disabled = false;
}

// 所属リストを開く
function teamOpen() {
    toggleList(teamList, postList, toggleTeamList, togglePostList);

    // リスト1が表示された時にクリックイベントを設定
    setUpClickEvents("teamList");
}

// 役職リストを開く
function postOpen() {
    toggleList(postList, teamList, togglePostList, toggleTeamList);

    // リスト2が表示された時にクリックイベントを設定
    setUpClickEvents("postList");
}

// リストの名前をクリックした時に詳細リストを表示
function showDetails(region) {
    // 詳細リストをクリア
    detailList.innerHTML = '';
    // detailsとdetailIdsが存在するか確認
    if (details[region] && detailIds[region]) {
        details[region].forEach(function(person, index) {
            var li = document.createElement("li");
            li.textContent = person;
            // 対応するdetailIdを取得
            const detailId = detailIds[region][index];
            // モーダルウィンドウ外リストに追加する名前
            const externalName = externalDetails[region][index];
            li.onclick = function() {
                // detailIdを渡す
                addToSelectedList(person, detailId, externalName);
            };
            detailList.appendChild(li);
        });
        detailList.style.display = 'block';
    }
}

// モーダル内リストに名前を追加する関数
function addToSelectedList(name, detailId, externalName) {
    // モーダル内の選択者リストに追加
    const selectedListItem = document.createElement("li");

    selectedItems = document.querySelectorAll("#selectedList li");
    selectedItems.forEach(function(item) {
        if (item.getAttribute("id") == detailId) {
            throw new Error("既に追加されています。");
        }
    });

    selectedListItem.textContent = name;
    // detailIdをid属性として設定
    selectedListItem.setAttribute("id", detailId);
    selectedListItem.addEventListener("click", function() {
        // クリックされた名前を削除
        deleteSelected(detailId);
    });
    selectedList.appendChild(selectedListItem);

    // モーダル外の選択者リストに追加
    const externalListItem = document.createElement("li");
    externalListItem.textContent = externalName;
    // detailIdをid属性として設定
    externalListItem.setAttribute("id", detailId);
    externalSelectedList.appendChild(externalListItem);

    // モーダル外の選択者リストを表示
    updateExternalSelectedListVisibility();
}

// リストから名前を削除する関数
function deleteSelected(detailId) {
    // モーダル内の選択者リストから削除
    let selectedItems = document.querySelectorAll("#selectedList li");
    selectedItems.forEach(function(item) {
        if (item.getAttribute("id") == detailId) {
            item.remove();
        }
    });

    // モーダル外の選択者リストから削除
    let externalItems = document.querySelectorAll("#externalSelectedList li");
    externalItems.forEach(function(item) {
        if (item.getAttribute("id") == detailId) {
            item.remove();
            // モーダル外の選択者リストを非表示にするかどうか判定
            updateExternalSelectedListVisibility();
        }
    });
}

// リスト項目にクリックイベントを追加
function setUpClickEvents(listType) {
    var listItems;
    if (listType === "teamList") {
        listItems = teamList.querySelectorAll("li");
    } else {
        listItems = postList.querySelectorAll("li");
    }

    listItems.forEach(function(item) {
        item.onclick = function() {
            if (item.id in details) { // item.idがdetailsに存在するか確認
                showDetails(item.id);
            }
        };
    });
}

// 外部選択者リストが空かどうかを確認する関数
function updateExternalSelectedListVisibility() {
    if (externalSelectedList.children.length === 0) {
        // リストが空の場合、非表示にする
        document.querySelector('.external_selected_container').style.display = 'none';
    } else {
        // リストが空でない場合、表示する
        document.querySelector('.external_selected_container').style.display = 'block';
    }
}

// クリックしたラジオボタン以外を解除する関数
function clearOtherRadios(selectedOption) {
    // 全てのラジオボタンを取得
    const radios = document.querySelectorAll('input[type="radio"]');

    radios.forEach(radio => {
        // クリックしたラジオボタン以外の選択を解除
        if (radio.name !== selectedOption) {
            radio.checked = false;
        }
    });
}

/**
 * 参加者一覧のドロップダウン
 */

// 参加者一覧のドロップダウン表示
function dropdownOpen(dropdownObj, event) {
    // 現在のドロップダウンを表示または非表示にする
    var dropdownContent = dropdownObj.nextElementSibling; // <div class="dropdown-content">

    // すべてのドロップダウンを閉じる
    var allDropdownContents = document.querySelectorAll('.dropdown-content');
    allDropdownContents.forEach(function(content) {
        if (content !== dropdownContent) {
            content.classList.remove('show'); // 他のドロップダウンを閉じる
        }
    });

    // 現在のドロップダウンをトグル（開く/閉じる）
    dropdownContent.classList.toggle('show');

    // イベントの伝播を停止（ボタン内の他のイベントに影響を与えないようにする）
    event.stopPropagation();
}

// 参加者一覧のドロップダウン非表示
function dropdownCloseCheck(event) {
    if (!event.target.closest('.dropdown')) {
        // dropdown-contentの情報を全て取得
        var allDropdownContents = document.querySelectorAll('.dropdown-content');
        allDropdownContents.forEach(function(content) {
            // dropdown-contentを全て非表示
            content.classList.remove('show');
        });
    }
}
