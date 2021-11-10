import { hasContradiction, array } from "./arraymethods.js";

export function addBlocks() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            $("<div></div>")
                .addClass("block")
                .attr("id", `block${row}_${col}`)
                .appendTo("#sudoku");
        }
    }
}

export function addCells() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const blockRow = Math.floor(row / 3);
            const blockCol = Math.floor(col / 3);
            $("<input type='text'>")
                .addClass("cell")
                .attr("id", `cell${row}_${col}`)
                .appendTo(`#block${blockRow}_${blockCol}`)
                .on("keydown", function (e) {
                    $(".cell").removeClass("fixed");
                    if ($(this).val()) $(this).val("");
                    const num = parseInt(e.key);
                    const isValidNumber = num >= 1 && num <= 9;
                    const contra = hasContradiction(row, col, num);
                    if (isValidNumber && !contra) {
                        array[row][col] = num;
                    } else {
                        if (contra && isValidNumber) {
                            $("#info").text(
                                "This number is not allowed"
                            );
                            setTimeout(
                                () => $("#info").text(""),
                                1000
                            );
                        }
                        array[row][col] = 0;
                    }
                    return isValidNumber && !contra;
                })
                .on("pointerdown", function (e) {
                    $(".cell").removeClass("fixed");
                    if ($(this).val()) $(this).val("");
                    const num = parseInt(e.key);
                    const isValidNumber = num >= 1 && num <= 9;
                    const contra = hasContradiction(row, col, num);
                    if (isValidNumber && !contra) {
                        array[row][col] = num;
                    } else {
                        if (contra && isValidNumber) {
                            $("#info").text(
                                "This number is not allowed"
                            );
                            setTimeout(
                                () => $("#info").text(""),
                                1000
                            );
                        }
                        array[row][col] = 0;
                    }
                    return isValidNumber && !contra;
                })
                .on("keyup", function () {
                    if (col < 8) {
                        $(`#cell${row}_${col + 1}`).focus();
                    } else if (row < 8) {
                        $(`#cell${row + 1}_${0}`).focus();
                    }
                });
        }
    }
}

export function focusFirstCell() {
    $(`.cell`)[0].focus();
}
