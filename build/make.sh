# Translate .es to .es.abc using esc on tamarin
#
# You must first build a tamarin executable and store it under the
# name "shell" (or "shell.exe") in the directory $DIR.
#
# Usage:
#   esc.sh [<option> ...] <filename> ...
#
# Options:
#
#   -[no-]es3
#      Recognize only (not only) ES3 keywords (not "future reserved words")
#
#   -[no-]extensions
#      Turn on (off) some extensions to ES4 (UTSL)
#
#   -g
#   -[no-]debug
#      Emit (do not emit) debug information
#
#   -Xprofile
#      Profile the compiler: dump a statistical profile to the file 
#      esc.profile following compilation.
#
# Defaults are -no-es3 -no-extensions -no-debug.
#
# esc.sh must be run from $DIR, or you must change the value of
# $DIR to be the absolute path of the bin directory (that has the
# shell and the abc files for ESC).

DIR=../src
BIN=../bin

$BIN/shell $BIN/l0c.swf \
    -- -debug -extensions -swf \
       $DIR/debug.l0 \
       $DIR/util.l0 \
       $DIR/bytes-tamarin.l0 \
       $DIR/util-tamarin.l0 \
       $DIR/lex-char.l0 \
       $DIR/lex-token.l0 \
       $DIR/lex-scan.l0 \
       $DIR/ast.l0 \
       $DIR/define.l0 \
       $DIR/parse.l0 \
       $DIR/comp-core.l0 \
       $DIR/eval-support.l0 \
       $DIR/comp-env.l0 \
       $DIR/sampler.l0 \
       $DIR/format.l0 \
       $DIR/json.l0 \
       $DIR/l10c.l0

cp ../src/l10c.l0.swf ../bin/l10c.swf