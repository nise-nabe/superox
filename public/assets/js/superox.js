jQuery(function($) {
  var isPlaying = true;
  var turn = 0;
 var size = 4;

  function init() {
    var data = new Array(size);
    for (var c = 0; c < size; ++c) {
      data[c] = new Array(size);
      for (var a = 0; a < size; ++a) {
        data[c][a] = new Array(size);
        for (var b = 0; b < size; ++b) {
          data[c][a][b] = $('#stage' + c).find('.r' + a).find('.c' + b).text();
        }
      }
    }
    return data;
  };

  function noticeGameEnd(turnStr) {
    alert("win " + turnStr);
  }

  function check(data, turnStr) {
    for (var c = 0; c < size; ++c) {
      for (var a = 0; a < size; ++a) {
        var count = 0;

        // 横
        for (var b = 0; b < size; ++b) {
          if (data[c][a][b] === turnStr) {
            count++;
          }
        }
        if (count == size) { return true; }

        // 縦
        var count = 0;
        for (var b = 0; b < size; ++b) {
          if (data[c][b][a] === turnStr) {
            count++;
          }
        }
        if (count == size) { return true; }
      }

      // 右下斜め
      var count = 0;
      for (var a = 0; a < size; ++a) {
        if (data[c][a][a] === turnStr) {
          count++;
        }
      }
      if (count == size) { return true; }

      // 左下斜め
      var count = 0;
      for (var a = 0; a < size; ++a) {
        if (data[c][a][size - 1 - a] === turnStr) {
          count++;
        }
      }
      if (count == size) { return true; }
    }

    // 奥行き
    for (var a = 0; a < size; ++a) {
      for (var b = 0; b < size; ++b) {
        var count = 0;
        for (var c = 0; c < size; ++c) {
          if (data[c][a][b] === turnStr) {
            count++;
          }
        }
        if (count == size) { return true; }
      }
    }

    for (var a = 0; a < size; ++a) {
      // 奥から手前に右
      var count = 0;
      for (var b = 0; b < size; ++b) {
        if (data[size - 1 - b][a][b] === turnStr) {
          count++;
        }
      }
      if (count == size) { return true; }

      // 奥から手前に左
      var count = 0;
      for (var b = 0; b < size; ++b) {
        if (data[b][a][b] === turnStr) {
          count++;
        }
      }
      if (count == size) { return true; }

      var count = 0;
      for (var b = 0; b < size; ++b) {
        if (data[b][b][a] === turnStr) {
          count++;
        }
      }
      if (count == size) { return true; }

      var count = 0;
      for (var b = 0; b < size; ++b) {
        if (data[b][size - 1 - b][a] === turnStr) {
          count++;
        }
      }
      if (count == size) { return true; }
    }

    var count = 0;
    for (var a = 0; a < 4; ++a) {
      if (data[a][a][a] === turnStr) {
        count++;
      }
    }
    if (count == size) { return true; }

    var count = 0;
    for (var a = 0; a < 4; ++a) {
      if (data[a][a][size - 1 - a] === turnStr) {
        count++;
      }
    }
    if (count == size) { return true; }

    var count = 0;
    for (var a = 0; a < 4; ++a) {
      if (data[a][size - 1 -a][a] === turnStr) {
        count++;
      }
    }
    if (count == size) { return true; }

    var count = 0;
    for (var a = 0; a < 4; ++a) {
      if (data[a][size - 1 -a][size - 1 - a] === turnStr) {
        count++;
      }
    }
    if (count == size) { return true; }

    return false;
  }

  for (var i = 0; i < size; ++i) {
    $('#stage' + i).mousedown(function(e) {
      if (!isPlaying) {
        return;
      }

      //debugger;
      var stage = $(e.currentTarget);
      var stageId = stage.attr('id').match(/^stage([0-9])$/)[1];
      var r = parseInt((e.pageY - stage.position().top) / 40);
      var c = parseInt((e.pageX - stage.position().left) / 40);

      var currentCel = $('#stage' + stageId).find('.r' + r).find('.c' + c);
      if (currentCel.text() === '') {
        var turnStr = turn < 1 ? 'o' : 'x';

        currentCel.text(turnStr);

        var data = init();
        if (check(data, turnStr)) {
          console.log(data);
          isPlaying = false;
          noticeGameEnd(turnStr);
        }
        
        turn = 1 - turn;
      }
    });
  }

  function test0() {
    var data = [
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test0: " + (check(data, 'o') === false));
  }

  function test1() {
    var data = [
      [
        ["o", "x", "", ""],
        ["o", "x", "", ""],
        ["o", "x", "", ""],
        ["o", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test1: " + (check(data, 'o') === true));
  }

  function test2() {
    var data = [
      [
        ["o", "o", "o", "o"],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test2: " + (check(data, 'o') === true));
  }

  function test3() {
    var data = [
      [
        ["o", "", "", ""],
        ["", "o", "", ""],
        ["", "", "o", ""],
        ["", "", "", "o"]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test3: " + (check(data, 'o') === true));
  }

  function test4() {
    var data = [
      [
        ["", "", "", "o"],
        ["", "", "o", ""],
        ["", "o", "", ""],
        ["o", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test4: " + (check(data, 'o') === true));
  }

  function test5() {
    var data = [
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "o", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "o", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", "o"],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test5: " + (check(data, 'o') === true));
  }

  function test6() {
    var data = [
      [
        ["", "", "", "o"],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "o", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "o", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test6: " + (check(data, 'o') === true));
  }

  function test7() {
    var data = [
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["o", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["o", "", "", ""]
      ]
    ];
    console.log("test7: " + (check(data, 'o') === true));
  }

  function test8() {
    var data = [
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["o", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["o", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test8: " + (check(data, 'o') === true));
  }

  function test9() {
    var data = [
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "o", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "o", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", "o"]
      ]
    ];
    console.log("test9: " + (check(data, 'o') === true));
  }

  function test10() {
    var data = [
      [
        ["", "", "", "o"],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "o", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "o", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["o", "", "", ""]
      ]
    ];
    console.log("test10: " + (check(data, 'o') === true));
  }

  function test11() {
    var data = [
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["o", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "o", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "", "o", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", "o"],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test11: " + (check(data, 'o') === true));
  }

  function test12() {
    var data = [
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", "o"]
      ],
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "o", ""],
        ["", "", "", ""]
      ],
      [
        ["", "", "", ""],
        ["", "o", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test12: " + (check(data, 'o') === true));
  }

  function test13() {
    var data = [
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ],
      [
        ["o", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ]
    ];
    console.log("test13: " + (check(data, 'o') === true));
  }

  function test() {
    test0();
    test1();
    test2();
    test3();
    test4();
    test5();
    test6();
    test7();
    test8();
    test9();
    test10();
    test11();
    test12();
    test13();
  }
  //test();

});
