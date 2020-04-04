function isAlpha(ch) {
    return (ch >= 'a' && ch <= 'z')
}

function isDigit(ch)
{
    return (ch >= '0' && ch <= '9')
}

function DfaState()
{
}
DfaState.Init = ""
DfaState.Id = "Id"
DfaState.IntLiteral = "IntLiteral"
DfaState.GT = "GT"
DfaState.GE = "GE"
DfaState.EQ = "EQ"
DfaState.Int = "Int"
DfaState.Int1 = "Int1"
DfaState.Int2 = "Int2"
DfaState.ADD = "ADD"
DfaState.MUL = "MUL"

function parse(line)
{
    var i = 0
    var token = ""
    var newState = DfaState.Init

    function nextState(ch) {
        var nState
        if (ch == ' ') {
            nState = DfaState.Init
        }
        if (isAlpha(ch)) {
            if (ch == 'i')
                nState = DfaState.Int1
            else
                nState = DfaState.Id
        }
        if (isDigit(ch)) {
            nState = DfaState.IntLiteral
        }
        if (ch == '>') {
            nState = DfaState.GT
        }
        if (ch == '=') {
            nState = DfaState.EQ
        }
        if (ch == '+') {
            nState = DfaState.ADD
        }
        if (ch == '*') {
            nState = DfaState.MUL
        }

        if (nState != newState) {
            if (newState != DfaState.Init) {
                console.log(newState, token)
            }
            token = ch
            newState = nState
        }
    }

    while (i < line.length) {
        var ch = line.charAt(i)
        i++

        if (newState == DfaState.Init) {
            nextState(ch)
        } else if (newState == DfaState.Id) {
            if (isAlpha(ch)) {
                token += ch
                continue
            }
        } else if (newState == DfaState.IntLiteral) {
            if (isDigit(ch)) {
                token += ch
                continue
            }
        } else if (newState == DfaState.GT) {
            if (ch == '=') {
                newState = DfaState.GE
                token += ch
                continue
            }
        } else if (newState == DfaState.Int1) {
            if (ch == 'n') {
                newState = DfaState.Int2
                token += ch
                continue
            }
            newState = DfaState.Id
        } else if (newState == DfaState.Int2) {
            if (ch == 't') {
                newState = DfaState.Int
                token += ch
                continue
            } 
            newState = DfaState.Id
        } else if (newState == DfaState.Int) {
            if (ch != ' ') {
                newState = DfaState.Id
                token += ch
                continue
            }
        }

        nextState(ch)
    }
    console.log(newState, token)
}

parse('123 + 23*  45')
parse('a > 12')
parse('int b = 35')